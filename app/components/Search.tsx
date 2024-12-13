'use client'

import { useState } from 'react'

export function Search() {
  const [query, setQuery] = useState('')

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // Implement search functionality here
    console.log('Searching for:', query)
  }

  return (
    <form onSubmit={handleSearch} className="flex items-center">
      <input
        type="text"
        placeholder="Search projects..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="bg-[#2A2D3A] text-white px-4 py-2 rounded-l-full focus:outline-none focus:ring-2 focus:ring-green-300"
      />
      <button type="submit" className="bg-[#1FD978] text-primary px-4 py-2 rounded-r-full hover:bg-green-400 focus:outline-none focus:ring-2 focus:ring-green-300">
        Search
      </button>
    </form>
  )
}

