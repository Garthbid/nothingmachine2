import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const AVATAR_COLORS = [
  '#7C3AED',
  '#2563EB',
  '#059669',
  '#D97706',
  '#DC2626',
  '#8B5CF6',
  '#0891B2',
  '#65A30D',
]

function getInitials(name: string): string {
  return name
    .split(' ')
    .filter(Boolean)
    .map((w) => w[0].toUpperCase())
    .slice(0, 2)
    .join('')
}

function randomColor(): string {
  return AVATAR_COLORS[Math.floor(Math.random() * AVATAR_COLORS.length)]
}

export interface TeamMember {
  id: string
  name: string
  avatar: string
  color: string
}

interface TeamState {
  members: TeamMember[]
  addMember: (name: string) => void
  removeMember: (id: string) => void
}

export const useTeamStore = create<TeamState>()(
  persist(
    (set) => ({
      members: [],
      addMember: (name) =>
        set((state) => ({
          members: [
            ...state.members,
            {
              id: crypto.randomUUID(),
              name: name.trim(),
              avatar: getInitials(name),
              color: randomColor(),
            },
          ],
        })),
      removeMember: (id) =>
        set((state) => ({
          members: state.members.filter((m) => m.id !== id),
        })),
    }),
    {
      name: 'nothing-machine-team',
    }
  )
)
