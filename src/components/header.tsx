type HeaderProps = {
  children: React.ReactNode
}

export function Header({ children }: HeaderProps) {
  return <header className='w-full flex justify-between p-4 border-b-gray-500'>{children}</header>
}
