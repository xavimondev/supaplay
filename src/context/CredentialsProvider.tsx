import { ReactNode, createContext, useContext, useEffect, useState } from 'react'
import { Credentials } from '@/types'

type CredentialsContext = {
  credentials: Credentials
  setCredentials: React.Dispatch<React.SetStateAction<Credentials>>
}

const initialState: Credentials = {
  urlProject: '',
  serviceKey: ''
}

const CredentialsContext = createContext<CredentialsContext>({
  credentials: initialState,
  setCredentials: () => undefined
})

type CredentialsProviderProps = {
  children: ReactNode
}

export function CredentialsProvider({ children }: CredentialsProviderProps) {
  const [credentials, setCredentials] = useState<Credentials>(() => {
    const storedCredentials = localStorage.getItem('supaplay-keys')
    return storedCredentials ? JSON.parse(storedCredentials) : initialState
  })

  useEffect(() => {
    localStorage.setItem('supaplay-keys', JSON.stringify(credentials))
  }, [credentials])

  return (
    <CredentialsContext.Provider
      value={{
        credentials,
        setCredentials
      }}
    >
      {children}
    </CredentialsContext.Provider>
  )
}

export function useCredentials() {
  const context = useContext(CredentialsContext)
  if (context === undefined)
    throw new Error('useCredentials must be used within a CredentialsProvider')
  return context
}
