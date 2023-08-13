import { ReactNode, createContext, useContext, useEffect, useState } from 'react'
import { useLocation } from 'wouter'
import { Credentials, DefaultTable } from '@/types'
import { getRandomElementArray } from '@/helpers/getRandomElement'
import { getSchemaDatabase } from '@/services/getSchemaDatabase'

type CredentialsContext = {
  defaultTable: DefaultTable | undefined
  credentials: Credentials
  setCredentials: React.Dispatch<React.SetStateAction<Credentials>>
}

const initialState: Credentials = {
  urlProject: '',
  serviceKey: ''
}

const CredentialsContext = createContext<CredentialsContext>({
  defaultTable: undefined,
  credentials: initialState,
  setCredentials: () => undefined
})

type CredentialsProviderProps = {
  children: ReactNode
}

export function CredentialsProvider({ children }: CredentialsProviderProps) {
  const [defaultTable, setDefaultTable] = useState<DefaultTable | undefined>(() => {
    const defaultTable = localStorage.getItem('supaplay-table')
    return defaultTable ? JSON.parse(defaultTable) : undefined
  })
  const [credentials, setCredentials] = useState<Credentials>(() => {
    const storedCredentials = localStorage.getItem('supaplay-keys')
    return storedCredentials ? JSON.parse(storedCredentials) : initialState
  })
  const [location, setLocation] = useLocation()

  useEffect(() => {
    const { serviceKey, urlProject } = credentials
    const hasCredentials = serviceKey !== '' && urlProject !== ''

    if (!hasCredentials) {
      return
    }

    const getSchema = async () => {
      const data = await getSchemaDatabase({ ...credentials })
      if (data) {
        const { definitions } = data
        const dbTables = Object.keys(definitions).filter((table) => table !== '_prisma_migrations')
        const randomTable = getRandomElementArray(dbTables)
        const randomTableProperties = Object.keys(definitions[randomTable].properties)
        const defaultTable = {
          table: randomTable,
          properties: randomTableProperties
        }
        setDefaultTable(defaultTable)
        localStorage.setItem('supaplay-keys', JSON.stringify(credentials))
        localStorage.setItem('supaplay-table', JSON.stringify(defaultTable))
      }
    }

    getSchema()
  }, [credentials])

  useEffect(() => {
    const { serviceKey, urlProject } = credentials
    const hasCredentials = serviceKey !== '' && urlProject !== ''

    if (!hasCredentials) {
      setLocation('/signin')
      return
    }

    if (location === '/signin' && hasCredentials) setLocation('/play')
  }, [])

  return (
    <CredentialsContext.Provider
      value={{
        credentials,
        setCredentials,
        defaultTable
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
