export const getSupabaseFileContent = ({
  urlProject,
  serviceKey
}: {
  urlProject: string
  serviceKey: string
}) => {
  return `
  import { createClient } from '@supabase/supabase-js'
  export const supabase = createClient('${urlProject}','${serviceKey}',
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  })  
`
}
