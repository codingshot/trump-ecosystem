'use client'

import { useState, useEffect } from 'react'
import { Header } from '../../components/Header'
import { Footer } from '../../components/Footer'
import { SearchOverlay } from '../../components/SearchOverlay'
import { useRouter, useSearchParams } from 'next/navigation'
import Image from 'next/image'
import { Twitter, Globe, MessageCircle, Github, Share } from 'lucide-react'
import projectsData from '../../data/projects.json'

export default function ProjectPage({ params }: { params: { name: string } }) {
  console.log('URL params.name:', params.name)
  console.log('Looking for project with name pattern:', decodeURIComponent(params.name))
  console.log('Available projects:', projectsData.map(p => ({
    original: p.name,
    transformed: p.name.toLowerCase().replaceAll('.', '-').replaceAll(' ', '-')
  })))
  
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [globalSearchQuery, setGlobalSearchQuery] = useState('')
  const searchParams = useSearchParams()
  const router = useRouter()
  const [isSharePopupOpen, setIsSharePopupOpen] = useState(false)
  
  const project = projectsData.find(p => 
    p.name.toLowerCase().replaceAll('.', '-').replaceAll(' ', '-') === decodeURIComponent(params.name)
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
    const baseText = `${name} - ${description} | Awesome Oyno`
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

  const handleBlockchainClick = (e: React.MouseEvent, blockchain: string) => {
    e.preventDefault()
    e.stopPropagation()
    const params = new URLSearchParams()
    params.set('blockchains', blockchain)
    router.push(`/?${params.toString()}`)
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-primary text-white">
        <Header onSearchClick={() => setIsSearchOpen(true)} />
        <main className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-4xl font-medium mb-4">Project Not Found</h1>
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
                src={project.profileImage} 
                alt={project.name} 
                width={100} 
                height={100} 
                className="rounded-full"
                unoptimized={project.profileImage.startsWith('http')}
              />
              <div className="ml-6 flex items-center">
                <div>
                  <h1 className="text-3xl font-bold mb-2">{project.name}</h1>
                  <div className="flex space-x-4">
                    {project.twitter && (
                      <a href={`https://twitter.com/${project.twitter}`} target="_blank" rel="noopener noreferrer" className="text-[#9DC4F8] hover:text-[#1FD978]">
                        <Twitter size={24} />
                      </a>
                    )}
                    {project.url && (
                      <a href={project.url} target="_blank" rel="noopener noreferrer" className="text-[#9DC4F8] hover:text-[#1FD978]">
                        <Globe size={24} />
                      </a>
                    )}
                    {project.chatLink && (
                      <a href={project.chatLink} target="_blank" rel="noopener noreferrer" className="text-[#9DC4F8] hover:text-[#1FD978]">
                        <MessageCircle size={24} />
                      </a>
                    )}
                    {project.github && (
                      <a href={project.github} target="_blank" rel="noopener noreferrer" className="text-[#9DC4F8] hover:text-[#1FD978]">
                        <Github size={24} />
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
                        href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(generateShareText(project.name, project.description).twitter)}&url=${encodeURIComponent(window.location.href)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-2 text-[#9DC4F8] hover:text-[#1FD978]"
                      >
                        <Twitter size={20} />
                        <span>Share on Twitter</span>
                      </a>
                      <a 
                        href={`https://t.me/share/url?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(generateShareText(project.name, project.description).general)}`}
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
                <p className="text-[#9DA3AE]">{project.description}</p>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-2">Tags</h2>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, index) => (
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
                <h2 className="text-xl font-semibold mb-2">Blockchain</h2>
                <div className="flex flex-wrap gap-2">
                  {Array.isArray(project.blockchain) 
                    ? project.blockchain.map((chain, index) => (
                        <span 
                          key={index} 
                          className="bg-[#4A5568] text-white text-sm px-3 py-1 rounded cursor-pointer hover:bg-gray-600"
                          onClick={(e) => handleBlockchainClick(e, chain)}
                        >
                          {chain}
                        </span>
                      ))
                    : (
                        <span 
                          className="bg-[#4A5568] text-white text-sm px-3 py-1 rounded cursor-pointer hover:bg-gray-600"
                          onClick={(e) => handleBlockchainClick(e, project.blockchain[0])}
                        >
                          {project.blockchain[0]}
                        </span>
                      )
                  }
                </div>
              </div>

              {project.tvl && (
                <div>
                  <h2 className="text-xl font-semibold mb-2">TVL</h2>
                  <p className="text-[#9DA3AE]">{project.tvl}</p>
                </div>
              )}

              {project.contractAddress && (
                <div>
                  <h2 className="text-xl font-semibold mb-2">Contract Address</h2>
                  <p className="text-[#9DA3AE] break-all">{project.contractAddress}</p>
                </div>
              )}

              <div>
                <h2 className="text-xl font-semibold mb-2">Relation to Pump.fun</h2>
                <p className="text-[#9DA3AE]">{project.relation}</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
