import { LinkData } from '@/types'
import { memo } from 'react'

type PreviewProps = {
  linkData: LinkData
}

export const Preview = memo(function Preview({ linkData }: PreviewProps) {
  console.log(linkData)
  const { uuid, src } = linkData
  return <iframe width='100%' height='100%' src={src} key={uuid}></iframe>
})
