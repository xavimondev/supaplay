import { useState } from 'react'
import { Credentials } from '@/types'
import { isFormValid } from '@/helpers/validateForm'
import { CheckIc } from '@/components/icons'

type FormCredentialsProps = {
  onSubmit: (credentials: Credentials) => void
}
const initialState = {
  urlProject: '',
  serviceKey: ''
}
export function FormCredentials({ onSubmit }: FormCredentialsProps) {
  const [isSaved, setIsSaved] = useState(false)
  const [inputValues, setInputValues] = useState<Credentials>(() => {
    const credentials = localStorage.getItem('supaplay-keys')
    if (credentials) {
      const credentialsStorage = JSON.parse(credentials)
      return credentialsStorage
    }
    return initialState
  })

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const { urlProject, serviceKey } = inputValues
    const data = { urlProject, serviceKey }
    if (!isFormValid(data)) return
    setIsSaved(true)
    onSubmit(data)
  }

  return (
    <form className='flex flex-col gap-5' onSubmit={handleSubmit}>
      <div className='w-full flex flex-col gap-1.5'>
        <label htmlFor='projecturl' className='text-white text-sm font-medium uppercase'>
          Url
        </label>
        <input
          type='text'
          name='projecturl'
          placeholder='https://your-project.supabase.co'
          value={inputValues.urlProject}
          onChange={(e) => {
            setInputValues({
              ...inputValues,
              urlProject: e.target.value
            })
          }}
          className='w-full px-4 py-2 bg-black/30 text-white text-sm sm:text-base placeholder-white/30 rounded-md focus:ring-2 focus:ring-green-400/80 focus:outline-none'
        />
      </div>
      <div className='w-full flex flex-col gap-1.5'>
        <label htmlFor='servicekey' className='text-white text-sm font-medium uppercase'>
          Service Role Key
        </label>
        <input
          type='password'
          name='servicekey'
          placeholder='Your service key'
          value={inputValues.serviceKey}
          onChange={(e) => {
            setInputValues({
              ...inputValues,
              serviceKey: e.target.value
            })
          }}
          className='w-full px-4 py-2 bg-black/30 text-white text-sm sm:text-base placeholder-white/30 rounded-md focus:ring-2 focus:ring-green-400/80 focus:outline-none'
        />
      </div>
      <div className='flex justify-end'>
        <button
          type='submit'
          className='gap-1.5 px-4 py-1.5 rounded-md bg-green-400/80 hover:bg-green-600 transition-colors ease-in-out text-sm text-white focus:ring-2 focus:ring-green-400/80 focus:outline-none'
        >
          {isSaved ? (
            <span className='flex gap-1 items-center'>
              <CheckIc className='w-4 h-4' />
              Saved
            </span>
          ) : (
            'Enter'
          )}
        </button>
      </div>
    </form>
  )
}
