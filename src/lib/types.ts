export interface MemoryFile {
  id: string
  name: string
  path: string
  content: string
  type: 'soul' | 'memory' | 'knowledge' | 'daily' | 'custom'
  lastModified: Date
  injected: boolean
  isFolder?: boolean
  children?: MemoryFile[]
}

export interface Message {
  id: string
  role: 'user' | 'assistant' | 'system'
  content: string
  timestamp: Date
  injectedFiles?: string[]
}

export interface Constraint {
  id: string
  name: string
  description: string
  enabled: boolean
  weight: number
}

export interface PersonalityTraits {
  warmth: number
  directness: number
  humor: number
  formality: number
  curiosity: number
  caution: number
}

export interface SoulConfig {
  purpose: string
  northStar: string
  constraints: Constraint[]
  personality: PersonalityTraits
}

export interface FolderStructure {
  name: string
  path: string
  isFolder: boolean
  children?: FolderStructure[]
  file?: MemoryFile
}
