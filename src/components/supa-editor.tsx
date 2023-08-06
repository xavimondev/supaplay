import Editor from '@monaco-editor/react'

export function SupaEditor() {
  return (
    <Editor
      options={{
        fontSize: 18,
        tabSize: 2,
        showDeprecated: true,
        showUnused: true,
        wordWrap: 'wordWrapColumn',
        wordWrapColumn: 80,
        minimap: {
          autohide: true
        }
      }}
      height='100vh'
      defaultLanguage='typescript'
      defaultValue='// some comment'
      theme='vs-dark'
      loading={<span className='text-white'>Loading editor...</span>}
    />
  )
}
