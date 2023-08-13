import { APP_KEY_FEATURES } from '@/constants'

type FeatureProps = {
  title: string
  description: string
}

function Feature({ title, description }: FeatureProps) {
  return (
    <div
      className='
            w-full 
            flex 
            flex-col 
            gap-6 
            bg-black/20 
            rounded-md 
            border 
            border-white/10 
            hover:bg-black/30 
            hover:border-white/40 
            p-6 
            shadow-md
            transition-colors
            duration-100
            hover:duration-500
            ease-out'
    >
      <h3
        className='
        text-transparent 
        bg-clip-text 
        bg-gradient-to-r 
        from-[#a5e29c] 
        to-[#63cd77] 
        font-semibold 
        text-base 
        sm:text-2xl'
      >
        {title}
      </h3>
      <p className='text-white/80 text-sm sm:text-lg'>{description}</p>
    </div>
  )
}

export function ListFeatures() {
  return (
    <div className='w-full flex flex-col sm:flex-row gap-4'>
      {APP_KEY_FEATURES.map(({ title, description }) => (
        <Feature title={title} description={description} />
      ))}
    </div>
  )
}
