import { useState } from 'react'
import { WebContainer } from '@webcontainer/api'
import ANSIToHTML from 'ansi-to-html'
import { PACKAGE_JSON_CONTENT } from '@/constants'
import { getIndexContent } from '@/helpers/getIndexContent'
import { SupaEditor } from '@/components/supa-editor'
import { Header } from '@/components/header'
import { Play } from '@/components/icons'
import { Terminal } from '@/components/terminal'

let webcontainerInstance: WebContainer
const initialCode = `async function getData() { 

}
`
const ANSIConverter = new ANSIToHTML()

function App() {
  const [code, setCode] = useState(initialCode)
  const [output, setOutput] = useState<string[]>([])
  const [link, setLink] = useState('')

  const handleEvaluateTheCode = async () => {
    if (!webcontainerInstance) {
      webcontainerInstance = await WebContainer.boot()
    }

    await webcontainerInstance.mount({
      'index.js': {
        file: {
          contents: `${getIndexContent(code)}`
        }
      },
      'package.json': {
        file: {
          contents: PACKAGE_JSON_CONTENT
        }
      }
    })

    const install = await webcontainerInstance.spawn('npm', ['install'])

    setOutput(['Installing dependencies...'])
    install.output.pipeTo(
      new WritableStream({
        write(data) {
          try {
            setOutput((state) => [...state, ANSIConverter.toHtml(data)])
          } catch (error) {
            console.error(error)
          }
        }
      })
    )

    const exitCode = await install.exit
    if (exitCode !== 0) {
      throw new Error('Installation failed')
    }

    const start = await webcontainerInstance.spawn('npm', ['run', 'start'])
    // showing running process
    start.output.pipeTo(
      new WritableStream({
        write(data) {
          try {
            setOutput((state) => [...state, ANSIConverter.toHtml(data)])
          } catch (error) {
            console.log(error)
          }
        }
      })
    )

    webcontainerInstance.on('server-ready', (_, url) => {
      console.log(`Go to this URL ${url}`)
      setLink(url)
    })
  }

  return (
    <div className='w-full flex flex-col'>
      <Header>
        <div className='flex gap-2'>
          <button
            type='button'
            onClick={handleEvaluateTheCode}
            className='flex items-center gap-1.5 p-2 rounded-md bg-green-400/80 hover:bg-green-600 transition-colors ease-in-out 
            text-sm text-white'
          >
            <Play className='w-4 h-4' />
            Run Code
          </button>
        </div>
      </Header>
      <main className='flex w-full'>
        <div className='w-full flex flex-col md:flex-row border-t border-t-white/10'>
          <SupaEditor onChangeCode={setCode} defaultCode={code} />
          <div className='w-full flex flex-col justify-between'>
            <div className='flex justify-center items-center p-2 w-full'>
              <iframe src={link} width='100%' height='100%'></iframe>
            </div>
            <Terminal output={output} />
          </div>
        </div>
      </main>
    </div>
  )
}

export default App
