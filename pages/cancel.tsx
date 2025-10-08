import Head from 'next/head'

export default function Cancel() {
  return (
    <>
      <Head><title>Canceled • TideClean AI</title></Head>
      <main className="min-h-screen flex flex-col items-center justify-center gap-4 p-8 text-center">
        <h1 className="text-4xl font-bold">Payment canceled</h1>
        <p className="text-gray-600">No worries—come back anytime.</p>
        <a href="/pricing" className="underline">Back to pricing</a>
      </main>
    </>
  )
}
