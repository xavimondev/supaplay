import { Loading } from '@/components/loading'

type PlaceholderProps = {
  msg: string
}

export function Placeholder({ msg }: PlaceholderProps) {
  return (
    <div className='w-full h-full flex flex-col gap-6 items-center justify-center'>
      <Loading className='w-24 h-24 text-white/30' />
      <p className='text-lg text-white/60'>{msg}</p>
    </div>
  )
}
