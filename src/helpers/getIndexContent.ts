export const getIndexContent = (getDataFunction: string) => {
  return `
  import express from 'express'
  import { createClient } from '@supabase/supabase-js'
  
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
      console.log(result)
      if(result.error) throw new Error('An error has ocurred. Try again 😢')
      const people = JSON.stringify(result.data)
      const html = \`<!DOCTYPE html><html><body><div id='json-viewer'></div><script src='https://cdn.jsdelivr.net/npm/@textea/json-viewer@3'></script><script>new JsonViewer({value:\${people},theme:'dark',rootName:'data'}).render('#json-viewer')</script></body></html>\`
      res.send(html)
    }catch(error){
      const html = \`<h1>\${error.message}</h1>\`
      res.send(html)
      console.error(error)
    }
  })

  app.listen(port, () => {
    console.log(\`App is live at http://localhost:\${port}\`);
  })
`
}
