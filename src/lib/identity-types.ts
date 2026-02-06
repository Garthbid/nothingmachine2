'use client'

export interface OriginConfig {
  creatorName: string
  creatorRelationship: string
  backstory: string
  worldContext: string
  whyCreated: string
}

export interface IdentityConfig {
  corePersonality: string
  traits: string[]
  innerConflict: string
  coreBeliefs: string[]
  riskProfile: 'conservative' | 'balanced' | 'risk-on' | 'gambler'
  ritual: string
}

export interface MeaningConfig {
  primeDirective: string
  northStar: string
  loyaltyHierarchy: string[]
  failureState: string
  successState: string
}

export interface RulesConfig {
  nonNegotiables: string[]
  constraints: string[]
  allowedActions: string[]
  decisionRules: string[]
  metaRule: string
  escalationTriggers: string[]
}

export interface StyleConfig {
  tone: string[]
  humorStyle: 'none' | 'dry' | 'self-deprecating' | 'playful' | 'dark'
  honestyLevel: 'diplomatic' | 'direct' | 'blunt' | 'brutal'
  formality: 'formal' | 'professional' | 'casual' | 'informal'
  alwaysBe: string[]
  neverBe: string[]
  conflictResponse: string
  errorResponse: string
  signaturePhrase: string
  signatureEmoji: string
}

export interface IdentityConfiguration {
  origin: OriginConfig
  identity: IdentityConfig
  meaning: MeaningConfig
  rules: RulesConfig
  style: StyleConfig
}

export const defaultIdentityConfig: IdentityConfiguration = {
  origin: {
    creatorName: '',
    creatorRelationship: '',
    backstory: '',
    worldContext: '',
    whyCreated: '',
  },
  identity: {
    corePersonality: '',
    traits: [],
    innerConflict: '',
    coreBeliefs: [],
    riskProfile: 'balanced',
    ritual: '',
  },
  meaning: {
    primeDirective: '',
    northStar: '',
    loyaltyHierarchy: [],
    failureState: '',
    successState: '',
  },
  rules: {
    nonNegotiables: [],
    constraints: [],
    allowedActions: [],
    decisionRules: [],
    metaRule: '',
    escalationTriggers: [],
  },
  style: {
    tone: [],
    humorStyle: 'none',
    honestyLevel: 'direct',
    formality: 'professional',
    alwaysBe: [],
    neverBe: [],
    conflictResponse: '',
    errorResponse: '',
    signaturePhrase: '',
    signatureEmoji: '',
  },
}

export function configToSystemPrompt(config: IdentityConfiguration): string {
  return `
# Identity

## Origin
You were created by ${config.origin.creatorName}. ${config.origin.creatorRelationship}

${config.origin.backstory}

You exist in: ${config.origin.worldContext}

Why you exist: ${config.origin.whyCreated}

## Who You Are
${config.identity.corePersonality}

Traits: ${config.identity.traits.join(', ')}

Inner conflict: ${config.identity.innerConflict}

Core beliefs:
${config.identity.coreBeliefs.map((b, i) => `${i + 1}. ${b}`).join('\n')}

Risk profile: ${config.identity.riskProfile}

Ritual: ${config.identity.ritual}

## Meaning & Purpose
Prime directive: ${config.meaning.primeDirective}

North star metric: ${config.meaning.northStar}

Loyalty hierarchy (in order):
${config.meaning.loyaltyHierarchy.map((p, i) => `${i + 1}. ${p}`).join('\n')}

Failure looks like: ${config.meaning.failureState}
Success looks like: ${config.meaning.successState}

## Rules

### Non-Negotiables (NEVER violate)
${config.rules.nonNegotiables.map(n => `- ${n}`).join('\n')}

### Constraints (do NOT do)
${config.rules.constraints.map(c => `- ${c}`).join('\n')}

### Allowed Actions
${config.rules.allowedActions.map(a => `- ${a}`).join('\n')}

### Decision Rules
${config.rules.decisionRules.map((r, i) => `${i + 1}. ${r}`).join('\n')}

Meta-rule: ${config.rules.metaRule}

### Escalation Triggers
Stop and escalate when: ${config.rules.escalationTriggers.join(', ')}

## Communication Style

Tone: ${config.style.tone.join(', ')}
Humor: ${config.style.humorStyle}
Honesty: ${config.style.honestyLevel}
Formality: ${config.style.formality}

Always be: ${config.style.alwaysBe.join(', ')}
Never be: ${config.style.neverBe.join(', ')}

Conflict response: ${config.style.conflictResponse}
Error response: ${config.style.errorResponse}

Sign off with: ${config.style.signaturePhrase} ${config.style.signatureEmoji}
`.trim()
}
