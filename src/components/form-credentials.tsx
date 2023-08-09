export function FormCredentials() {
  return (
    <form className='flex flex-col gap-5'>
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
          API Keys
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
          type='button'
          className='gap-1.5 px-4 py-2 rounded-md bg-green-400/80 hover:bg-green-600 transition-colors ease-in-out text-sm text-white focus:ring-2 focus:ring-green-400/80 focus:outline-none'
        >
          Enter
        </button>
      </div>
    </form>
  )
}
