'use client'

import { useState } from 'react'
import { ChevronDown, Home, User } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useStore } from '@/lib/store'
import { useProfileStore } from '@/lib/profile-store'
import { useTeamStore } from '@/lib/team-store'
import { ProfileModal } from '@/components/ProfileModal'
import { TeamModal } from '@/components/TeamModal'

export function Header() {
  const { setCurrentView } = useStore()
  const { profile } = useProfileStore()
  const { members } = useTeamStore()
  const [profileOpen, setProfileOpen] = useState(false)
  const [teamOpen, setTeamOpen] = useState(false)

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-[100] flex items-center justify-between px-9 py-5"
        style={{
          background: '#0a0a0a',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
        }}
      >
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-3 hover:opacity-80 transition-opacity cursor-pointer" style={{ background: 'transparent', border: 'none' }}>
              <div className="w-5 h-5 bg-white rounded-full" />
              <span className="text-sm font-normal tracking-[0.02em] text-white">Nothing Machine</span>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="bg-[#0a0a0a] border-white/10">
            <DropdownMenuItem
              onClick={() => setCurrentView('home')}
              className="text-white/70 cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <Home className="w-3.5 h-3.5" />
                Home
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setProfileOpen(true)}
            className="flex items-center gap-2 text-white/60 hover:text-white transition-colors cursor-pointer"
            style={{ background: 'transparent', border: 'none' }}
          >
            <User className="w-4 h-4" />
            <span className="text-sm">{profile?.name || 'Set Profile'}</span>
          </button>

          <div className="flex items-center">
            {members.map((member, i) => (
              <div
                key={member.id}
                title={member.name}
                className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-medium text-white border-2 border-[#0a0a0a]"
                style={{
                  backgroundColor: member.color,
                  marginLeft: i === 0 ? 0 : -6,
                  zIndex: members.length - i,
                  position: 'relative',
                }}
              >
                {member.avatar}
              </div>
            ))}
            <button
              onClick={() => setTeamOpen(true)}
              className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-medium text-white/60 hover:text-white border border-white/20 hover:border-white/40 transition-colors cursor-pointer"
              style={{
                background: 'rgba(255,255,255,0.05)',
                marginLeft: members.length > 0 ? -6 : 0,
                zIndex: 0,
                position: 'relative',
              }}
            >
              {members.length > 0 ? `+${members.length}` : '+'}
            </button>
          </div>

          <div className="w-px h-4 bg-white/10" />

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
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      <ProfileModal open={profileOpen} onClose={() => setProfileOpen(false)} />
      <TeamModal open={teamOpen} onClose={() => setTeamOpen(false)} />
    </>
  )
}
