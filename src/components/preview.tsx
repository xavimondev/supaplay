import { LinkData } from '@/types'
import { memo } from 'react'

type PreviewProps = {
  linkData: LinkData
  setIsLoadingComponent: React.Dispatch<
    React.SetStateAction<{
      isBooting: boolean
      isRequesting: boolean
    }>
  >
}

export const Preview = memo(function Preview({ linkData, setIsLoadingComponent }: PreviewProps) {
  const { uuid, src } = linkData
  return (
    <iframe
      width='100%'
      height='100%'
      src={src}
      key={uuid}
      onLoad={() => {
        setIsLoadingComponent({
          isBooting: false,
          isRequesting: false
        })
      }}
    ></iframe>
  )
})
