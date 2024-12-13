'use client'

import { useState, useEffect, useRef } from 'react'
import { X } from 'lucide-react'

interface SearchOverlayProps {
  isOpen: boolean
  onClose: () => void
  onSearch: (query: string) => void
}

export function SearchOverlay({ isOpen, onClose, onSearch }: SearchOverlayProps) {
  const [query, setQuery] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    onSearch(query)
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-primary bg-opacity-95 z-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <div className="flex justify-end mb-4">
          <button onClick={onClose} className="text-white hover:text-green-300 focus:outline-none">
            <X className="w-6 h-6" />
          </button>
        </div>
        <form onSubmit={handleSearch} className="flex items-center">
          <input
            ref={inputRef}
            type="text"
            placeholder="Search projects..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-[#2A2D3A] text-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-300"
          />
          <button type="submit" className="bg-[#1FD978] text-primary px-6 py-2 hover:bg-green-400 focus:outline-none focus:ring-2 focus:ring-green-300">
            Search
          </button>
        </form>
      </div>
    </div>
  )
}

