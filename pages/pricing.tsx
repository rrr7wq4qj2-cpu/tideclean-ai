import Head from 'next/head'
import { useState } from 'react'

const STARTER = process.env.NEXT_PUBLIC_STARTER_PRICE_ID || ''
const PRO = process.env.NEXT_PUBLIC_PRO_PRICE_ID || ''

export default function Pricing() {
  const [loading, setLoading] = useState<string | null>(null)

  async function go(priceId: string) {
    if (!priceId) { alert('Price ID not configured.'); return }
    setLoading(priceId)
    try {
      const res = await fetch('/api/checkout_sessions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ priceId }),
      })
      const data = await res.json()
      if (!res.ok || !data?.url) throw new Error('Failed to create session')
      window.location.href = data.url
    } catch {
      alert('Checkout failed. Double-check your Stripe keys & Price IDs in Vercel.')
      setLoading(null)
    }
  }

  return (
    <>
      <Head><title>Pricing • TideClean AI</title></Head>
      <main className="min-h-screen p-8 flex items-center justify-center">
        <div className="grid gap-6 md:grid-cols-2 max-w-4xl w-full">
          <div className="border rounded-2xl p-6">
            <h2 className="text-2xl font-semibold">Starter</h2>
            <p className="text-gray-600 mt-2">One-time data cleanup (up to 2 files)</p>
            <p className="text-3xl font-bold mt-4">$49</p>
            <button
              onClick={() => go(STARTER)}
              disabled={!STARTER || loading===STARTER}
              className="mt-6 w-full rounded-lg bg-black text-white py-3 disabled:opacity-60"
            >
              {loading===STARTER ? 'Redirecting…' : 'Buy Starter'}
            </button>
          </div>

          <div className="border rounded-2xl p-6">
            <h2 className="text-2xl font-semibold">Pro</h2>
            <p className="text-gray-600 mt-2">Up to 10 files + priority support</p>
            <p className="text-3xl font-bold mt-4">$149</p>
            <button
              onClick={() => go(PRO)}
              disabled={!PRO || loading===PRO}
              className="mt-6 w-full rounded-lg bg-black text-white py-3 disabled:opacity-60"
            >
              {loading===PRO ? 'Redirecting…' : 'Buy Pro'}
            </button>
          </div>
        </div>
      </main>
    </>
  )
}
 justify-center
