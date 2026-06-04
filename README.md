# DemoBrief

**Turn discovery into a winning demo sequence.** Five fields from your post-discovery call. Returns a curated demo sequence, AE cheat sheet, prospect leave-behind, and personalized follow-up email.

---

## The problem it solves

Sales teams lose deals in the post-demo silence. Not because of bad follow-up — because the demo itself was generic. The prospect described their specific pain in discovery. That signal was captured. But there was no system to translate it into a demo that reflected it back.

DemoBrief is the missing layer between discovery and delivery.

## How it works

**Intake (5 fields):**
- Industry
- Primary pain signal (broken workflow, missing visibility, compliance gap, etc.)
- The prospect's exact phrase from discovery
- Who's in the demo room
- Deal urgency

**Mapping engine:** Scores all 10 core demo modules against the inputs — pain match (primary weight) + persona fit (secondary weight). Returns a curated 3–4 module sequence ordered for narrative arc: primary pain module first, analytics/visibility close last.

**Generated outputs (via Claude):**
1. **Demo sequence** — Ordered modules with duration and positioning notes
2. **AE cheat sheet** — Per-module talk tracks anchored to the prospect's exact words, plus landmines to avoid
3. **Prospect leave-behind** — A personalized memo written to the prospect, not about them
4. **Follow-up email** — Subject line specific to their situation; body opens with their exact phrase in quotes

## Getting started

```bash
# 1. Install dependencies
npm install

# 2. Set up your API key
cp .env.example .env.local
# Edit .env.local and add your Anthropic API key

# 3. Run the dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Configuration

| Variable | Required | Description |
|---|---|---|
| `ANTHROPIC_API_KEY` | Yes | Your Anthropic API key from [console.anthropic.com](https://console.anthropic.com) |

## Architecture

```
src/
├── app/
│   ├── page.tsx              # Intake form
│   ├── brief/page.tsx        # Results with 4 tabs
│   └── api/generate/route.ts # API: mapping engine + Claude generation
├── lib/
│   ├── modules.ts            # 10 demo module definitions with tags
│   ├── mapping-engine.ts     # Scoring and sequence selection logic
│   └── claude.ts             # Claude API integration
└── types.ts                  # Shared types and label maps
```

## The 10 demo modules

| Module | Primary pain | Best for |
|---|---|---|
| Automated Workflow Builder | Broken workflow | Ops, Manager, IC |
| Real-Time Visibility Dashboard | Missing visibility | Director, VP, C-Suite |
| Compliance & Audit Trail | Compliance gap | Finance, C-Suite, IT |
| Cross-Team Collaboration Hub | Coordination overhead | Manager, Director, IC |
| Integration Marketplace | Broken workflow, Coordination | IT, Ops, IC |
| Advanced Analytics & Forecasting | Missing visibility, Growth | VP, C-Suite, Director |
| Cost & Budget Controls | Cost reduction | Finance, VP, C-Suite |
| Mobile & Remote Access | Broken workflow, Coordination | IC, Manager |
| Role-Based Permissions & Security | Compliance, Coordination | C-Suite, IT, Finance |
| Onboarding & Adoption Engine | Growth blocked, Coordination | Manager, C-Suite, Ops |

## What this does not solve

- Bad discovery — the system assumes the AE captured something meaningful
- Demo environment tooling (Reprise, Navattic) — this is the brief, not the environment
- Automated demo execution — this is the connective tissue between the conversation and the room
