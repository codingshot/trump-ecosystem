'use client'

import { Header } from './components/Header'
import { Footer } from './components/Footer'
import { useRouter } from 'next/navigation'

export default function NotFound() {
  const router = useRouter()
  
  return (
    <div className="min-h-screen bg-primary text-white">
      <Header onSearchClick={() => {}} />
      <main className="container mx-auto px-4 py-16">
        <div className="text-center max-w-2xl mx-auto">
          <h1 className="text-6xl font-bold mb-4">404</h1>
          <h2 className="text-2xl mb-8">Page Not Found</h2>
          <p className="text-[#9DA3AE] mb-8">
            The page you're looking for doesn't exist or has been moved.
            Explore our directory of pump.fun ecosystem projects instead.
          </p>
          <div className="flex justify-center gap-4">
            <button
              onClick={() => router.push('/')}
              className="bg-[#1FD978] text-primary px-6 py-2 rounded hover:bg-green-400"
            >
              Go Home
            </button>
            <button
              onClick={() => router.push('/#projects')}
              className="bg-[#2A2D3A] text-white px-6 py-2 rounded hover:bg-[#3A3D4A]"
            >
              Browse Projects
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
