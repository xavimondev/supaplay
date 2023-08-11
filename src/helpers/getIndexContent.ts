import { getMainIFrameContent, removeBreaklineAndSpace } from '@/helpers/iframe'

export const getIndexContent = (getDataFunction: string) => {
  return `
  import express from 'express'
  import { supabase } from './supabase.js'
  import { getFrameContent } from './helpers.js'

  const app = express()
  const port = 3111

  ${getDataFunction}

  app.get('/', async (req, res) => {
    try{
      const result = await getData()
      let html = ''
      if(!result) {
        return res.send('${removeBreaklineAndSpace(getMainIFrameContent())}')
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
