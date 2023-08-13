import { useRef, useState } from 'react'
import { Link } from 'wouter'
import { CODE_EDITOR_DEFAULT } from '@/constants'
import { Credentials } from '@/types'
import { getServicesFileContent, getSupabaseFileContent } from '@/helpers/webcontainer'
import { useWebContainer } from '@/hooks/useWebContainer'
import { useCredentials } from '@/context/CredentialsProvider'
import { SupaEditor } from '@/components/supa-editor'
import { Header } from '@/components/header'
import { GearIc, PlayIc } from '@/components/icons'
import { Terminal } from '@/components/terminal'
import { Preview } from '@/components/preview'
import { Placeholder } from '@/components/placeholder'
import { Dialog } from '@/components/dialog'
import { FormCredentials } from '@/components/form-credentials'
import { LoadingSpin } from '@/components/loading'

export function Playground() {
  const codeValueRef = useRef(CODE_EDITOR_DEFAULT)
  const [loadingWebContainer, setLoadingWebContainer] = useState({
    isBooting: true,
    isRequesting: false
  })
  const { linkData, output, webContainerInstanceRef } = useWebContainer()
  const { credentials, setCredentials } = useCredentials()
  const { serviceKey, urlProject } = credentials
  const hasCredentials = serviceKey !== '' && urlProject !== ''

  const setCode = (code: string) => {
    codeValueRef.current = code
  }

  const handleEvaluateTheCode = async () => {
    const codeInput = codeValueRef.current
    await webContainerInstanceRef.current?.fs.writeFile(
      '/services.js',
      getServicesFileContent({
        mainFunction: codeInput
      })
    )
    setLoadingWebContainer({
      ...loadingWebContainer,
      isRequesting: true
    })
  }

  return (
    <div className='w-full flex flex-col min-h-screen'>
      <Header>
        <Link
          href='/'
          className='
                      text-lg 
                      sm:text-2xl 
                      text-transparent 
                      bg-clip-text 
                      bg-gradient-to-r 
                      from-[#a5e29c] 
                      to-[#63cd77] 
                      font-medium 
                      font-satoshi-medium'
        >
          supaplay
        </Link>
        <div className='flex gap-2'>
          <Dialog
            title='Setting Up Credentiales'
            btnOpen={
              <button
                type='button'
                disabled={loadingWebContainer.isRequesting || loadingWebContainer.isBooting}
                className='flex items-center gap-1.5 p-1.5 rounded-md bg-neutral-700/50 hover:bg-neutral-700/70 transition-colors ease-in-out 
            text-sm text-white border border-neutral-700 hover:border-neutral-500 font-medium font-satoshiMedium disabled:cursor-not-allowed disabled:bg-neutral-500'
              >
                <GearIc className='w-4 h-4' />
                Settings
              </button>
            }
          >
            <FormCredentials
              onSubmit={async (credentials: Credentials) => {
                setCredentials(credentials)
                await webContainerInstanceRef.current?.fs.writeFile(
                  '/supabase.js',
                  getSupabaseFileContent({ ...credentials })
                )
              }}
            />
          </Dialog>
          <button
            type='button'
            disabled={
              !hasCredentials || loadingWebContainer.isBooting || loadingWebContainer.isRequesting
            }
            onClick={handleEvaluateTheCode}
            className='flex items-center gap-1.5 p-1.5 rounded-md bg-green-500/80 hover:bg-green-700 transition-colors ease-in-out 
            text-sm text-white disabled:cursor-not-allowed disabled:bg-green-500 font-medium font-satoshiMedium border border-green-500'
          >
            {loadingWebContainer.isRequesting ? (
              <>
                <LoadingSpin />
                Running Code
              </>
            ) : (
              <>
                <PlayIc className='w-4 h-4' />
                Run Code
              </>
            )}
          </button>
        </div>
      </Header>
      <main className='flex w-full h-[calc(100vh-68px)]'>
        <div className='w-full flex flex-col md:flex-row'>
          <SupaEditor onChangeCode={setCode} defaultCode={codeValueRef.current} />
          <div className='w-full flex flex-col justify-between'>
            <div className='flex flex-col justify-center items-center p-2 w-full h-full'>
              {loadingWebContainer.isBooting && <Placeholder msg='Booting WebContainer' />}
              <Preview linkData={linkData} setIsLoadingComponent={setLoadingWebContainer} />
            </div>
            <Terminal output={output} />
          </div>
        </div>
      </main>
    </div>
  )
}
