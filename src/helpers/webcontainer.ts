import { Credentials } from '@/types'

export const getSupabaseFileContent = (credentials: Credentials | undefined) => {
  if (!credentials) return 'export const supabase = undefined'

  const { serviceKey, urlProject } = credentials
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

export const getIndexFileContent = ({ mainIndexContent }: { mainIndexContent: string }) => {
  return `
  import express from 'express'
  import { getFrameContent } from './helpers.js'
  import { queryDatabase } from './services.js'

  const app = express()
  const port = 3111

  app.get('/', async (req, res) => {
    try{
      const result = await queryDatabase()
      let html = ''
      if(!result) {
        return res.send('${mainIndexContent}')
      }
      if(result.error) {
        html = getFrameContent(JSON.stringify(result.error))
        return res.send(html)
      }

      if(result.status === 200) {
        const data = result.data ?? {count:result.count}
        html = getFrameContent(JSON.stringify(data))
      }else if(result.status === 201) {
        const data = result.data ?? {message:'One row affected'}
        html = getFrameContent(JSON.stringify(data))
      }else if(result.status === 204) {
        html = getFrameContent(JSON.stringify({message:'One row affected'}))
      }
      
      return res.send(html)
    }catch(error){
      console.error(error)
      const html = \`<h1>\${error.message}</h1>\`
      return res.send(html)
    }
  })

  app.listen(port, () => {
    //console.log(\`App is live at http://localhost:\${port}\`)
  })
`
}

export const getServicesFileContent = ({ mainFunction }: { mainFunction: string }) => {
  return `
  import { supabase } from './supabase.js'

  ${mainFunction}
`
}

export const getHelpersFileContent = () => {
  return `
  export function getFrameContent(data) {
    return \`<!DOCTYPE html><html><body><div id='json-viewer'></div><script src='https://cdn.jsdelivr.net/npm/@textea/json-viewer@3'></script><script>new JsonViewer({value:\${data},theme:'dark',rootName:'data'}).render('#json-viewer')</script></body></html>\`
  }
  `
}
