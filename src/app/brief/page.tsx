'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import {
  GeneratedBrief,
  PAIN_LABELS,
  INDUSTRY_LABELS,
  PERSONA_LABELS,
} from '@/types'

type Tab = 'sequence' | 'cheatsheet' | 'leavebehind' | 'email'

function Badge({ children, color = 'slate' }: { children: React.ReactNode; color?: string }) {
  const colors: Record<string, string> = {
    slate: 'bg-slate-100 text-slate-600',
    indigo: 'bg-indigo-100 text-indigo-700',
    red: 'bg-red-100 text-red-700',
    amber: 'bg-amber-100 text-amber-700',
    green: 'bg-green-100 text-green-700',
  }
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${colors[color] || colors.slate}`}>
      {children}
    </span>
  )
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false)

  async function copy() {
    await navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <button
      onClick={copy}
      className="text-sm text-slate-500 hover:text-slate-900 transition-colors flex items-center gap-1"
    >
      {copied ? (
        <>
          <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          <span className="text-green-600">Copied</span>
        </>
      ) : (
        <>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
          Copy
        </>
      )}
    </button>
  )
}

function SequenceTab({ brief }: { brief: GeneratedBrief }) {
  const { sequence, brief: discovery } = brief
  const urgencyColor = discovery.urgency === 'high' ? 'red' : discovery.urgency === 'medium' ? 'amber' : 'green'

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">Demo Sequence</h2>
          <p className="text-sm text-slate-500 mt-1">
            {sequence.modules.length} modules &middot; {sequence.totalDuration} minutes total
          </p>
        </div>
        <Badge color={urgencyColor}>{discovery.urgency} urgency</Badge>
      </div>

      <div className="space-y-4">
        {sequence.modules.map((module, i) => (
          <div key={module.id} className="bg-white rounded-xl border border-slate-200 p-6">
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center text-sm font-bold flex-shrink-0">
                {i + 1}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-4 mb-2">
                  <h3 className="font-semibold text-slate-900">{module.title}</h3>
                  <span className="text-sm text-slate-400 whitespace-nowrap">{module.duration} min</span>
                </div>
                <p className="text-sm text-slate-600 mb-3">{module.description}</p>
                <div className="bg-amber-50 border border-amber-100 rounded-lg px-4 py-3">
                  <p className="text-xs font-semibold text-amber-700 mb-1">Positioning note</p>
                  <p className="text-sm text-amber-800">{module.positioning}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function CheatSheetTab({ brief }: { brief: GeneratedBrief }) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-slate-900">AE Cheat Sheet</h2>
        <p className="text-sm text-slate-500 mt-1">Talk tracks and landmines for each module, anchored to this prospect.</p>
      </div>

      {brief.aeCheatSheet.modules.map((item) => (
        <div key={item.moduleId} className="bg-white rounded-xl border border-slate-200 p-6 space-y-5">
          <h3 className="font-semibold text-slate-900 text-base">{item.module?.title ?? item.moduleId}</h3>

          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-3">Talk tracks</p>
            <ul className="space-y-3">
              {item.talkTracks.map((track, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                    {i + 1}
                  </span>
                  <p className="text-sm text-slate-700 leading-relaxed">{track}</p>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs font-semibold text-red-500 uppercase tracking-wide mb-3">Landmines — avoid these</p>
            <ul className="space-y-2">
              {item.landmines.map((mine, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="text-red-400 flex-shrink-0 mt-0.5">&#9888;</span>
                  <p className="text-sm text-slate-700 leading-relaxed">{mine}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  )
}

function LeaveBehindTab({ brief }: { brief: GeneratedBrief }) {
  const text = brief.leaveBehind

  const paragraphs = text.split('\n').filter((l) => l.trim())

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">Prospect Leave-Behind</h2>
          <p className="text-sm text-slate-500 mt-1">A personalized memo to send with your calendar invite or after the demo.</p>
        </div>
        <CopyButton text={text} />
      </div>

      <div className="bg-white rounded-xl border border-slate-200 p-8">
        <div className="prose prose-slate max-w-none text-sm leading-relaxed space-y-4">
          {paragraphs.map((p, i) => {
            if (p.startsWith('# ')) return <h1 key={i} className="text-xl font-bold text-slate-900">{p.slice(2)}</h1>
            if (p.startsWith('## ')) return <h2 key={i} className="text-base font-semibold text-slate-900 mt-4">{p.slice(3)}</h2>
            if (p.startsWith('**') && p.endsWith('**')) return <p key={i} className="font-semibold text-slate-800">{p.slice(2, -2)}</p>
            return <p key={i} className="text-slate-700">{p}</p>
          })}
        </div>
      </div>
    </div>
  )
}

function EmailTab({ brief }: { brief: GeneratedBrief }) {
  const { followUpEmail } = brief
  const fullEmail = `Subject: ${followUpEmail.subject}\n\n${followUpEmail.body}`

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">Follow-Up Email</h2>
          <p className="text-sm text-slate-500 mt-1">Opens with their exact words. Ready to send from your email client.</p>
        </div>
        <CopyButton text={fullEmail} />
      </div>

      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <div className="border-b border-slate-100 px-6 py-4 bg-slate-50">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">Subject</p>
          <p className="text-sm font-medium text-slate-900">{followUpEmail.subject}</p>
        </div>
        <div className="px-6 py-6">
          {followUpEmail.body.split('\n\n').map((para, i) => (
            <p key={i} className="text-sm text-slate-700 leading-relaxed mb-4 last:mb-0">
              {para}
            </p>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function BriefPage() {
  const router = useRouter()
  const [brief, setBrief] = useState<GeneratedBrief | null>(null)
  const [activeTab, setActiveTab] = useState<Tab>('sequence')

  useEffect(() => {
    const stored = sessionStorage.getItem('demoBrief')
    if (!stored) {
      router.replace('/')
      return
    }
    try {
      setBrief(JSON.parse(stored))
    } catch {
      router.replace('/')
    }
  }, [router])

  if (!brief) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full" />
      </div>
    )
  }

  const { brief: discovery } = brief
  const urgencyColor = discovery.urgency === 'high' ? 'red' : discovery.urgency === 'medium' ? 'amber' : 'green'

  const tabs: { id: Tab; label: string }[] = [
    { id: 'sequence', label: 'Sequence' },
    { id: 'cheatsheet', label: 'Cheat Sheet' },
    { id: 'leavebehind', label: 'Leave-Behind' },
    { id: 'email', label: 'Email' },
  ]

  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b border-slate-200 bg-white px-6 py-4">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
              <span className="text-white text-sm font-bold">DB</span>
            </div>
            <span className="font-semibold text-slate-900">DemoBrief</span>
          </div>
          <Link
            href="/"
            className="text-sm text-slate-500 hover:text-slate-900 font-medium transition-colors"
          >
            New brief
          </Link>
        </div>
      </header>

      <div className="bg-white border-b border-slate-200">
        <div className="max-w-3xl mx-auto px-6 py-5">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <Badge color="indigo">{INDUSTRY_LABELS[discovery.industry]}</Badge>
            <Badge color={urgencyColor}>{discovery.urgency} urgency</Badge>
            {discovery.personas.map((p) => (
              <Badge key={p}>{PERSONA_LABELS[p]}</Badge>
            ))}
          </div>
          <p className="text-sm text-slate-500 mb-1 font-medium">Pain signal</p>
          <p className="text-slate-700 font-medium">{PAIN_LABELS[discovery.painSignal]}</p>
          <div className="mt-3 bg-indigo-50 border border-indigo-100 rounded-lg px-4 py-3">
            <p className="text-xs font-semibold text-indigo-500 mb-1">Their words</p>
            <p className="text-slate-800 italic text-sm">&ldquo;{discovery.prospectPhrase}&rdquo;</p>
          </div>
        </div>
      </div>

      <div className="bg-white border-b border-slate-200">
        <div className="max-w-3xl mx-auto px-6">
          <nav className="flex gap-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? 'border-indigo-600 text-indigo-600'
                    : 'border-transparent text-slate-500 hover:text-slate-900'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </div>

      <main className="flex-1 max-w-3xl mx-auto w-full px-6 py-8">
        {activeTab === 'sequence' && <SequenceTab brief={brief} />}
        {activeTab === 'cheatsheet' && <CheatSheetTab brief={brief} />}
        {activeTab === 'leavebehind' && <LeaveBehindTab brief={brief} />}
        {activeTab === 'email' && <EmailTab brief={brief} />}
      </main>
    </div>
  )
}
