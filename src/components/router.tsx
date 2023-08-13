import { Route } from 'wouter'
import { Credentials } from '@/components/credentials'
import { Playground } from '@/components/playground'
import { Landing } from '@/components/landing'

export function Router() {
  return (
    <>
      <Route path='/' component={Landing} />
      <Route path='/signin' component={Credentials} />
      <Route path='/play' component={Playground} />
    </>
  )
}
