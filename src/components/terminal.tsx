import { useRef, useEffect } from 'react'

type TerminalProps = {
  output: string[]
}
export const Terminal = ({ output }: TerminalProps) => {
  const outputDivRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (outputDivRef.current) {
      outputDivRef.current.scrollTop = outputDivRef.current.scrollHeight
    }
  }, [output])

  return (
    <div
      ref={outputDivRef}
      className='w-full h-[400px] bg-black overflow-y-scroll cursor-text'
      contentEditable={false}
      spellCheck={false}
    >
      <div className='w-full text-base p-2 font-mono'>
        {output.length > 0 ? (
          output.map((line) => {
            return (
              <p
                className='text-white'
                key={`${line}`}
                dangerouslySetInnerHTML={{ __html: line }}
              />
            )
          })
        ) : (
          <span className='text-zinc-400'>Click on run to evaluate the code.</span>
        )}
      </div>
    </div>
  )
}
