import { useEffect, useRef, useState } from 'react'
import { WebContainer } from '@webcontainer/api'
import ANSIToHTML from 'ansi-to-html'
import { LinkData } from '@/types'
import { PACKAGE_JSON_CONTENT } from '@/constants'
import { getIndexContent } from '@/helpers/getIndexContent'
import { SupaEditor } from '@/components/supa-editor'
import { Header } from '@/components/header'
import { Play } from '@/components/icons'
import { Terminal } from '@/components/terminal'
import { Preview } from '@/components/preview'

const initialCode = `async function getData() { 

}
`
const ANSIConverter = new ANSIToHTML()

function App() {
  const codeValueRef = useRef(initialCode)
  const [output, setOutput] = useState<string[]>([])
  const [linkData, setLinkData] = useState<LinkData>({
    uuid: '',
    src: ''
  })
  const webContainerInstanceRef = useRef<any>(null)

  useEffect(() => {
    const bootWebContainer = async () => {
      if (!webContainerInstanceRef.current) {
        webContainerInstanceRef.current = await WebContainer.boot()
      }

      // mounting tree of files into filesystem
      await webContainerInstanceRef.current.mount({
        'index.js': {
          file: {
            contents: `${getIndexContent(initialCode)}`
          }
        },
        'package.json': {
          file: {
            contents: PACKAGE_JSON_CONTENT
          }
        }
      })
      // installing dependencies
      const install = await webContainerInstanceRef.current.spawn('npm', ['install'])
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

      // running server
      const start = await webContainerInstanceRef.current.spawn('npm', ['run', 'start'])
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

      // listening for events
      webContainerInstanceRef.current.on('server-ready', (_: any, url: any) => {
        setLinkData({
          src: url,
          uuid: crypto.randomUUID()
        })
      })
    }

    bootWebContainer()
  }, [])

  const setCode = (code: string) => {
    codeValueRef.current = code
  }

  const handleEvaluateTheCode = async () => {
    const codeInput = codeValueRef.current
    await webContainerInstanceRef.current.fs.writeFile('/index.js', getIndexContent(codeInput))
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
          <SupaEditor onChangeCode={setCode} defaultCode={codeValueRef.current} />
          <div className='w-full flex flex-col justify-between'>
            <div className='flex justify-center items-center p-2 w-full'>
              <Preview linkData={linkData} />
            </div>
            <Terminal output={output} />
          </div>
        </div>
      </main>
    </div>
  )
}

export default App
