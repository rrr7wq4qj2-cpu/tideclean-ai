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
      <main className="min-h-screen p-8 flex items-center justify-center
