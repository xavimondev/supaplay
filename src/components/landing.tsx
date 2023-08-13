import { Link } from 'wouter'
import imgProduct from '@/images/supaplay.jpg'
import { ListFeatures } from '@/components/list-features'

export function Landing() {
  return (
    <>
      <header className='sticky top-0 px-5 md:px-20 backdrop-blur-md border-b border-gray-700 z-20'>
        <div className='flex h-16 items-center justify-between'>
          <span className='text-lg sm:text-3xl text-transparent bg-clip-text bg-gradient-to-r from-[#a5e29c] to-[#63cd77] font-medium'>
            supaplay
          </span>
          <a
            href='https://github.com/xavimondev/supaplay'
            aria-label='Go to Repository'
            target='_blank'
            rel='noreferrer'
            className='rounded-md px-6 py-2 text-white font-medium border border-white/10 bg-black/20 hover:bg-black/30 hover:border-white/40 transition-colors ease-out'
          >
            ⭐️ Star on GitHub
          </a>
        </div>
      </header>
      <main>
        <section className='mt-20 px-6 text-center mb-24'>
          <h1 className='mx-auto max-w-md sm:max-w-4xl mt-5 font-bold text-white text-4xl sm:text-6xl'>
            <span className='text-transparent bg-clip-text bg-gradient-to-r from-[#a5e29c] to-[#63cd77]'>
              Instant
            </span>{' '}
            Supabase Query Playground
          </h1>
          <p className='mx-auto max-w-md sm:max-w-2xl mt-8 text-white/70 text-base sm:text-2xl'>
            Effortlessly test and refine your{' '}
            <span className='text-transparent bg-clip-text bg-gradient-to-r from-[#a5e29c] to-[#63cd77] font-medium'>
              supabase-js
            </span>{' '}
            JavaScript functions against your PostgreSQL.
          </p>
          <div className='mx-auto mt-10'>
            <Link
              className='py-2.5 px-5 bg-green-500/80 hover:bg-green-700 transition-colors ease-in-out text-base sm:text-lg font-medium text-white shadow-lg rounded-md border border-green-500'
              href='/play'
            >
              Get Started
            </Link>
          </div>
          <div className='mx-auto max-w-7xl mt-28 relative flex justify-center'>
            <div className='relative group'>
              <div
                className='
                    absolute 
                    -inset-1.5
                    bg-gradient-to-tr 
                    from-green-400 
                    to-green-500 
                    rounded-md 
                    blur-xl 
                    opacity-20 
                    group-hover:opacity-50 
                    transition-opacity 
                    duration-700
                    group-hover:duration-300'
              ></div>
              <picture className='relative'>
                <img
                  src={imgProduct}
                  alt='Playground screenshot'
                  className='border border-gray-500 border-opacity-50 rounded-md shadow-md object-cover w-[1024px] h-auto'
                />
              </picture>
            </div>
          </div>
        </section>
        <section className='mt-16 px-6'>
          <div className='mx-auto max-w-md sm:max-w-7xl'>
            <h2 className='text-center text-white sm:text-3xl text-lg font-medium mb-16'>
              Explore Key Features
            </h2>
            <ListFeatures />
          </div>
        </section>
      </main>
      <footer className='w-full border-t border-white/10 mt-16'>
        <div className='mx-auto sm:max-w-7xl flex items-center justify-between py-5 px-6 sm:px-0'>
          <span className='text-white/80 text-base sm:text-lg'>
            Built with 💚 by
            <a
              href='https://twitter.com/xavimonp'
              rel='noopener'
              target='_blank'
              className='underline underline-offset-4'
            >
              {' '}
              xavimon
            </a>
          </span>
          <div className='flex items-center gap-6'>
            <a
              href='https://github.com/xavimondev/supaplay'
              aria-label='Go to Repository'
              target='_blank'
              rel='noreferrer'
              className='transition hover:scale-110'
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='20'
                height='20'
                fill='currentColor'
                viewBox='0 0 24 24'
                className='h-5 w-5 sm:h-6 sm:w-6 text-white'
              >
                <path d='M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z'></path>
              </svg>
            </a>
          </div>
        </div>
      </footer>
    </>
  )
}
