import type { NextApiRequest, NextApiResponse } from 'next'
import { Resend } from 'resend'

const resendKey = process.env.RESEND_API_KEY
const toEmail = process.env.CONTACT_TO_EMAIL

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).end('Method Not Allowed')
  }

  const { name, email, message } = req.body || {}
  if (!name || !email || !message) {
    return res.status(400).json({ ok: false, error: 'Missing fields' })
  }

  // If Resend not configured yet, don't fail—log it and succeed
  if (!resendKey || !toEmail) {
    console.log('Contact message (no email provider configured):', { name, email, message })
    return res.status(200).json({ ok: true, note: 'Email provider not configured yet; logged to server.' })
  }

  try {
    const resend = new Resend(resendKey)
    await resend.emails.send({
      from: 'TideClean AI <noreply@tideclean.ai>',
      to: toEmail,
      reply_to: String(email),
      subject: `New contact from ${name}`,
      text: `From: ${name} <${email}>\n\n${message}`,
    })
    return res.status(200).json({ ok: true })
  } catch (err) {
    console.error('Resend error', err)
    return res.status(500).json({ ok: false, error: 'Email failed to send' })
  }
}
