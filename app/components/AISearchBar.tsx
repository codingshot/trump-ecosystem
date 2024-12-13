'use client'

import { useState } from 'react'
import { useChat } from 'ai/react'
import { Loader2 } from 'lucide-react'

const exampleQueries = [
  "Find a project that resembles Uniswap",
  "Which project has the highest TVL?",
  "Show me tools for analytics",
  "Find projects on the Solana blockchain",
  "What are the latest DeFi projects?"
]

interface AISearchBarProps {
  onSearchResult: (result: string, projectName: string) => void
}

export function AISearchBar({ onSearchResult }: AISearchBarProps) {
  const [isOpen, setIsOpen] = useState(false)
  const { messages, input, handleInputChange, handleSubmit, isLoading, error } = useChat({
    api: '/api/ai-search',
    onFinish: (message) => {
      try {
        const [description, projectName] = message.content.split('|')
        if (!description || !projectName) {
          throw new Error('Invalid response format')
        }
        onSearchResult(description.trim(), projectName.trim())
        setIsOpen(false)
      } catch (err) {
        console.error('Error processing AI response:', err)
        // Handle error appropriately
      }
    },
  })

  const handleExampleClick = (example: string) => {
    handleInputChange({ target: { value: example } } as any)
    handleSubmit(new Event('submit') as any)
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 bg-[#1FD978] text-primary px-4 py-2 rounded-full hover:bg-green-400 focus:outline-none focus:ring-2 focus:ring-green-300 z-50"
      >
        🪄 Try AI
      </button>
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-[#2A2D3A] p-6 rounded-lg w-full max-w-2xl">
            <h2 className="text-2xl font-bold mb-4">AI Search</h2>
            <form onSubmit={handleSubmit} className="flex items-center mb-4">
              <input
                type="text"
                value={input}
                onChange={handleInputChange}
                placeholder="Ask about projects..."
                className="flex-grow bg-[#3A3D4A] text-white px-4 py-2 rounded-l-full focus:outline-none focus:ring-2 focus:ring-green-300"
              />
              <button
                type="submit"
                className="bg-[#1FD978] text-primary px-6 py-2 rounded-r-full hover:bg-green-400 focus:outline-none focus:ring-2 focus:ring-green-300 flex items-center"
                disabled={isLoading}
              >
                {isLoading ? <Loader2 className="animate-spin" /> : 'Search'}
              </button>
            </form>
            <div className="flex flex-wrap gap-2 mb-4">
              {exampleQueries.map((example, index) => (
                <button
                  key={index}
                  onClick={() => handleExampleClick(example)}
                  className="text-xs bg-[#3A3D4A] text-white px-2 py-1 rounded-full hover:bg-[#4A4D5A] focus:outline-none focus:ring-2 focus:ring-green-300"
                >
                  {example}
                </button>
              ))}
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="mt-4 text-sm text-gray-400 hover:text-white"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  )
}

