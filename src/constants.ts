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

export const CODE_EDITOR_DEFAULT = `export async function queryDatabase() { 

}
`
