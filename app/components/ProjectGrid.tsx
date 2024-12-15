'use client'

import { useState, useMemo, useEffect } from 'react'
import { ProjectCard } from './ProjectCard'
import { AISearchBar } from './AISearchBar'
import { Slider } from './ui/slider'
import { X } from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select"
import projectsData from '../data/projects.json'
import { AndOrToggle } from './AndOrToggle'
import { useRouter } from 'next/navigation'

interface ProjectGridProps {
  globalSearchQuery: string
  setGlobalSearchQuery: (query: string) => void
  selectedTags: string[]
  setSelectedTags: (tags: string[]) => void
  isOrFilter: boolean
  onFilterToggle: () => void
  selectedBlockchains: string[]
  setSelectedBlockchains: (chains: string[]) => void
  updateUrlWithFilters: (tags: string[], blockchains: string[], orFilter: boolean) => void
  router: any
}
  
export function ProjectGrid({ globalSearchQuery, setGlobalSearchQuery, selectedTags, setSelectedTags, isOrFilter, onFilterToggle, selectedBlockchains, setSelectedBlockchains, updateUrlWithFilters, router }: ProjectGridProps) {
  const [tvlRange, setTvlRange] = useState<[number, number]>([0, 100])
  const [aiSearchResult, setAiSearchResult] = useState<{ description: string, itemName: string } | null>(null)
  const [isBlockchainAndLogic, setIsBlockchainAndLogic] = useState(true)

  const allTags = useMemo(() => {
    const tagSet = new Set<string>()
    tagSet.add("inactive")
    projectsData.forEach(item => item.tags.forEach(tag => {
      if (typeof tag === 'string' && tag.trim() !== '') {
        tagSet.add(tag.trim())
      }
    }))
    return Array.from(tagSet)
  }, [])

  const allBlockchains = useMemo(() => {
    const blockchainSet = new Set<string>()
    projectsData.forEach(item => {
      item.blockchain.forEach(chain => {
        if (typeof chain === 'string' && chain.trim() !== '') {
          blockchainSet.add(chain.trim())
        }
      })
    })
    return Array.from(blockchainSet)
  }, [])

  const tvlValues = useMemo(() => {
    return projectsData.map(item => {
      if (item.tvl && typeof item.tvl === 'string') {
        return parseFloat(item.tvl.replace('$', '').replace('M', ''))
      }
      return 0
    }).filter(value => value > 0)
  }, [])

  const minTVL = Math.min(...tvlValues)
  const maxTVL = Math.max(...tvlValues)

  const filteredProjects = projectsData.filter(item => {
    const matchesSearch = (
      item.name.toLowerCase().includes(globalSearchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(globalSearchQuery.toLowerCase())
    )
    
    const matchesTags = selectedTags.length === 0 || (
      isOrFilter
        ? selectedTags.some(tag => 
            tag === "inactive" 
              ? !item.active 
              : item.tags.includes(tag)
          )
        : selectedTags.every(tag => 
            tag === "inactive" 
              ? !item.active 
              : item.tags.includes(tag)
          )
    )

    const matchesBlockchains = selectedBlockchains.length === 0 || (
      isBlockchainAndLogic
        ? selectedBlockchains.every(chain => item.blockchain.includes(chain))
        : selectedBlockchains.some(chain => item.blockchain.includes(chain))
    )

    return matchesSearch && matchesTags && matchesBlockchains
  })

  const handleAISearchResult = (description: string, itemName: string) => {
    setAiSearchResult({ description, itemName })
  }

  const handleTagSelect = (tag: string) => {
    setGlobalSearchQuery('')
    const newTags = selectedTags.includes(tag)
      ? selectedTags.filter(t => t !== tag)
      : [...selectedTags, tag]
    setSelectedTags(newTags)
    updateUrlWithFilters(newTags, selectedBlockchains, isOrFilter)
  }

  const handleBlockchainSelect = (blockchain: string) => {
    const newBlockchains = selectedBlockchains.includes(blockchain)
      ? selectedBlockchains.filter(b => b !== blockchain)
      : [...selectedBlockchains, blockchain]
    setSelectedBlockchains(newBlockchains)
    updateUrlWithFilters(selectedTags, newBlockchains, isOrFilter)
  }

  const removeTag = (tag: string) => {
    const newTags = selectedTags.filter(t => t !== tag)
    setSelectedTags(newTags)
    updateUrlWithFilters(newTags, selectedBlockchains, isOrFilter)
  }

  const removeBlockchain = (blockchain: string) => {
    const newBlockchains = selectedBlockchains.filter(b => b !== blockchain)
    setSelectedBlockchains(newBlockchains)
    updateUrlWithFilters(selectedTags, newBlockchains, isOrFilter)
  }

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value
    setGlobalSearchQuery(query)
    
    const params = new URLSearchParams(window.location.search)
    
    if (query) {
      params.set('q', query)
    } else {
      params.delete('q')
    }
    
    // Preserve existing tags
    if (selectedTags.length > 0) {
      params.set('tags', selectedTags.join(','))
    }
    
    // Preserve filter type
    if (isOrFilter) {
      params.set('filter', 'or')
    }
    
    // Preserve blockchain filters
    if (selectedBlockchains.length > 0) {
      params.set('blockchains', selectedBlockchains.join(','))
    }
    
    const newUrl = params.toString() ? `?${params.toString()}` : '/'
    router.push(newUrl, { scroll: false })
  }

  return (
    <div>
      <AISearchBar onSearchResult={handleAISearchResult} />
      {aiSearchResult && (
        <div className="mb-4 p-4 bg-[#2A2D3A]">
          <h3 className="text-lg font-semibold mb-2">AI Search Result:</h3>
          <p className="mb-4 typewriter">
            {aiSearchResult.description}
          </p>
          <div className="flex flex-col items-center">
            {aiSearchResult.itemName.split(',').map(name => {
              const project = projectsData.find(
                item => item.name.trim().toLowerCase() === name.trim().toLowerCase()
              )
              return project ? (
                <div key={project.name} className="w-full max-w-md mb-4">
                  <ProjectCard project={project} />
                </div>
              ) : null
            })}
          </div>
        </div>
      )}
      <div className="mb-4 space-y-4">
        <input
          type="text"
          placeholder="Filter by name or description..."
          value={globalSearchQuery}
          onChange={handleSearchInputChange}
          className="w-full bg-[#2A2D3A] text-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-300"
        />
        <div className="flex space-x-4">
          <div className="flex-1">
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium text-gray-300">Tags</label>
              <AndOrToggle isAnd={!isOrFilter} onToggle={onFilterToggle} />
            </div>
            <Select onValueChange={handleTagSelect}>
              <SelectTrigger className="w-full bg-[#1FD978] text-primary">
                <SelectValue placeholder="Select tags" />
              </SelectTrigger>
              <SelectContent>
                {allTags.map((tag) => (
                  <SelectItem key={tag} value={tag}>
                    {tag}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <div className="flex flex-wrap gap-2 mt-2">
              {selectedTags.map((tag) => (
                <span key={tag} className="bg-[#1FD978] text-primary text-xs px-2 py-1 flex items-center">
                  {tag}
                  <button onClick={() => removeTag(tag)} className="ml-1 focus:outline-none">
                    <X size={12} />
                  </button>
                </span>
              ))}
            </div>
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium text-gray-300">Blockchains</label>
              <AndOrToggle isAnd={isBlockchainAndLogic} onToggle={setIsBlockchainAndLogic} />
            </div>
            <Select onValueChange={handleBlockchainSelect}>
              <SelectTrigger className="w-full bg-[#1FD978] text-primary">
                <SelectValue placeholder="Select blockchains" />
              </SelectTrigger>
              <SelectContent>
                {allBlockchains.map((blockchain) => (
                  <SelectItem key={blockchain} value={blockchain}>
                    {blockchain}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <div className="flex flex-wrap gap-2 mt-2">
              {selectedBlockchains.map((blockchain) => (
                <span key={blockchain} className="bg-[#1FD978] text-primary text-xs px-2 py-1 flex items-center">
                  {blockchain}
                  <button onClick={() => removeBlockchain(blockchain)} className="ml-1 focus:outline-none">
                    <X size={12} />
                  </button>
                </span>
              ))}
            </div>
          </div>
        </div>
        {tvlValues.length > 0 && (
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">TVL Range (in millions)</label>
            <Slider
              min={minTVL}
              max={maxTVL}
              step={0.1}
              value={tvlValues.length === 1 ? [minTVL, minTVL] : tvlRange}
              onValueChange={(value: number[]) => setTvlRange(value as [number, number])}
              disabled={tvlValues.length === 1}
              className="w-full"
            />
            <div className="flex justify-between mt-2">
              <span>${tvlRange[0].toFixed(1)}M</span>
              <span>${tvlRange[1].toFixed(1)}M</span>
            </div>
          </div>
        )}
      </div>
      {filteredProjects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((item, index) => (
            <ProjectCard key={index} project={item} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-2xl font-semibold mb-2">No projects found</h3>
          <p className="text-gray-400">
            Try adjusting your filters or search terms to find more results.
          </p>
          <a
            href="https://github.com/PotLock/awesome-pump/tree/main/app/data/projects.json"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-4 px-6 py-2 bg-[#1FD978] text-primary hover:bg-green-400 focus:outline-none focus:ring-2 focus:ring-green-300"
          >
            Submit a Project
          </a>
        </div>
      )}
    </div>
  )
}

