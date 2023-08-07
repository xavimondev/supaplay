export const PACKAGE_JSON_CONTENT = `
  {
    "name": "supatuts",
    "type": "module",
    "dependencies":{
      "@supabase/supabase-js":"latest"
    },
    "scripts": {
      "start": "node index.js"
    }
  }
`.trim()

export const INDEX_JS_CONTENT = `import { createClient } from '@supabase/supabase-js'
  // Create a single supabase client for interacting with your database
  const supabase = createClient('https://ifqnvmhhabkpzxylyfmd.supabase.co', 
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlmcW52bWhoYWJrcHp4eWx5Zm1kIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTEyNTA4MDcsImV4cCI6MjAwNjgyNjgwN30.SpP4oMZN8bgbV8tUrWqhf-Y0eXd9M3UzyP7hhnjX6GA',
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  })
`
