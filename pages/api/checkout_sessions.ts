import type { NextApiRequest, NextApiResponse } from 'next'
import Stripe from 'stripe'

const stripeSecret = process.env.STRIPE_SECRET_KEY

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).end('Method Not Allowed')
  }

  if (!stripeSecret) {
    return res.status(500).json({ error: 'Missing STRIPE_SECRET_KEY env var' })
  }

  const { priceId } = req.body as { priceId?: string }
  if (!priceId) return res.status(400).json({ error: 'Missing priceId' })

  const stripe = new Stripe(stripeSecret, { apiVersion: '2024-06-20' })

  const origin = req.headers.origin || `https://${req.headers.host}`
  try {
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/cancel`,
    })
    return res.status(200).json({ url: session.url })
  } catch (err) {
    console.error('Stripe error', err)
    return res.status(500).json({ error: 'Unable to create checkout session' })
  }
}
