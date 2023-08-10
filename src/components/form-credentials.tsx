import { Credentials } from '@/types'
import { isFormValid } from '@/helpers/validateForm'

type FormCredentialsProps = {
  onSubmit: (credentials: Credentials) => void
}

export function FormCredentials({ onSubmit }: FormCredentialsProps) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = Object.fromEntries(new FormData(e.currentTarget))
    const { projecturl, servicekey } = formData
    const urlProject = projecturl as string
    const serviceKey = servicekey as string
    const data = { urlProject, serviceKey }
    if (!isFormValid(data)) {
      return
    }
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
          className='w-full px-4 py-2 bg-black/30 text-white text-sm sm:text-base placeholder-white/30 rounded-md focus:ring-2 focus:ring-green-400/80 focus:outline-none'
        />
      </div>
      <div className='w-full flex flex-col gap-1.5'>
        <label htmlFor='servicekey' className='text-white text-sm font-medium uppercase'>
          Service Role Key
        </label>
        <input
          type='text'
          name='servicekey'
          placeholder='Your service key'
          className='w-full px-4 py-2 bg-black/30 text-white text-sm sm:text-base placeholder-white/30 rounded-md focus:ring-2 focus:ring-green-400/80 focus:outline-none'
        />
      </div>
      <div className='flex justify-end'>
        <button
          type='submit'
          className='gap-1.5 px-4 py-2 rounded-md bg-green-400/80 hover:bg-green-600 transition-colors ease-in-out text-sm text-white focus:ring-2 focus:ring-green-400/80 focus:outline-none'
        >
          Enter
        </button>
      </div>
    </form>
  )
}
