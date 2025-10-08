import Head from 'next/head'

export default function Home() {
  return (
    <>
      <Head>
        <title>TideClean AI</title>
        <meta name="description" content="Smart data cleanup made easy." />
      </Head>

      <main className="min-h-screen flex flex-col items-center justify-center gap-6 p-8 text-center">
        <h1 className="text-5xl md:text-6xl font-bold text-blue-600">TideClean AI</h1>
        <p className="text-lg text-gray-600 max-w-xl">
          Upload messy spreadsheets or exports. Get clean, structured data back—fast.
        </p>
        <div className="flex gap-3">
          <a href="/contact" className="rounded-lg px-5 py-3 border bg-black text-white hover:opacity-90">
            Get a demo
          </a>
          <a href="/pricing" className="rounded-lg px-5 py-3 border border-gray-300 hover:bg-gray-50">
            See pricing
          </a>
        </div>
      </main>
    </>
  )
}
