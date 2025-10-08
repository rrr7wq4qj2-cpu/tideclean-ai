import Head from 'next/head'

export default function Contact() {
  return (
    <>
      <Head><title>Contact • TideClean AI</title></Head>
      <main className="min-h-screen flex items-center justify-center p-8">
        <form
          method="POST"
          action="https://formspree.io/f/your-id"  // replace with your Formspree/Resend endpoint
          className="w-full max-w-md space-y-4 border p-6 rounded-xl"
        >
          <h1 className="text-2xl font-semibold">Contact us</h1>
          <input name="name" placeholder="Your name" className="w-full border p-3 rounded" required />
          <input name="email" type="email" placeholder="Email" className="w-full border p-3 rounded" required />
          <textarea name="message" placeholder="How can we help?" className="w-full border p-3 rounded h-32" />
          <button className="w-full rounded bg-black text-white py-3">Send</button>
        </form>
      </main>
    </>
  )
}
