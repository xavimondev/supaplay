type HeaderProps = {
  children: React.ReactNode
}

export function Header({ children }: HeaderProps) {
  return (
    <header className='w-full flex justify-between p-3.5 border-b border-b-white/10'>
      {children}
    </header>
  )
}
