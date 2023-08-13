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

export const APP_KEY_FEATURES = [
  {
    title: 'WebContainer API Magic',
    description:
      'Experience the power of WebContainerAPI, running Node.js in your browser. Effortlessly harness its capabilities to create, edit, and run code seamlessly.'
  },
  {
    title: 'Interactive Query Testing',
    description:
      'Write and execute queries using Monaco editor and get JSON-formatted results. This makes it easy to integrate the results of your queries into your own applications.'
  },
  {
    title: 'Zero setup',
    description:
      'Supaplay Playground is all set up for you. No need to configure IDEs or dependencies. Just provide your Supabase keys and start testing your queries instantly.'
  }
]
