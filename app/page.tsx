'use client'

import { useState, useEffect } from 'react';
import { Header } from './components/Header'
import { ProjectGrid } from './components/ProjectGrid'
import { Footer } from './components/Footer'
import { SearchOverlay } from './components/SearchOverlay'
import { ToolsSection } from './components/ToolsSection'
import { useSearchParams, useRouter } from 'next/navigation'

export default function Home() {
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [globalSearchQuery, setGlobalSearchQuery] = useState('')
  const searchParams = useSearchParams()
  const router = useRouter()
  
  useEffect(() => {
    const queryParam = searchParams.get('q')
    if (queryParam) {
      setGlobalSearchQuery(queryParam)
    }
  }, [searchParams])

  const handleSearch = (query: string) => {
    setGlobalSearchQuery(query)
    setIsSearchOpen(false)
    // Update URL when search changes
    const newUrl = query ? `?q=${encodeURIComponent(query)}` : '/'
    router.push(newUrl)
  }

  return (
    <div className="min-h-screen bg-primary text-white">
      <Header onSearchClick={() => setIsSearchOpen(true)} />
      <SearchOverlay
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSearch={handleSearch}
      />
      <main className="container mx-auto px-4 py-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h1 className="text-4xl font-medium mb-4">[pump.fun ecosystem]</h1>
          <p className="text-lg text-[#9DA3AE]">
            Your intro to the [trenches] tooling, copy cats, forks, and innovations in the pump.fun ecosystem
          </p>
        </div>
        {globalSearchQuery && (
          <div className="mb-8 text-center">
            <h2 className="text-2xl font-medium">Search Results for: {globalSearchQuery}</h2>
          </div>
        )}
        <ProjectGrid 
          globalSearchQuery={globalSearchQuery} 
          setGlobalSearchQuery={handleSearch}
        />
        <ToolsSection 
          globalSearchQuery={globalSearchQuery} 
          setGlobalSearchQuery={handleSearch}
        />
      </main>
      <Footer />
    </div>
  )
}

