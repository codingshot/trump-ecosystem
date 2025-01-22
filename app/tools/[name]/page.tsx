'use client'

import { useState, useEffect } from 'react'
import { Header } from '../../components/Header'
import { Footer } from '../../components/Footer'
import { SearchOverlay } from '../../components/SearchOverlay'
import { useRouter, useSearchParams } from 'next/navigation'
import Image from 'next/image'
import { Twitter, Globe, MessageCircle, Github, Share } from 'lucide-react'
import toolsData from '../../data/tools.json'
import { getExplorerUrl } from '../../utils/chainExplorers'

export default function ToolPage({ params }: { params: { name: string } }) {
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [globalSearchQuery, setGlobalSearchQuery] = useState('')
  const searchParams = useSearchParams()
  const router = useRouter()
  const [isSharePopupOpen, setIsSharePopupOpen] = useState(false)
  
  const tool = toolsData.find(t => 
    t.name.toLowerCase().replaceAll('.', '-').replaceAll(' ', '-') === decodeURIComponent(params.name)
  )

  useEffect(() => {
    const queryParam = searchParams.get('q')
    if (queryParam) {
      setGlobalSearchQuery(queryParam)
    }
  }, [searchParams])

  const handleSearch = (query: string) => {
    setGlobalSearchQuery(query)
    setIsSearchOpen(false)
    const newUrl = query ? `?q=${encodeURIComponent(query)}` : '/'
    router.push(newUrl)
  }

  const generateShareText = (name: string, description: string) => {
    const baseText = `${name} - ${description} | Trump Ecosystem Tools`
    return {
      twitter: baseText.length > 280 ? baseText.substring(0, 277) + '...' : baseText,
      general: baseText.length > 100 ? baseText.substring(0, 97) + '...' : baseText
    }
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isSharePopupOpen && !(event.target as Element).closest('.share-popup')) {
        setIsSharePopupOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isSharePopupOpen])

  if (!tool) {
    return (
      <div className="min-h-screen bg-primary text-white">
        <Header onSearchClick={() => setIsSearchOpen(true)} />
        <main className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-4xl font-medium mb-4">Tool Not Found</h1>
            <button 
              onClick={() => router.push('/')}
              className="bg-[#1FD978] text-primary px-6 py-2 rounded hover:bg-green-400"
            >
              Return Home
            </button>
          </div>
        </main>
        <Footer />
      </div>
    )
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
        <div className="max-w-4xl mx-auto">
          <div className="bg-[#2A2D3A] p-8 rounded-lg shadow-xl">
            <div className="flex items-center mb-8">
              <Image 
                src={tool.profileImage} 
                alt={tool.name} 
                width={100} 
                height={100} 
                className="rounded-full"
                unoptimized={tool.profileImage.startsWith('http')}
              />
              <div className="ml-6 flex items-center">
                <div>
                  <h1 className="text-3xl font-bold mb-2">{tool.name}</h1>
                  <div className="flex space-x-4">
                    {tool.twitter && (
                      <a href={`https://twitter.com/${tool.twitter}`} target="_blank" rel="noopener noreferrer" className="text-[#9DC4F8] hover:text-[#1FD978]">
                        <Twitter size={24} />
                      </a>
                    )}
                    {tool.url && (
                      <a href={tool.url} target="_blank" rel="noopener noreferrer" className="text-[#9DC4F8] hover:text-[#1FD978]">
                        <Globe size={24} />
                      </a>
                    )}
                    {tool.chatLink && (
                      <a href={tool.chatLink} target="_blank" rel="noopener noreferrer" className="text-[#9DC4F8] hover:text-[#1FD978]">
                        <MessageCircle size={24} />
                      </a>
                    )}
                  </div>
                </div>
                <button 
                  onClick={() => setIsSharePopupOpen(!isSharePopupOpen)}
                  className="ml-4 text-[#9DC4F8] hover:text-[#1FD978]"
                >
                  <Share size={24} />
                </button>
                
                {isSharePopupOpen && (
                  <div className="absolute z-10 bg-[#2A2D3A] p-4 rounded-lg shadow-xl share-popup">
                    <div className="flex flex-col space-y-3">
                      <a 
                        href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(generateShareText(tool.name, tool.description).twitter)}&url=${encodeURIComponent(window.location.href)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-2 text-[#9DC4F8] hover:text-[#1FD978]"
                      >
                        <Twitter size={20} />
                        <span>Share on Twitter</span>
                      </a>
                      <a 
                        href={`https://t.me/share/url?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(generateShareText(tool.name, tool.description).general)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-2 text-[#9DC4F8] hover:text-[#1FD978]"
                      >
                        <MessageCircle size={20} />
                        <span>Share on Telegram</span>
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold mb-2">Description</h2>
                <p className="text-[#9DA3AE]">{tool.description}</p>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-2">Tags</h2>
                <div className="flex flex-wrap gap-2">
                  {tool.tags.map((tag, index) => (
                    <span 
                      key={index} 
                      className="bg-[#1FD978] text-primary text-sm px-3 py-1 rounded cursor-pointer hover:bg-[#1bc068]"
                      onClick={() => router.push(`/?tag=${encodeURIComponent(tag)}`)}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-2">Supported Blockchains</h2>
                <div className="flex flex-wrap gap-2">
                  {Array.isArray(tool.blockchain) 
                    ? tool.blockchain.map((chain, index) => (
                        <span 
                          key={index} 
                          className="bg-[#4A5568] text-white text-sm px-3 py-1 rounded"
                        >
                          {chain}
                        </span>
                      ))
                    : (
                        <span className="bg-[#4A5568] text-white text-sm px-3 py-1 rounded">
                          {tool.blockchain}
                        </span>
                      )
                  }
                </div>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-2">Relation to AMERICA FIRST ECOSYSTEM</h2>
                <p className="text-[#9DA3AE]">{tool.relation}</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
