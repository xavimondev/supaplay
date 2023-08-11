import { useEffect, useState, useRef } from 'react'
import { WebContainer } from '@webcontainer/api'
import ANSIToHTML from 'ansi-to-html'
import { LinkData } from '@/types'
import { CODE_EDITOR_DEFAULT, PACKAGE_JSON_CONTENT } from '@/constants'
import {
  getHelpersFileContent,
  getIndexFileContent,
  getServicesFileContent,
  getSupabaseFileContent
} from '@/helpers/webcontainer'
import { getMainIFrameContent, removeBreaklineAndSpace } from '@/helpers/iframe'
import { useCredentials } from '@/context/CredentialsProvider'

const ansiConverter = new ANSIToHTML()

export function useWebContainer() {
  const [output, setOutput] = useState<string[]>([])
  const [linkData, setLinkData] = useState<LinkData>({
    uuid: '',
    src: ''
  })
  const webContainerInstanceRef = useRef<WebContainer | null>(null)
  const { credentials, defaultTable } = useCredentials()

  useEffect(() => {
    const bootWebContainer = async () => {
      if (!webContainerInstanceRef.current) {
        webContainerInstanceRef.current = await WebContainer.boot()
      }

      const mainIndexContent = removeBreaklineAndSpace(getMainIFrameContent(defaultTable))
      // mounting tree of files into filesystem
      await webContainerInstanceRef.current.mount({
        'index.js': {
          file: {
            contents: getIndexFileContent({
              mainIndexContent
            })
          }
        },
        'helpers.js': {
          file: {
            contents: getHelpersFileContent()
          }
        },
        'supabase.js': {
          file: {
            contents: getSupabaseFileContent({ ...credentials })
          }
        },
        'services.js': {
          file: {
            contents: getServicesFileContent({ mainFunction: CODE_EDITOR_DEFAULT })
          }
        },
        'package.json': {
          file: {
            contents: PACKAGE_JSON_CONTENT
          }
        }
      })
      // installing dependencies
      const install = await webContainerInstanceRef.current.spawn('npm', ['install'])
      setOutput(['Installing dependencies...'])
      install.output.pipeTo(
        new WritableStream({
          write(data) {
            try {
              setOutput((state) => [...state, ansiConverter.toHtml(data)])
            } catch (error) {
              console.error(error)
            }
          }
        })
      )

      const exitCode = await install.exit
      if (exitCode !== 0) {
        throw new Error('Installation failed')
      }

      // running server
      const start = await webContainerInstanceRef.current.spawn('npm', ['run', 'start'])
      start.output.pipeTo(
        new WritableStream({
          write(data) {
            try {
              setOutput((state) => [...state, ansiConverter.toHtml(data)])
            } catch (error) {
              console.log(error)
            }
          }
        })
      )

      // listening for events
      webContainerInstanceRef.current.on('server-ready', (_: any, url: any) => {
        setLinkData({
          src: url,
          uuid: crypto.randomUUID()
        })
      })
    }

    bootWebContainer()
  }, [])

  return {
    output,
    linkData,
    webContainerInstanceRef
  }
}
