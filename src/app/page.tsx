'use client'

import { useState, FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import {
  Industry,
  PainSignal,
  Persona,
  Urgency,
  INDUSTRY_LABELS,
  PAIN_LABELS,
  PERSONA_LABELS,
  DiscoveryBrief,
} from '@/types'

const INDUSTRIES = Object.entries(INDUSTRY_LABELS) as [Industry, string][]
const PAIN_SIGNALS = Object.entries(PAIN_LABELS) as [PainSignal, string][]
const PERSONAS = Object.entries(PERSONA_LABELS) as [Persona, string][]

export default function IntakePage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [industry, setIndustry] = useState<Industry | ''>('')
  const [painSignal, setPainSignal] = useState<PainSignal | ''>('')
  const [prospectPhrase, setProspectPhrase] = useState('')
  const [personas, setPersonas] = useState<Persona[]>([])
  const [urgency, setUrgency] = useState<Urgency | ''>('')

  function togglePersona(p: Persona) {
    setPersonas((prev) =>
      prev.includes(p) ? prev.filter((x) => x !== p) : [...prev, p]
    )
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!industry || !painSignal || !prospectPhrase.trim() || personas.length === 0 || !urgency) {
      setError('All fields are required.')
      return
    }

    setError(null)
    setLoading(true)

    try {
      const brief: DiscoveryBrief = {
        industry,
        painSignal,
        prospectPhrase: prospectPhrase.trim(),
        personas,
        urgency,
      }

      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(brief),
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || 'Generation failed')
      }

      const generatedBrief = await res.json()
      sessionStorage.setItem('demoBrief', JSON.stringify(generatedBrief))
      router.push('/brief')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b border-slate-200 bg-white px-6 py-4">
        <div className="max-w-2xl mx-auto flex items-center gap-3">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
            <span className="text-white text-sm font-bold">DB</span>
          </div>
          <span className="font-semibold text-slate-900">DemoBrief</span>
        </div>
      </header>

      <main className="flex-1 max-w-2xl mx-auto w-full px-6 py-12">
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-slate-900 mb-3">
            Turn discovery into a winning demo
          </h1>
          <p className="text-slate-500 text-lg leading-relaxed">
            Five fields from your discovery call. Returns a curated demo sequence, AE cheat
            sheet, prospect leave-behind, and personalized follow-up email.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Industry */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Industry
            </label>
            <select
              value={industry}
              onChange={(e) => setIndustry(e.target.value as Industry)}
              className="w-full border border-slate-300 rounded-lg px-4 py-3 text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            >
              <option value="" disabled>
                Select the prospect&apos;s industry
              </option>
              {INDUSTRIES.map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </div>

          {/* Pain Signal */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Primary Pain Signal
            </label>
            <p className="text-sm text-slate-500 mb-3">
              The core problem that surfaced most clearly in discovery.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {PAIN_SIGNALS.map(([value, label]) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setPainSignal(value)}
                  className={`text-left px-4 py-3 rounded-lg border text-sm font-medium transition-all ${
                    painSignal === value
                      ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                      : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Prospect Phrase */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              The Prospect&apos;s Exact Words
            </label>
            <p className="text-sm text-slate-500 mb-3">
              The phrase or sentence they used to describe their problem. This becomes the
              opening of the follow-up email and the anchor for all talk tracks.
            </p>
            <textarea
              value={prospectPhrase}
              onChange={(e) => setProspectPhrase(e.target.value)}
              rows={3}
              placeholder="e.g. &quot;We don't have any visibility into what's happening after the handoff&quot;"
              className="w-full border border-slate-300 rounded-lg px-4 py-3 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
            />
          </div>

          {/* Personas */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Who&apos;s in the Room?
            </label>
            <p className="text-sm text-slate-500 mb-3">
              Select every role attending the demo. The sequence is weighted by persona fit.
            </p>
            <div className="flex flex-wrap gap-2">
              {PERSONAS.map(([value, label]) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => togglePersona(value)}
                  className={`px-4 py-2 rounded-full border text-sm font-medium transition-all ${
                    personas.includes(value)
                      ? 'border-indigo-500 bg-indigo-600 text-white'
                      : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Urgency */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Deal Urgency
            </label>
            <p className="text-sm text-slate-500 mb-3">
              High urgency trims the sequence to 3 modules — keep it tight when time matters.
            </p>
            <div className="flex gap-3">
              {(['low', 'medium', 'high'] as Urgency[]).map((u) => (
                <button
                  key={u}
                  type="button"
                  onClick={() => setUrgency(u)}
                  className={`flex-1 py-3 rounded-lg border text-sm font-semibold capitalize transition-all ${
                    urgency === u
                      ? u === 'high'
                        ? 'border-red-500 bg-red-50 text-red-700'
                        : u === 'medium'
                        ? 'border-amber-500 bg-amber-50 text-amber-700'
                        : 'border-green-500 bg-green-50 text-green-700'
                      : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                  }`}
                >
                  {u}
                </button>
              ))}
            </div>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-semibold py-4 px-6 rounded-lg transition-colors text-base"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Generating brief...
              </span>
            ) : (
              'Generate Demo Brief'
            )}
          </button>
        </form>
      </main>
    </div>
  )
}
