import Editor, { type Monaco } from '@monaco-editor/react'
import { constrainedEditor } from 'constrained-editor-plugin'

type SupaEditorProps = {
  defaultCode: string
  onChangeCode: (code: string) => void
}

export function SupaEditor({ defaultCode, onChangeCode }: SupaEditorProps) {
  const handleEditorDidMount = (editor: any, monaco: Monaco) => {
    monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
      ...monaco.languages.typescript.typescriptDefaults.getCompilerOptions(),
      module: monaco.languages.typescript.ModuleKind.ESNext,
      target: monaco.languages.typescript.ScriptTarget.ESNext,
      moduleResolution: monaco.languages.typescript.ModuleResolutionKind.NodeJs,
      isolatedModules: true,
      allowJs: true,
      strict: true,
      skipLibCheck: true
    })

    const constrainedInstance = constrainedEditor(monaco)
    const model = editor.getModel()
    constrainedInstance.initializeIn(editor)
    constrainedInstance.addRestrictionsTo(model, [
      {
        range: [2, 1, 2, 1], // Range of Function definition
        allowMultiline: true,
        label: 'funcDefinition'
      }
    ])
  }

  return (
    <Editor
      options={{
        fontSize: 17,
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
      height='100%'
      defaultLanguage='typescript'
      defaultValue={defaultCode}
      theme='vs-dark'
      loading={<span className='text-white'>Loading editor...</span>}
      onMount={handleEditorDidMount}
    />
  )
}
