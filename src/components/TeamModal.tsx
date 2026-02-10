'use client'

import { useState } from 'react'
import { useTeamStore } from '@/lib/team-store'
import { Button } from '@/components/ui/button'
import { X } from 'lucide-react'

export function TeamModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { members, addMember, removeMember } = useTeamStore()
  const [name, setName] = useState('')

  if (!open) return null

  const handleAdd = () => {
    if (!name.trim()) return
    addMember(name)
    setName('')
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleAdd()
  }

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/60">
      <div className="bg-[#111] border border-white/10 rounded-lg w-full max-w-md p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-white">Team Members</h2>
          <button onClick={onClose} className="text-white/40 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>

        {members.length > 0 ? (
          <div className="space-y-2 mb-6 max-h-60 overflow-y-auto">
            {members.map((member) => (
              <div
                key={member.id}
                className="flex items-center justify-between px-3 py-2 rounded-md bg-black/30"
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-medium text-white shrink-0"
                    style={{ backgroundColor: member.color }}
                  >
                    {member.avatar}
                  </div>
                  <span className="text-sm text-white">{member.name}</span>
                </div>
                <button
                  onClick={() => removeMember(member.id)}
                  className="text-white/30 hover:text-white/70 transition-colors"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-white/40 mb-6">No team members yet. Add someone below.</p>
        )}

        <div className="flex gap-2">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Team member name"
            className="flex-1 bg-black/40 border border-white/10 rounded-md px-3 py-2 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-white/30"
            autoFocus
          />
          <Button
            size="sm"
            onClick={handleAdd}
            disabled={!name.trim()}
            className="bg-white text-black hover:bg-white/90"
          >
            Add
          </Button>
        </div>

        <div className="flex justify-end mt-6">
          <Button variant="ghost" size="sm" onClick={onClose} className="text-white/60">
            Done
          </Button>
        </div>
      </div>
    </div>
  )
}
