'use client'

import { useState, useMemo, useEffect } from 'react'
import { X } from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select"
import resourcesData from '../data/resources.json'
import { AndOrToggle } from './AndOrToggle'
import { areStringsEqual } from '../utils/stringUtils'
import Link from 'next/link'
import { ResourceCard } from './ResourceCard'

interface ResourcesSectionProps {
  globalSearchQuery: string
  setGlobalSearchQuery: (query: string) => void
  selectedTags: string[]
  isOrFilter: boolean
}

export function ResourcesSection({ 
  globalSearchQuery, 
  setGlobalSearchQuery, 
  selectedTags: externalSelectedTags,
  isOrFilter 
}: ResourcesSectionProps) {
  const [internalSelectedTags, setInternalSelectedTags] = useState<string[]>([])
  const [isAndLogic, setIsAndLogic] = useState(true)

  const allTags = useMemo(() => {
    const tagSet = new Set<string>()
    resourcesData.forEach(resource => resource.tags.forEach(tag => tagSet.add(tag)))
    return Array.from(tagSet)
  }, [])

  const filteredResources = resourcesData.filter(resource =>
    (resource.name.toLowerCase().includes(globalSearchQuery.toLowerCase()) ||
     resource.description.toLowerCase().includes(globalSearchQuery.toLowerCase())) &&
    (internalSelectedTags.length === 0 || (isAndLogic
      ? internalSelectedTags.every(tag => resource.tags.includes(tag))
      : internalSelectedTags.some(tag => resource.tags.includes(tag))))
  )

  const handleTagSelect = (tag: string) => {
    setInternalSelectedTags(prev => 
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    )
  }

  const removeTag = (tag: string) => {
    setInternalSelectedTags(prev => prev.filter(t => t !== tag))
  }

  useEffect(() => {
    if (externalSelectedTags.length > 0) {
      setInternalSelectedTags(externalSelectedTags)
    } else {
      setInternalSelectedTags([])
    }
  }, [externalSelectedTags])

  return (
    <section className="mt-12">
      <h2 className="text-2xl font-medium mb-6 text-white">Resources</h2>
      <div className="mb-4 space-y-4">
        <input
          type="text"
          placeholder="Filter resources by name or description..."
          value={globalSearchQuery}
          onChange={(e) => setGlobalSearchQuery(e.target.value)}
          className="w-full bg-[#2A2D3A] text-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-300"
        />
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-medium text-gray-300">Tags</label>
            <AndOrToggle isAnd={isAndLogic} onToggle={setIsAndLogic} />
          </div>
          <Select onValueChange={handleTagSelect}>
            <SelectTrigger className="w-full bg-[#1FD978] text-primary">
              <SelectValue placeholder="Select tags" />
            </SelectTrigger>
            <SelectContent>
              {allTags
                .filter(tag => tag.trim() !== '' && !internalSelectedTags.includes(tag))
                .map((tag) => (
                  <SelectItem key={tag} value={tag}>
                    {tag}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
          <div className="flex flex-wrap gap-2 mt-2">
            {internalSelectedTags.map((tag) => (
              <span key={tag} className="bg-[#1FD978] text-primary text-xs px-2 py-1 flex items-center">
                {tag}
                <button onClick={() => removeTag(tag)} className="ml-1 focus:outline-none">
                  <X size={12} />
                </button>
              </span>
            ))}
          </div>
        </div>
      </div>
      {filteredResources.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredResources.map((resource, index) => (
            <Link 
              key={index}
              href={`/resources/${encodeURIComponent(resource.name.toLowerCase().replaceAll('.', '-').replaceAll(' ', '-'))}`}
            >
              <ResourceCard resource={resource} />
            </Link>
          ))}
        </div>
      ): (
        <div className="text-center py-16">
          <div className="text-6xl mb-4">🔧</div>
          <h3 className="text-2xl font-semibold mb-2 text-white">No resources found</h3>
          <p className="text-gray-400">
            Try adjusting your filters or search terms to find more results.
          </p>
          <a
            href="https://github.com/codingshot/trump-ecosystem/tree/main/app/data/resources.json"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-4 px-6 py-2 bg-[#1FD978] text-primary hover:bg-green-400 focus:outline-none focus:ring-2 focus:ring-green-300"
          >
            Submit a Resource
          </a>
        </div>
      )}
    </section>
  )
}

