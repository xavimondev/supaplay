import { useState } from 'react'
import { WebContainer } from '@webcontainer/api'
import { PACKAGE_JSON_CONTENT } from '@/constants'
import { getIndexContent } from '@/helpers/getIndexContent'
import { SupaEditor } from '@/components/supa-editor'
import { Header } from '@/components/header'
import { Play } from '@/components/icons'

let webcontainerInstance: WebContainer
const initialCode = `async function getData() { 

}
`

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
            console.log(data)
            // console.log(JSON.parse(JSON.stringify(data.toString()))[0])
          } catch (error) {
            console.error(error)
          }
        }
      })
    )

    const exitCode = await install.exit
    console.log(`Process ended with ${exitCode} code`)
    if (exitCode !== 0) {
      throw new Error('Installation failed')
    }

    setOutput((state: string[]) => [...state, '--------', 'Running dev server...'])
    const start = await webcontainerInstance.spawn('npm', ['run', 'start'])
    // showing running process
    start.output.pipeTo(
      new WritableStream({
        write(data) {
          try {
            console.log(data)
          } catch (error) {
            console.log(error)
          }
        }
      })
    )

    webcontainerInstance.on('server-ready', (port, url) => {
      console.log('Server is ready 🚀')
      console.log(`Running at this port ${port}`)
      console.log(`Go to this URL ${url}`)
      setLink(url)
    })
  }

  return (
    <div className='w-full min-h-screen flex flex-col'>
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
        <div className='w-full flex flex-col md:flex-row gap-1 border-t border-t-white/10'>
          <SupaEditor onChangeCode={setCode} defaultCode={code} />
          <div className='w-full h-full flex'>
            <div className='flex justify-center items-center p-2 w-full'>
              <iframe src={link} width='100%' height='100%'></iframe>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default App
