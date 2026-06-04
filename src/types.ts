export type Industry =
  | 'saas'
  | 'fintech'
  | 'healthcare'
  | 'manufacturing'
  | 'retail'
  | 'professional_services'
  | 'other'

export const INDUSTRY_LABELS: Record<Industry, string> = {
  saas: 'SaaS / Tech',
  fintech: 'FinTech / Financial Services',
  healthcare: 'Healthcare / Life Sciences',
  manufacturing: 'Manufacturing / Industrial',
  retail: 'Retail / E-commerce',
  professional_services: 'Professional Services',
  other: 'Other',
}

export type PainSignal =
  | 'broken_workflow'
  | 'missing_visibility'
  | 'compliance_gap'
  | 'coordination_overhead'
  | 'cost_reduction'
  | 'growth_blocked'

export const PAIN_LABELS: Record<PainSignal, string> = {
  broken_workflow: 'Broken Workflow / Manual Processes',
  missing_visibility: 'Missing Visibility / Blind Spots',
  compliance_gap: 'Compliance Gap / Audit Risk',
  coordination_overhead: 'Coordination Overhead / Silos',
  cost_reduction: 'Cost Reduction / Budget Pressure',
  growth_blocked: 'Growth Blocked / Scaling Friction',
}

export type Persona =
  | 'individual_contributor'
  | 'manager'
  | 'director'
  | 'vp'
  | 'c_suite'
  | 'it'
  | 'finance'
  | 'ops'

export const PERSONA_LABELS: Record<Persona, string> = {
  individual_contributor: 'Individual Contributor',
  manager: 'Manager',
  director: 'Director',
  vp: 'VP',
  c_suite: 'C-Suite',
  it: 'IT / Engineering',
  finance: 'Finance',
  ops: 'Operations',
}

export type Urgency = 'low' | 'medium' | 'high'

export interface DiscoveryBrief {
  industry: Industry
  painSignal: PainSignal
  prospectPhrase: string
  personas: Persona[]
  urgency: Urgency
}

export interface DemoModule {
  id: string
  title: string
  description: string
  positioning: string
  painTags: PainSignal[]
  personaTags: Persona[]
  duration: number
}

export interface DemoSequence {
  modules: DemoModule[]
  totalDuration: number
}

export interface ModuleCheatSheet {
  moduleId: string
  module: DemoModule
  talkTracks: string[]
  landmines: string[]
}

export interface AECheatSheet {
  modules: ModuleCheatSheet[]
}

export interface FollowUpEmail {
  subject: string
  body: string
}

export interface GeneratedBrief {
  brief: DiscoveryBrief
  sequence: DemoSequence
  aeCheatSheet: AECheatSheet
  leaveBehind: string
  followUpEmail: FollowUpEmail
  generatedAt: string
}
