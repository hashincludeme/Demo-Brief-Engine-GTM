import Anthropic from '@anthropic-ai/sdk'
import {
  DiscoveryBrief,
  DemoSequence,
  AECheatSheet,
  FollowUpEmail,
  PAIN_LABELS,
  PERSONA_LABELS,
  INDUSTRY_LABELS,
} from '../types'

const client = new Anthropic()

interface GeneratedOutputs {
  aeCheatSheet: AECheatSheet
  leaveBehind: string
  followUpEmail: FollowUpEmail
}

export async function generateBriefContent(
  brief: DiscoveryBrief,
  sequence: DemoSequence
): Promise<GeneratedOutputs> {
  const moduleList = sequence.modules
    .map(
      (m, i) =>
        `${i + 1}. ${m.title} (${m.duration} min) [id: ${m.id}]\n   ${m.description}\n   Positioning note: ${m.positioning}`
    )
    .join('\n\n')

  const personaList = brief.personas.map((p) => PERSONA_LABELS[p]).join(', ')

  const prompt = `You are a B2B sales enablement expert. Generate three demo preparation deliverables for an account executive.

DISCOVERY BRIEF:
- Industry: ${INDUSTRY_LABELS[brief.industry]}
- Primary pain: ${PAIN_LABELS[brief.painSignal]}
- Prospect's exact words: "${brief.prospectPhrase}"
- Stakeholders in room: ${personaList}
- Deal urgency: ${brief.urgency}

SELECTED DEMO SEQUENCE:
${moduleList}

Generate the following as a JSON object with this exact structure:
{
  "aeCheatSheet": {
    "modules": [
      {
        "moduleId": "<must match the module id listed above>",
        "talkTracks": ["<track 1>", "<track 2>", "<track 3>"],
        "landmines": ["<landmine 1>", "<landmine 2>"]
      }
    ]
  },
  "leaveBehind": "<markdown formatted, 350-400 words, written TO the prospect as a memo from the vendor>",
  "followUpEmail": {
    "subject": "<specific to their situation — never use generic phrases like 'following up on our demo'>",
    "body": "<250 words — MUST open with their exact phrase in quotation marks>"
  }
}

Requirements:
- Each module's FIRST talk track must reference the prospect's specific situation and echo "${brief.prospectPhrase}" naturally
- Landmines are specific objections or conversational traps relevant to this prospect's industry (${INDUSTRY_LABELS[brief.industry]}) and stakeholder mix (${personaList})
- The leave-behind opens with their pain context, then proposes a solution narrative — write it as if the vendor is making a case directly to the prospect, not describing a product
- The email subject line must be specific (reference their pain or industry context) — never "Following up on our call" or similar
- The email body must open with their exact phrase in quotation marks, then bridge it to what the demo showed and what a next step looks like
- Use ${INDUSTRY_LABELS[brief.industry]} terminology throughout all three deliverables

Return ONLY valid JSON, no markdown fences, no explanation text.`

  const response = await client.messages.create({
    model: 'claude-sonnet-4-6',
    max_tokens: 3500,
    messages: [{ role: 'user', content: prompt }],
  })

  const content = response.content[0]
  if (content.type !== 'text') throw new Error('Unexpected response type from Claude')

  const parsed = JSON.parse(content.text)

  const enrichedCheatSheet: AECheatSheet = {
    modules: parsed.aeCheatSheet.modules.map(
      (item: { moduleId: string; talkTracks: string[]; landmines: string[] }) => ({
        ...item,
        module: sequence.modules.find((m) => m.id === item.moduleId)!,
      })
    ),
  }

  return {
    aeCheatSheet: enrichedCheatSheet,
    leaveBehind: parsed.leaveBehind,
    followUpEmail: parsed.followUpEmail,
  }
}
