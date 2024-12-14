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
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [isOrFilter, setIsOrFilter] = useState(false)
  const searchParams = useSearchParams()
  const router = useRouter()
  
  useEffect(() => {
    const queryParam = searchParams.get('q')
    if (queryParam) {
      setGlobalSearchQuery(queryParam)
    }
  }, [searchParams])

  useEffect(() => {
    const tagParam = searchParams.get('tags')
    const orParam = searchParams.get('filter') === 'or'
    
    if (tagParam) {
      setSelectedTags(tagParam.split(','))
      setGlobalSearchQuery('')  // Clear the search query when filtering by tag
    } else {
      setSelectedTags([])
    }
    
    setIsOrFilter(orParam)
  }, [searchParams])

  const handleSearch = (query: string) => {
    setGlobalSearchQuery(query)
    setIsSearchOpen(false)
    setSelectedTags([])  // Clear tag filter when searching
    const newUrl = query ? `?q=${encodeURIComponent(query)}` : '/'
    router.push(newUrl)
  }

  const handleTagToggle = (tag: string) => {
    const newTags = selectedTags.includes(tag)
      ? selectedTags.filter(t => t !== tag)
      : [...selectedTags, tag]
    
    updateUrlWithTags(newTags)
  }

  const handleFilterToggle = () => {
    const newIsOrFilter = !isOrFilter
    setIsOrFilter(newIsOrFilter)
    updateUrlWithTags(selectedTags, newIsOrFilter)
  }

  const updateUrlWithTags = (tags: string[], orFilter: boolean = isOrFilter) => {
    const params = new URLSearchParams()
    if (tags.length > 0) {
      params.set('tags', tags.join(','))
    }
    if (orFilter) {
      params.set('filter', 'or')
    }
    const newUrl = tags.length > 0 ? `?${params.toString()}` : '/'
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
          selectedTags={selectedTags}
          isOrFilter={isOrFilter}
        />
        <ToolsSection 
          globalSearchQuery={globalSearchQuery} 
          setGlobalSearchQuery={handleSearch}
          selectedTags={selectedTags}
          isOrFilter={isOrFilter}
        />
      </main>
      <Footer />
    </div>
  )
}

