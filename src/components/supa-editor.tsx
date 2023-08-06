import Editor from '@monaco-editor/react'

type SupaEditorProps = {
  defaultCode: string
  onChangeCode: React.Dispatch<React.SetStateAction<string>>
}

export function SupaEditor({ defaultCode, onChangeCode }: SupaEditorProps) {
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
          enabled: false
        }
      }}
      onChange={(value) => onChangeCode(value as string)}
      height='100vh'
      defaultLanguage='typescript'
      defaultValue={defaultCode}
      theme='vs-dark'
      loading={<span className='text-white'>Loading editor...</span>}
    />
  )
}
