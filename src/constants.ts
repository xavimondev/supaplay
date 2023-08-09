export const PACKAGE_JSON_CONTENT = `
  {
    "name": "supatuts",
    "type": "module",
    "dependencies":{
      "@supabase/supabase-js":"2.31.0",
      "express": "4.18.2",
      "nodemon": "3.0.1"
    },
    "scripts": {
      "start": "nodemon index.js"
    }
  }
`.trim()

export const HELPERS_CONTENT = `
  export function getFrameContent(data) {
    return \`<!DOCTYPE html><html><body><div id='json-viewer'></div><script src='https://cdn.jsdelivr.net/npm/@textea/json-viewer@3'></script><script>new JsonViewer({value:\${data},theme:'dark',rootName:'data'}).render('#json-viewer')</script></body></html>\`
  }
`
