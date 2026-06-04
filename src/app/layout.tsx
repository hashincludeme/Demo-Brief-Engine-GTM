import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'DemoBrief — Turn discovery into a winning demo sequence',
  description:
    'Fill out five fields from your discovery call. Get a curated demo sequence, AE cheat sheet, leave-behind, and personalized follow-up email.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-slate-50 text-slate-900 antialiased">{children}</body>
    </html>
  )
}
