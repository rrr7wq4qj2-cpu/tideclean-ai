export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-3 p-8 text-center">
      <h1 className="text-5xl font-bold">404</h1>
      <p className="text-gray-600">Page not found.</p>
      <a href="/" className="underline">Go home</a>
    </main>
  )
}
