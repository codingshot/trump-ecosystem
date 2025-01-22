'use client'

import { useState } from 'react'
import { useChat } from 'ai/react'
import { Loader2 } from 'lucide-react'
import { ProjectCard } from './ProjectCard'
import projectsData from '../data/projects.json'

// already wrote this in /api/ai-search/route.ts
function stringSimilarity(str1: string, str2: string): number {
  const longer = str1.length > str2.length ? str1 : str2;
  const shorter = str1.length > str2.length ? str2 : str1;
  
  if (longer.length === 0) return 1.0;
  
  const costs = new Array();
  for (let i = 0; i <= longer.length; i++) {
    costs[i] = i;
  }

  for (let i = 1; i <= shorter.length; i++) {
    costs[i] = i;
    let nw = i - 1;
    for (let j = 1; j <= longer.length; j++) {
      const cj = Math.min(1 + Math.min(costs[j], costs[j - 1]),
        shorter[i - 1] === longer[j - 1] ? nw : nw + 1);
      nw = costs[j];
      costs[j] = cj;
    }
  }

  return (longer.length - costs[longer.length]) / longer.length;
}

const exampleQueries = [
  "Show me tools for analytics of launchpad tokens",
  "What platforms are there for AI agent meme coins?",
  "Find launchpad on both Solana and Base",
  "How do the DEX liquidity targets compare in volume to AMERICA FIRST ECOSYSTEM for all its forks?",
  "Which EVM ecosystem has the most AMERICA FIRST ECOSYSTEM clones",
  "What are pump fun forks on Move & Rust based blockchains?"
]

interface AISearchBarProps {
  onSearchResult: (description: string, projectName: string) => void
}

function encodeErrorForURL(error: string): string {
  return encodeURIComponent(error.replace(/\s+/g, ' ').trim());
}

export function AISearchBar({ onSearchResult }: AISearchBarProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [matchedProject, setMatchedProject] = useState(null)
  const [searchError, setSearchError] = useState<string | null>(null)

  const { messages, input, handleInputChange, handleSubmit, isLoading, error } = useChat({
    api: '/api/ai-search',
    onFinish: (message) => {
      try {
        const [description, projectName] = message.content.split('|')
        if (!description || !projectName) {
          setSearchError('Invalid response format from AI')
          return
        }

        // Find best matching project
        let bestMatch = null
        let highestSimilarity = 0

        projectsData.forEach(project => {
          const similarity = stringSimilarity(
            project.name.toLowerCase(),
            projectName.trim().toLowerCase()
          )
          if (similarity > 0.9 && similarity > highestSimilarity) {
            bestMatch = project
            highestSimilarity = similarity
          }
        })

        if (bestMatch) {
          setMatchedProject(bestMatch)
          setSearchError(null)
        } else {
          setSearchError('No matching project found')
        }

        onSearchResult(description.trim(), projectName.trim())
        setIsOpen(false)
      } catch (err) {
        console.error('Error processing AI response:', err)
        setSearchError('Error processing AI response')
      }
    },
    onError: (error) => {
      console.error('Chat error:', error)
      setSearchError(error.message || 'An error occurred while processing your request')
    }
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
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">AI Search</h2>
              <span className="text-sm text-gray-400">Powered by {process.env.AI_Provider}</span>
            </div>
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
            {searchError && (
              <div className="mb-4 max-h-[200px] overflow-y-auto">
                <div className="p-3 bg-red-500/20 border border-red-500 rounded-lg text-red-200">
                  <div className="flex justify-between items-start mb-2">
                    <span className="font-semibold">Error:</span>
                    <div className="flex gap-2">
                      <button
                        onClick={() => navigator.clipboard.writeText(searchError)}
                        className="text-xs bg-red-500/30 hover:bg-red-500/50 px-2 py-1 rounded"
                        title="Copy error message"
                      >
                        Copy
                      </button>
                      <a
                        href={`https://www.perplexity.ai/search/new?q=${encodeErrorForURL(searchError)}&copilot=false&s=d`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs bg-blue-500/30 hover:bg-blue-500/50 px-2 py-1 rounded"
                      >
                        Ask AI
                      </a>
                    </div>
                  </div>
                  <div className="text-sm">
                    {searchError}
                  </div>
                </div>
              </div>
            )}
            {matchedProject && (
              <div className="mb-4">
                <h3 className="text-lg font-semibold mb-2">Matched Project:</h3>
                <ProjectCard project={matchedProject} />
              </div>
            )}
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
              onClick={() => {
                setIsOpen(false)
                setMatchedProject(null)
              }}
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

