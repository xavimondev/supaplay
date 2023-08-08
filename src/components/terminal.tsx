import { useRef, useEffect, useState } from 'react'
import { TerminalIc } from '@/components/icons'

type TerminalProps = {
  output: string[]
}
export const Terminal = ({ output }: TerminalProps) => {
  const outputDivRef = useRef<HTMLDivElement | null>(null)
  const [isOpen, setIsOpen] = useState(true)

  useEffect(() => {
    if (outputDivRef.current) {
      outputDivRef.current.scrollTop = outputDivRef.current.scrollHeight
    }
  }, [output])

  return (
    <div className='border-t border-t-white/10 bg-black'>
      <div className='w-full flex justify-between items-center text-gray-300 p-2'>
        <span className='text-xs'>Terminal</span>
        <button onClick={() => setIsOpen(!isOpen)}>
          <TerminalIc className='h-4 w-4' />
        </button>
      </div>
      {isOpen && (
        <div
          ref={outputDivRef}
          className='w-full h-[400px] overflow-y-scroll cursor-text'
          contentEditable={false}
          spellCheck={false}
        >
          <div className='w-full text-base p-2 font-mono'>
            {output.length > 0 ? (
              output.map((line, index) => {
                return (
                  <p
                    className='text-white'
                    key={`${index}`}
                    dangerouslySetInnerHTML={{ __html: line }}
                  />
                )
              })
            ) : (
              <span className='text-zinc-400'>Click on run to evaluate the code.</span>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
