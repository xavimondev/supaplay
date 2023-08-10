import { useLocation } from 'wouter'
import { Credentials } from '@/types'
import { useCredentials } from '@/context/CredentialsProvider'
import { FormCredentials } from '@/components/form-credentials'

export function Credentials() {
  const [, setLocation] = useLocation()
  const { setCredentials } = useCredentials()

  return (
    <div className='min-h-screen flex justify-center items-center'>
      <div className='flex flex-col rounded-md border border-white/10 shadow p-5 mx-3 sm:m-0 w-full sm:w-[550px] selection:bg-green-400 selection:text-black'>
        <div className='flex flex-col gap-4'>
          <h1 className='font-medium text-white text-xl sm:text-2xl'>Steps</h1>
          <ol className='text-white/70 list-decimal list-inside space-y-2 font-medium text-sm sm:text-base'>
            <li>
              Go to{' '}
              <a
                className='underline hover:text-green-400'
                target='_blank'
                href='https://supabase.com/dashboard/sign-in'
              >
                Supabase and choose a project
              </a>
            </li>
            <li>Go to Project Settings</li>
            <li>In Settings page, go to API</li>
            <li>Under Project URL, copy URL</li>
            <li>Under Project API Keys, copy your service_role</li>
          </ol>
          <div className='w-full mt-3'>
            <FormCredentials
              onSubmit={(credentials: Credentials) => {
                setCredentials(credentials)
                setLocation('/play')
                // Save the data to localstorage
                localStorage.setItem('supaplay-keys', JSON.stringify(credentials))
              }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
