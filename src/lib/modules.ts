import { DemoModule } from '../types'

export const DEMO_MODULES: DemoModule[] = [
  {
    id: 'workflow_automation',
    title: 'Automated Workflow Builder',
    description:
      'Show how manual handoffs and repetitive triggers get replaced with rule-based automation. Walk through the specific process they described in discovery — the before version, then the automated version.',
    positioning:
      'Open with their broken process. Name the exact steps they described. Then show the automated version running. The contrast is the close.',
    painTags: ['broken_workflow'],
    personaTags: ['ops', 'manager', 'individual_contributor'],
    duration: 8,
  },
  {
    id: 'realtime_dashboard',
    title: 'Real-Time Visibility Dashboard',
    description:
      'Live view of operations without chasing updates or pulling reports. Eliminates the status meeting.',
    positioning:
      'Best used as the closing module — they leave the room imagining Monday morning with this view instead of the one they have now.',
    painTags: ['missing_visibility'],
    personaTags: ['director', 'vp', 'c_suite', 'manager'],
    duration: 7,
  },
  {
    id: 'compliance_audit',
    title: 'Compliance & Audit Trail',
    description:
      'Every action logged, attributable, and exportable. Policy enforcement with zero manual overhead. Show the audit export and the enforcement layer side by side.',
    positioning:
      'Lead with the audit export — it is the most visceral proof that the compliance gap is closed. Let the finance or legal stakeholder drive the demo here.',
    painTags: ['compliance_gap'],
    personaTags: ['finance', 'c_suite', 'it'],
    duration: 6,
  },
  {
    id: 'collaboration_hub',
    title: 'Cross-Team Collaboration Hub',
    description:
      'Unify work that currently lives across Slack threads, emails, and spreadsheets. Make handoffs explicit — who passed what, to whom, and when.',
    positioning:
      'Walk through the handoff moment specifically. Show the before: an email chain, a Slack message, a spreadsheet row. Then show the unified thread.',
    painTags: ['coordination_overhead'],
    personaTags: ['manager', 'director', 'individual_contributor'],
    duration: 7,
  },
  {
    id: 'integrations',
    title: 'Integration Marketplace',
    description:
      'Native connectors for their existing stack. Bidirectional sync that eliminates manual data entry and the lag between systems.',
    positioning:
      'Ask about their stack before entering this module. Name their tools explicitly. "You mentioned you use Salesforce — here is the native connector, here is the sync."',
    painTags: ['broken_workflow', 'coordination_overhead'],
    personaTags: ['it', 'ops', 'individual_contributor'],
    duration: 6,
  },
  {
    id: 'analytics_forecasting',
    title: 'Advanced Analytics & Forecasting',
    description:
      'Historical data becomes forward-looking signals. Trend views and forecast models calibrated to their business context and industry.',
    positioning:
      'Use their industry to frame the model — healthcare uses capacity projections, SaaS uses expansion curves, manufacturing uses throughput forecasts.',
    painTags: ['missing_visibility', 'growth_blocked'],
    personaTags: ['vp', 'c_suite', 'director'],
    duration: 8,
  },
  {
    id: 'cost_controls',
    title: 'Cost & Budget Controls',
    description:
      'Approval workflows, real-time spend visibility, and budget tracking. Catch overruns before they become problems, not after.',
    positioning:
      'Show the approval chain first, then the variance alert. Finance leads will ask about GL codes and cost center mapping — have the answer ready before entering this module.',
    painTags: ['cost_reduction'],
    personaTags: ['finance', 'vp', 'c_suite'],
    duration: 6,
  },
  {
    id: 'mobile_access',
    title: 'Mobile & Remote Access',
    description:
      'Field teams and remote workers stay connected to the same data and workflows. Offline capability and push notification support.',
    positioning:
      'Show the phone first. Most executives forget that the majority of their users are not at a desk. The phone demo is proof of reach.',
    painTags: ['broken_workflow', 'coordination_overhead'],
    personaTags: ['individual_contributor', 'manager'],
    duration: 5,
  },
  {
    id: 'rbac_security',
    title: 'Role-Based Permissions & Security',
    description:
      'Permission model with SSO, MFA, and automated provisioning. Who sees what, who can do what, how access gets granted and revoked.',
    positioning:
      'IT will grill you here. Do not rush through it. This module is often where deals stall — losing the IT lead here can veto a won deal.',
    painTags: ['compliance_gap', 'coordination_overhead'],
    personaTags: ['c_suite', 'it', 'finance'],
    duration: 5,
  },
  {
    id: 'onboarding_adoption',
    title: 'Onboarding & Adoption Engine',
    description:
      'New users get up to speed without IT tickets. Guided setup, in-app help, and an admin adoption dashboard.',
    positioning:
      'Use this when change management is the hidden concern. Often surfaces in mid-market where IT is thin and the buyer is also the admin.',
    painTags: ['growth_blocked', 'coordination_overhead'],
    personaTags: ['manager', 'c_suite', 'ops'],
    duration: 6,
  },
]
