'use client'

import { useState } from 'react'
import { ChevronDown, LogOut } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useStore } from '@/lib/store'
import { BuildMachineDialog } from '@/components/marketplace/BuildMachineDialog'

export function Header() {
  const { hasTemplate, templateId, resetToBlankSlate } = useStore()
  const [showBuildDialog, setShowBuildDialog] = useState(false)

  return (
    <header
      className="fixed top-0 left-0 right-0 z-[100] flex items-center justify-between px-9 py-5"
      style={{
        background: '#0a0a0a',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
      }}
    >
      <div className="flex items-center gap-3">
        <div className="w-5 h-5 bg-white rounded-full" />
        <span className="text-sm font-normal tracking-[0.02em] text-white">Nothing Machine</span>
      </div>

      <div className="flex items-center gap-2">
        {hasTemplate && templateId === 'richard' ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="gap-2 text-white/70 hover:text-white hover:bg-white/5">
                <div className="w-1.5 h-1.5 rounded-full bg-white" />
                Richard
                <ChevronDown className="w-3 h-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-[#0a0a0a] border-white/10">
              <DropdownMenuItem className="text-white/70">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-white" />
                  Richard (Active)
                </div>
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-white/10" />
              <DropdownMenuItem onClick={resetToBlankSlate} className="text-white/50 hover:text-white">
                <LogOut className="w-4 h-4 mr-2" />
                Exit to Marketplace
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : hasTemplate && templateId === 'blank' ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="gap-2 text-white/70 hover:text-white hover:bg-white/5">
                <div className="w-1.5 h-1.5 rounded-full bg-white" />
                My Machine
                <ChevronDown className="w-3 h-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-[#0a0a0a] border-white/10">
              <DropdownMenuItem className="text-white/70">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-white" />
                  My Machine (Active)
                </div>
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-white/10" />
              <DropdownMenuItem onClick={resetToBlankSlate} className="text-white/50 hover:text-white">
                <LogOut className="w-4 h-4 mr-2" />
                Exit to Marketplace
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <button
            onClick={() => setShowBuildDialog(true)}
            className="group flex items-center gap-2 px-[22px] py-[10px] bg-transparent border border-white/25 rounded-md text-white text-xs font-normal tracking-[0.08em] uppercase cursor-pointer transition-all duration-400"
            style={{ transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)' }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'white'
              e.currentTarget.style.color = '#0a0a0a'
              e.currentTarget.style.borderColor = 'white'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent'
              e.currentTarget.style.color = 'white'
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.25)'
            }}
          >
            <span>Build Machine</span>
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="transition-transform duration-300 group-hover:translate-x-0.5"
            >
              <path d="M1 7h12M8 2l5 5-5 5" />
            </svg>
          </button>
        )}
      </div>

      <BuildMachineDialog open={showBuildDialog} onOpenChange={setShowBuildDialog} />
    </header>
  )
}
