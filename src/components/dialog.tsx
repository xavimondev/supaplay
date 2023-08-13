import { PropsWithChildren, ReactNode, forwardRef } from 'react'
import * as DialogPrimitive from '@radix-ui/react-dialog'

type DialogProps = {
  btnOpen: ReactNode
  title: string
  description?: string
  btnClose?: ReactNode
}

export const Dialog = forwardRef<HTMLDivElement, PropsWithChildren<DialogProps>>(function DialogUi(
  { btnOpen, title, description, btnClose, children, ...props },
  forwardRef
) {
  return (
    <DialogPrimitive.Root>
      <DialogPrimitive.Trigger asChild>{btnOpen}</DialogPrimitive.Trigger>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className='bg-black/40 data-[state=open]:animate-overlayShow fixed inset-0' />
        <DialogPrimitive.Content
          {...props}
          ref={forwardRef}
          className='data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] h-[312px] w-[25vw] max-w-[850px] translate-x-[-50%] translate-y-[-50%] rounded-md bg-neutral-900 p-[25px] focus:outline-none overflow-scroll'
        >
          <DialogPrimitive.Title className='text-white m-0 text-lg font-medium mb-5'>
            {title}
          </DialogPrimitive.Title>
          {description && (
            <DialogPrimitive.Description className='text-gray-400 mt-[10px] mb-5 text-[15px] leading-normal'>
              {description}
            </DialogPrimitive.Description>
          )}
          {children}
          {btnClose && <DialogPrimitive.Close asChild>{btnClose}</DialogPrimitive.Close>}
          <DialogPrimitive.Close asChild>
            <button
              className='text-gray-300 hover:bg-black/30 focus:shadow-slate-200 absolute top-[14px] right-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:shadow-[0_0_0_2px] focus:outline-none'
              aria-label='Close'
            >
              x
            </button>
          </DialogPrimitive.Close>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  )
})
