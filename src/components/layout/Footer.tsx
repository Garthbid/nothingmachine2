'use client'

import { useStore } from '@/lib/store'

export function Footer() {
  const { files, injectedFileIds, messages } = useStore()

  // Rough token estimate (4 chars per token average)
  const estimatedTokens = messages.reduce((acc, m) => acc + Math.ceil(m.content.length / 4), 0)

  // Context usage (rough estimate based on injected files)
  const injectedContent = files
    .filter((f) => injectedFileIds.includes(f.id))
    .reduce((acc, f) => acc + f.content.length, 0)
  const contextPercentage = Math.min(100, Math.round((injectedContent / 100000) * 100))

  return (
    <footer
      className="fixed bottom-0 left-0 right-0 z-[100] flex items-center justify-between px-9 py-3"
      style={{
        background: 'linear-gradient(to top, rgba(10,10,10,0.95) 60%, transparent)',
        fontFamily: "'IBM Plex Mono', 'SF Mono', 'Fira Code', monospace",
        fontSize: '11px',
        fontWeight: 300,
        color: 'rgba(255,255,255,0.3)',
        letterSpacing: '0.04em'
      }}
    >
      <div className="flex items-center gap-1.5">
        <div
          className="w-[22px] h-[22px] border border-white/20 rounded flex items-center justify-center mr-2"
          style={{ fontWeight: 500, fontSize: '13px' }}
        >
          N
        </div>
        <span>Model: Claude Opus 4</span>
        <span className="mx-1.5">·</span>
        <span>Tokens: {estimatedTokens.toLocaleString()}</span>
        <span className="mx-1.5">·</span>
        <span>Memory: {files.length} files</span>
      </div>

      {/* Center pill */}
      <div
        className="absolute left-1/2 -translate-x-1/2 w-[60px] h-[3px] rounded-full"
        style={{ background: 'rgba(255,255,255,0.15)' }}
      />

      <div className="flex items-center gap-2">
        <span>Context: {contextPercentage}% used</span>
        <span className="mx-1">·</span>
        <span
          className="w-1.5 h-1.5 rounded-full"
          style={{
            background: '#4ade80',
            animation: 'pulse-dot 2s infinite'
          }}
        />
        <span>Connected</span>
      </div>

      <style jsx>{`
        @keyframes pulse-dot {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 1; }
        }
      `}</style>
    </footer>
  )
}
