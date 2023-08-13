import { Route } from 'wouter'
import { Playground } from '@/components/playground'
import { Landing } from '@/components/landing'

export function Router() {
  return (
    <>
      <Route path='/' component={Landing} />
      <Route path='/play' component={Playground} />
    </>
  )
}
