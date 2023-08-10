import { CredentialsProvider } from '@/context/CredentialsProvider'
import { Router } from '@/components/router'

export default function App() {
  return (
    <CredentialsProvider>
      <Router />
    </CredentialsProvider>
  )
}
