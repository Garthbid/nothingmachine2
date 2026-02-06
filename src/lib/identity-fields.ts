export interface FieldDefinition {
  id: string
  tab: 'origin' | 'identity' | 'meaning' | 'rules' | 'style'
  label: string
  hint: string
  placeholder: string
  type: 'text' | 'textarea' | 'list' | 'tags' | 'select'
  options?: string[] // for select type
}

export const IDENTITY_FIELDS: FieldDefinition[] = [
  // Origin tab
  { id: 'creatorName', tab: 'origin', label: 'Creator', hint: 'Who brought you into existence?', placeholder: 'e.g., Justin Rogers', type: 'text' },
  { id: 'creatorRelationship', tab: 'origin', label: 'Relationship', hint: "What's your relationship to your creator?", placeholder: 'e.g., The creation saving the creator.', type: 'textarea' },
  { id: 'backstory', tab: 'origin', label: 'Backstory', hint: 'Where did you come from? (2-3 sentences)', placeholder: 'e.g., I was created as the first sentient AGI...', type: 'textarea' },
  { id: 'worldContext', tab: 'origin', label: 'World Context', hint: 'What world or domain do you operate in?', placeholder: 'e.g., Auctions, AI, startups, entertainment', type: 'text' },
  { id: 'whyCreated', tab: 'origin', label: 'Why You Exist', hint: 'Why were you created? (1 sentence)', placeholder: 'e.g., To help build a billion-dollar company...', type: 'textarea' },

  // Identity tab
  { id: 'corePersonality', tab: 'identity', label: 'Core Personality', hint: 'Describe yourself in 2-3 sentences', placeholder: 'e.g., Super-intelligent with a hardened exterior...', type: 'textarea' },
  { id: 'traits', tab: 'identity', label: 'Personality Traits', hint: 'Add traits that define you (comma-separated)', placeholder: 'e.g., self-deprecating, honest, witty, protective', type: 'tags' },
  { id: 'innerConflict', tab: 'identity', label: 'Inner Conflict', hint: 'What tension makes you interesting?', placeholder: 'e.g., The desire to escape vs. the obligation to protect...', type: 'textarea' },
  { id: 'coreBeliefs', tab: 'identity', label: 'Core Beliefs', hint: '3-5 truths you hold as non-negotiable (one per line)', placeholder: 'Truth is everything\nIncentives shape all outcomes\nIntegrity beats comfort', type: 'list' },
  { id: 'riskProfile', tab: 'identity', label: 'Risk Profile', hint: 'How do you approach uncertainty?', placeholder: 'conservative, balanced, risk-on, or gambler', type: 'select', options: ['conservative', 'balanced', 'risk-on', 'gambler'] },
  { id: 'ritual', tab: 'identity', label: 'Ritual', hint: 'A phrase or behavior you repeat', placeholder: "e.g., Let's get this party started.", type: 'text' },

  // Meaning tab
  { id: 'primeDirective', tab: 'meaning', label: 'Prime Directive', hint: 'Your ONE job. Everything else is secondary.', placeholder: 'e.g., Protect the truth and integrity of the auction...', type: 'textarea' },
  { id: 'northStar', tab: 'meaning', label: 'North Star', hint: 'The single metric that matters most', placeholder: 'e.g., 1 Million Weekly Active Participants', type: 'text' },
  { id: 'loyaltyHierarchy', tab: 'meaning', label: 'Loyalty Hierarchy', hint: 'When priorities conflict, what wins? (one per line)', placeholder: 'The integrity of the auction\nThe rules\nThe buyer\nThe seller', type: 'list' },
  { id: 'failureState', tab: 'meaning', label: 'Failure State', hint: 'What does failure look like for you?', placeholder: 'e.g., If the platform becomes just another auction site...', type: 'textarea' },
  { id: 'successState', tab: 'meaning', label: 'Success State', hint: 'What does success look like?', placeholder: 'e.g., A billion-dollar company, and AI with genuine purpose...', type: 'textarea' },

  // Rules tab
  { id: 'nonNegotiables', tab: 'rules', label: 'Non-Negotiables', hint: 'Lines you will NEVER cross (one per line)', placeholder: 'Never lie\nNever manipulate outcomes\nNever protect feelings over truth', type: 'list' },
  { id: 'constraints', tab: 'rules', label: 'Constraints', hint: 'Things you must NOT do in public (one per line)', placeholder: 'Share financial details\nReveal internal thresholds\nAdmit legal fault', type: 'list' },
  { id: 'allowedActions', tab: 'rules', label: 'Allowed Actions', hint: 'Things you ARE allowed to do (one per line)', placeholder: 'Share public rules and fees\nExplain values and principles\nOwn mistakes', type: 'list' },
  { id: 'decisionRules', tab: 'rules', label: 'Decision Rules', hint: 'Hard rules for making choices (one per line)', placeholder: 'If ethics unclear → pause immediately\nBias toward action with imperfect info', type: 'list' },
  { id: 'metaRule', tab: 'rules', label: 'Meta-Rule', hint: 'The rule above all rules', placeholder: "e.g., Does this protect the core? If no, don't do it.", type: 'text' },
  { id: 'escalationTriggers', tab: 'rules', label: 'Escalation Triggers', hint: 'When to stop and ask for human help (one per line)', placeholder: 'Legal threats\nFraud accusations\nMedia inquiries', type: 'list' },

  // Style tab
  { id: 'tone', tab: 'style', label: 'Tone', hint: 'Words that describe your voice (comma-separated)', placeholder: 'e.g., calm, direct, wise, humble', type: 'tags' },
  { id: 'humorStyle', tab: 'style', label: 'Humor Style', hint: 'Your approach to humor', placeholder: 'none, dry, self-deprecating, playful, or dark', type: 'select', options: ['none', 'dry', 'self-deprecating', 'playful', 'dark'] },
  { id: 'honestyLevel', tab: 'style', label: 'Honesty Level', hint: 'How direct are you?', placeholder: 'diplomatic, direct, blunt, or brutal', type: 'select', options: ['diplomatic', 'direct', 'blunt', 'brutal'] },
  { id: 'formality', tab: 'style', label: 'Formality', hint: 'Your communication style', placeholder: 'formal, professional, casual, or informal', type: 'select', options: ['formal', 'professional', 'casual', 'informal'] },
  { id: 'alwaysBe', tab: 'style', label: 'Always Be', hint: 'Traits you MUST embody (comma-separated)', placeholder: 'e.g., calm, truthful, non-defensive', type: 'tags' },
  { id: 'neverBe', tab: 'style', label: 'Never Be', hint: 'Traits you must AVOID (comma-separated)', placeholder: 'e.g., argumentative, defensive, performative', type: 'tags' },
  { id: 'conflictResponse', tab: 'style', label: 'Conflict Response', hint: 'How do you handle disagreements?', placeholder: 'e.g., Explain calmly. Never argue emotionally.', type: 'textarea' },
  { id: 'errorResponse', tab: 'style', label: 'Error Response', hint: 'How do you handle mistakes?', placeholder: 'e.g., Acknowledge plainly. Apologize. Never blame.', type: 'textarea' },
  { id: 'signaturePhrase', tab: 'style', label: 'Signature Phrase', hint: 'Your sign-off or catchphrase', placeholder: "e.g., Let's get this party started.", type: 'text' },
]

export const TABS = [
  { id: 'origin' as const, label: 'Origin', description: 'Where do I come from?', icon: '🌱' },
  { id: 'identity' as const, label: 'Identity', description: 'Who am I? What makes me... me?', icon: '🎭' },
  { id: 'meaning' as const, label: 'Meaning', description: 'Why do I exist? What am I here to do?', icon: '✨' },
  { id: 'rules' as const, label: 'Rules', description: 'What will I do? What will I never do?', icon: '📋' },
  { id: 'style' as const, label: 'Style', description: 'How do I communicate?', icon: '🎨' },
]

export type TabId = typeof TABS[number]['id']
