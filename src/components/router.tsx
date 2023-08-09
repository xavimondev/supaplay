import { Route } from 'wouter'
import { Credentials } from '@/components/credentials'
import { Playground } from '@/components/playground'

export function Router() {
  return (
    <>
      <Route path='/' component={Credentials} />
      <Route path='/play' component={Playground} />
    </>
  )
}
