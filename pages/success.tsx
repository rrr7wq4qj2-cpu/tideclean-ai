import Head from 'next/head'

export default function Success() {
  return (
    <>
      <Head><title>Success • TideClean AI</title></Head>
      <main className="min-h-screen flex flex-col items-center justify-center gap-4 p-8 text-center">
        <h1 className="text-4xl font-bold">Payment successful 🎉</h1>
        <p className="text-gray-600">We’ll email you shortly to get started on your data cleanup.</p>
        <a href="/" className="underline">Return home</a>
      </main>
    </>
  )
}
