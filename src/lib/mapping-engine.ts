import { DiscoveryBrief, DemoModule, DemoSequence } from '../types'
import { DEMO_MODULES } from './modules'

function scoreModule(module: DemoModule, brief: DiscoveryBrief): number {
  let score = 0

  if (module.painTags.includes(brief.painSignal)) {
    score += 3
  }

  const personaOverlap = brief.personas.filter((p) =>
    module.personaTags.includes(p)
  ).length
  score += Math.min(personaOverlap * 1.5, 3)

  return score
}

export function buildSequence(brief: DiscoveryBrief): DemoSequence {
  const maxModules = brief.urgency === 'high' ? 3 : 4

  const scored = DEMO_MODULES.map((module) => ({
    module,
    score: scoreModule(module, brief),
  })).sort((a, b) => b.score - a.score)

  let selected = scored.slice(0, maxModules).map((s) => s.module)

  // Lead with the primary pain-match module
  const primary = selected.find((m) => m.painTags.includes(brief.painSignal))
  if (primary && selected[0] !== primary) {
    selected = [primary, ...selected.filter((m) => m !== primary)]
  }

  // Close with a visibility/analytics module when one is in the set — it frames ROI
  const closerIds = ['realtime_dashboard', 'analytics_forecasting']
  const closer = selected.find(
    (m) => closerIds.includes(m.id) && m !== primary
  )
  if (closer && selected[selected.length - 1] !== closer) {
    selected = [...selected.filter((m) => m !== closer), closer]
  }

  return {
    modules: selected,
    totalDuration: selected.reduce((sum, m) => sum + m.duration, 0),
  }
}
