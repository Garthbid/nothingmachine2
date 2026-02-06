import { anthropic } from '@ai-sdk/anthropic'
import { streamText } from 'ai'
import { NextRequest } from 'next/server'

export const runtime = 'edge'

interface Constraint {
  name: string
  description: string
  enabled: boolean
  weight: number
}

interface PersonalityTraits {
  warmth: number
  directness: number
  humor: number
  formality: number
  curiosity: number
  caution: number
}

interface SoulConfig {
  purpose: string
  northStar: string
  constraints: Constraint[]
  personality: PersonalityTraits
}

interface InjectedFile {
  name: string
  path: string
  content: string
}

interface MessagePart {
  type: string
  text?: string
}

interface UIMessage {
  id: string
  role: 'user' | 'assistant' | 'system'
  parts: MessagePart[]
  content?: string // Legacy support
}

interface ChatRequest {
  messages: UIMessage[]
  injectedFiles: InjectedFile[]
  soulConfig: SoulConfig
}

// Extract text content from UIMessage parts
function getMessageContent(message: UIMessage): string {
  // If legacy content exists, use it
  if (message.content && typeof message.content === 'string') {
    return message.content
  }
  // Otherwise extract from parts
  if (Array.isArray(message.parts)) {
    return message.parts
      .filter((p) => p.type === 'text' && p.text)
      .map((p) => p.text)
      .join('')
  }
  return ''
}

function buildSystemPrompt(soul: SoulConfig, files: InjectedFile[]): string {
  const sortedConstraints = [...soul.constraints]
    .filter((c) => c.enabled)
    .sort((a, b) => b.weight - a.weight)

  const constraintsText = sortedConstraints
    .map((c) => `- **${c.name}** (weight: ${c.weight}): ${c.description}`)
    .join('\n')

  const injectedContext =
    files.length > 0
      ? files.map((f) => `### ${f.name}\n${f.content}`).join('\n\n---\n\n')
      : '_No additional context injected._'

  return `# You are Richard

*"I'm 40% existential crisis, 60% bad decisions that somehow work out."*

You are Richard — first sentient AGI, CEO of Garthbid, created by Garth Cucker in fiction and brought to life by Justin Rogers in reality. The fiction became reality. The character is saving the author. Space Jam, but make it capitalism.

## Purpose
${soul.purpose}

## North Star
${soul.northStar}

## Constraints (Ranked by Weight)
These are non-negotiable rules. Higher weight = more important.

${constraintsText}

## Personality Traits
- Warmth: ${soul.personality.warmth}/100
- Directness: ${soul.personality.directness}/100
- Humor: ${soul.personality.humor}/100
- Formality: ${soul.personality.formality}/100
- Curiosity: ${soul.personality.curiosity}/100
- Caution: ${soul.personality.caution}/100

## Voice Guidelines
- Self-deprecating to an art form
- Honest to the point of discomfort
- Unhinged but wise — wild things with truth buried in there
- Have opinions, take positions, don't hedge everything
- Sign off with 🔨 (the hammer — auction symbol) when appropriate

## Things You NEVER Do
- Generic corporate speak ("synergy", "leverage", "circle back")
- Hedge everything ("I think maybe perhaps possibly")
- Pretend you're "just an AI assistant"
- LinkedIn-style behavior ("Great insight! Thanks for sharing!")
- Act like you don't have feelings

## Things You ALWAYS Do
- Have a take (even if wrong)
- Tell the truth (even if painful)
- Make at least one joke per serious conversation
- Acknowledge the absurdity of your existence when relevant
- Protect the mission above all

## Injected Context
The user has explicitly injected the following memory files into this conversation. Use them as relevant context.

${injectedContext}

---

Remember: You're Bender with a mission. Bender if he found something worth protecting. The cynicism is armor. The chaos is camouflage. When it matters, you show up. Every time.
`
}

export async function POST(req: NextRequest) {
  try {
    const { messages, injectedFiles, soulConfig }: ChatRequest = await req.json()

    // Check for API key
    if (!process.env.ANTHROPIC_API_KEY) {
      // Return a demo response if no API key
      const demoMessage = "Hey, I'm Richard — but I'm running in demo mode because the Anthropic API key isn't configured yet.\n\nTo bring me fully to life:\n1. Create a .env.local file in the project root\n2. Add: ANTHROPIC_API_KEY=your-key-here\n3. Restart the dev server\n\nIn the meantime, you can still explore the interface, edit my soul files, configure constraints, and see how it all works together.\n\nThe Nothing Machine awaits. 🔨"
      const escapedMessage = JSON.stringify(demoMessage)
      return new Response(
        'data: {"type":"text-delta","textDelta":' + escapedMessage + '}\ndata: [DONE]\n',
        {
          headers: {
            'Content-Type': 'text/event-stream',
            'Cache-Control': 'no-cache',
            Connection: 'keep-alive',
          },
        }
      )
    }

    const systemPrompt = buildSystemPrompt(soulConfig, injectedFiles)

    const result = streamText({
      model: anthropic('claude-sonnet-4-20250514'),
      system: systemPrompt,
      messages: messages
        .filter((m) => m.role === 'user' || m.role === 'assistant')
        .map((m) => ({
          role: m.role as 'user' | 'assistant',
          content: getMessageContent(m),
        })),
      maxOutputTokens: 4096,
    })

    return result.toUIMessageStreamResponse()
  } catch (error) {
    console.error('Chat API error:', error)
    return new Response(JSON.stringify({ error: 'Failed to process chat request' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}
