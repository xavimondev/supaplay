import { useState } from 'react'
import { WebContainer } from '@webcontainer/api'
import { SupaEditor } from '@/components/supa-editor'
import { Header } from '@/components/header'
import { Play } from '@/components/icons'

let webcontainerInstance: WebContainer
const initialCode = `async function main() { 

}

main()
`

function App() {
  const [code, setCode] = useState(initialCode)
  const [output, setOutput] = useState<string[]>([])

  const handleEvaluateTheCode = async () => {
    if (!webcontainerInstance) {
      webcontainerInstance = await WebContainer.boot()
    }

    await webcontainerInstance.mount({
      'index.js': {
        file: {
          contents: `
            import { createClient } from '@supabase/supabase-js'
            // Create a single supabase client for interacting with your database
            const supabase = createClient('https://ifqnvmhhabkpzxylyfmd.supabase.co', 
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlmcW52bWhoYWJrcHp4eWx5Zm1kIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTEyNTA4MDcsImV4cCI6MjAwNjgyNjgwN30.SpP4oMZN8bgbV8tUrWqhf-Y0eXd9M3UzyP7hhnjX6GA',
            {
              auth: {
                autoRefreshToken: false,
                persistSession: false
              }
            })
            ${code}
          `
        }
      },
      'package.json': {
        file: {
          contents: `
            {
              "name": "supatuts",
              "type": "module",
              "dependencies":{
                "@supabase/supabase-js":"latest"
              },
              "scripts": {
                "start": "node index.js"
              }
            }
          `.trim()
        }
      }
    })

    const install = await webcontainerInstance.spawn('npm', ['install'])

    setOutput(['Installing dependencies...'])
    install.output.pipeTo(
      new WritableStream({
        write(data) {
          console.log(data)
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
          console.log(data)
        }
      })
    )

    webcontainerInstance.on('server-ready', (port, url) => {
      console.log('Server is ready 🚀')
      console.log(`Running at this port ${port}`)
      console.log(`Go to this URL ${url}`)
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
          <div className='w-full h-full'>
            <div className='flex bg-[#181818] p-2 h-screen'>
              {output.map((out: string) => (
                <span>{out}</span>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default App
