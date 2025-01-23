'use client'

import { useState, useEffect } from 'react';
import { Header } from './components/Header'
import { ResourcesSection } from './components/ResourcesSection'
import { ProjectGrid } from './components/ProjectGrid'
import { Footer } from './components/Footer'
import { SearchOverlay } from './components/SearchOverlay'
import { useSearchParams, useRouter } from 'next/navigation'

interface ResourcesSectionProps {
  globalSearchQuery: string;
  setGlobalSearchQuery: (query: string) => void;
  selectedTags: string[];
  isOrFilter: boolean;
}

export default function Home() {
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [globalSearchQuery, setGlobalSearchQuery] = useState('')
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [isOrFilter, setIsOrFilter] = useState(false)
  const [selectedBlockchains, setSelectedBlockchains] = useState<string[]>([])
  const searchParams = useSearchParams()
  const router = useRouter()
  
  useEffect(() => {
    const queryParam = searchParams.get('q')
    const tagParam = searchParams.get('tags')
    const orParam = searchParams.get('filter') === 'or'
    const blockchainParam = searchParams.get('blockchains')
    
    // Handle search query
    if (queryParam) {
      setGlobalSearchQuery(queryParam)
    } else {
      setGlobalSearchQuery('')
    }
    
    // Handle tags
    if (tagParam) {
      setSelectedTags(tagParam.split(','))
    } else {
      setSelectedTags([])
    }
    
    // Handle blockchains
    if (blockchainParam) {
      setSelectedBlockchains(blockchainParam.split(','))
    } else {
      setSelectedBlockchains([])
    }
    
    setIsOrFilter(orParam)
  }, [searchParams])

  const handleSearch = (query: string) => {
    setGlobalSearchQuery(query)
    setIsSearchOpen(false)
    
    const params = new URLSearchParams(window.location.search)
    
    // Update or remove search query
    if (query) {
      params.set('q', query)
    } else {
      params.delete('q')
    }
    
    // Keep existing tags if present
    if (selectedTags.length > 0) {
      params.set('tags', selectedTags.join(','))
    }
    
    // Keep filter type if OR
    if (isOrFilter) {
      params.set('filter', 'or')
    }
    
    // Keep blockchain filters if present
    if (selectedBlockchains.length > 0) {
      params.set('blockchains', selectedBlockchains.join(','))
    }
    
    const newUrl = params.toString() ? `?${params.toString()}` : '/'
    router.push(newUrl)
  }

  const handleTagToggle = (tag: string) => {
    const newTags = selectedTags.includes(tag)
      ? selectedTags.filter(t => t !== tag)
      : [...selectedTags, tag]
    
    updateUrlWithFilters(newTags)
  }

  const handleFilterToggle = () => {
    const newIsOrFilter = !isOrFilter
    setIsOrFilter(newIsOrFilter)
    updateUrlWithFilters(selectedTags, selectedBlockchains, newIsOrFilter)
  }

  const updateUrlWithFilters = (
    tags: string[], 
    blockchains: string[] = selectedBlockchains, 
    orFilter: boolean = isOrFilter
  ) => {
    const params = new URLSearchParams()
    if (tags.length > 0) {
      params.set('tags', tags.join(','))
    }
    if (blockchains.length > 0) {
      params.set('blockchains', blockchains.join(','))
    }
    if (orFilter) {
      params.set('filter', 'or')
    }
    const newUrl = params.toString() ? `?${params.toString()}` : '/'
    router.push(newUrl)
  }

  const handleSearchInputChange = (query: string) => {
    setGlobalSearchQuery(query)
    
    const params = new URLSearchParams(window.location.search)
    
    // Update or remove search query
    if (query) {
      params.set('q', query)
    } else {
      params.delete('q')
    }
    
    // Keep existing tags if present
    if (selectedTags.length > 0) {
      params.set('tags', selectedTags.join(','))
    }
    
    // Keep filter type if OR
    if (isOrFilter) {
      params.set('filter', 'or')
    }
    
    // Keep blockchain filters if present
    if (selectedBlockchains.length > 0) {
      params.set('blockchains', selectedBlockchains.join(','))
    }
    
    const newUrl = params.toString() ? `?${params.toString()}` : '/'
    router.push(newUrl, { scroll: false })
  }

  return (
    <div className="min-h-screen bg-white text-black">
      <Header onSearchClick={() => setIsSearchOpen(true)} />
      <SearchOverlay
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSearch={handleSearch}
      />
      <main className="container mx-auto px-4 py-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h1 className="text-4xl font-medium mb-4">
            <a 
              href="https://x.com/trumpecosystem" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="rainbow-text"
            >
              AMERICA FIRST
            </a> ecosystem</h1>
          <p className="text-lg text-black">
          Your guide  to the
            <a 
              href="https://trumpecosystem.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="rainbow-text ml-1 mr-1"
            >
              AMERICA FIRST CRYPTO ECOSYSTEM
            </a>
          </p>
        </div>
        {globalSearchQuery && (
          <div className="mb-8 text-center">
            <h2 className="text-2xl font-medium">Search Results for: {globalSearchQuery}</h2>
          </div>
        )}
        <ProjectGrid 
          globalSearchQuery={globalSearchQuery}
          setGlobalSearchQuery={handleSearchInputChange}
          selectedTags={selectedTags}
          setSelectedTags={setSelectedTags}
          selectedBlockchains={selectedBlockchains}
          setSelectedBlockchains={setSelectedBlockchains}
          isOrFilter={isOrFilter}
          onFilterToggle={handleFilterToggle}
          updateUrlWithFilters={updateUrlWithFilters}
          router={router}
        />
        <ResourcesSection 
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

