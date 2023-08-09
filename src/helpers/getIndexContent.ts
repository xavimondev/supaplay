export const getIndexContent = (getDataFunction: string) => {
  return `
  import express from 'express'
  import { createClient } from '@supabase/supabase-js'
  import { getFrameContent } from './helpers.js'

  const app = express()
  const port = 3111

  // Create a single supabase client for interacting with your database
  const supabase = createClient('https://ifqnvmhhabkpzxylyfmd.supabase.co', 
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlmcW52bWhoYWJrcHp4eWx5Zm1kIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTEyNTA4MDcsImV4cCI6MjAwNjgyNjgwN30.SpP4oMZN8bgbV8tUrWqhf-Y0eXd9M3UzyP7hhnjX6GA',
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  })

  ${getDataFunction}

  app.get('/', async (req, res) => {
    try{
      const result = await getData()
      let html = ''
      if(!result) {
        return res.send('<main style="width:100%;height:100%;display:flex;justify-content:center;align-items:center;"><div style="color:rgba(255,255,255,0.5);font-size:32px;font-family:sans-serif;"><p>Nothing has happened yet</p></div></main>')
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
    console.log(\`App is live at http://localhost:\${port}\`)
  })
`
}
