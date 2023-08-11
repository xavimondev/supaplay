import { Credentials } from '@/types'

export const getSchemaDatabase = async ({ urlProject, serviceKey }: Credentials) => {
  try {
    const response = await fetch(`${urlProject}/rest/v1/?apikey=${serviceKey}`)
    if (!response.ok) throw new Error('An erro has ocurred while fetching credentials')
    const data = await response.json()
    return data
  } catch (error) {
    console.error(error)
    return null
  }
}
