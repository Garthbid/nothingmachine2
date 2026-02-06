'use client'

import { useChat as useVercelChat } from '@ai-sdk/react'
import { DefaultChatTransport } from 'ai'
import { useStore } from './store'
import { useMemo } from 'react'

export function useNothingMachineChat() {
  const { files, injectedFileIds, soulConfig } = useStore()

  // Get the actual injected file objects
  const injectedFiles = files.filter((f) => injectedFileIds.includes(f.id))

  // Create transport with dynamic body - memoized to prevent recreation
  const transport = useMemo(() => {
    return new DefaultChatTransport({
      api: '/api/chat',
      body: {
        injectedFiles: injectedFiles.map((f) => ({
          name: f.name,
          path: f.path,
          content: f.content,
        })),
        soulConfig: {
          purpose: soulConfig.purpose,
          northStar: soulConfig.northStar,
          constraints: soulConfig.constraints,
          personality: soulConfig.personality,
        },
      },
    })
  }, [injectedFiles, soulConfig])

  const chat = useVercelChat({
    transport,
  })

  return {
    messages: chat.messages,
    sendMessage: chat.sendMessage,
    status: chat.status,
    isLoading: chat.status === 'streaming' || chat.status === 'submitted',
    stop: chat.stop,
    setMessages: chat.setMessages,
    error: chat.error,
  }
}
