import { NextRequest, NextResponse } from 'next/server'
import { DiscoveryBrief, GeneratedBrief } from '@/types'
import { buildSequence } from '@/lib/mapping-engine'
import { generateBriefContent } from '@/lib/claude'

export async function POST(request: NextRequest) {
  try {
    const brief: DiscoveryBrief = await request.json()

    if (!brief.industry || !brief.painSignal || !brief.prospectPhrase || !brief.personas?.length || !brief.urgency) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    if (!process.env.ANTHROPIC_API_KEY) {
      return NextResponse.json(
        { error: 'ANTHROPIC_API_KEY is not configured. Add it to .env.local.' },
        { status: 500 }
      )
    }

    const sequence = buildSequence(brief)
    const { aeCheatSheet, leaveBehind, followUpEmail } = await generateBriefContent(
      brief,
      sequence
    )

    const result: GeneratedBrief = {
      brief,
      sequence,
      aeCheatSheet,
      leaveBehind,
      followUpEmail,
      generatedAt: new Date().toISOString(),
    }

    return NextResponse.json(result)
  } catch (error) {
    console.error('Generate error:', error)
    const message = error instanceof Error ? error.message : 'Failed to generate brief'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
