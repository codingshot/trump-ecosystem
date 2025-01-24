'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Twitter, Globe, MessageCircle } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { getExplorerUrl } from '../utils/chainExplorers'
import { ResourceCard } from './ResourceCard'

interface Contract {
  address: string;
  chain: string;
  type: string;
}

interface Token {
  symbol: string;
  address: string;
  chain: string;
}

interface Project {
  name: string;
  twitter: string;
  description: string;
  url: string;
  chatLink: string;
  profileImage: string;
  tags: string[];
  blockchain?: string | string[];
  tvl?: string;
  github?: string;
  contracts?: Contract[];
  tokens?: Token[];
  relation: string;
  active: boolean;
  type: 'tool' | 'project';
}

export function ProjectCard({ project }: { project: Project }) {
  const [showMore, setShowMore] = useState(false)
  const [animate, setAnimate] = useState(false)
  const router = useRouter()

  useEffect(() => {
    setAnimate(true)
    const timer = setTimeout(() => setAnimate(false), 500)
    return () => clearTimeout(timer)
  }, [])

  const handleMoreInfoClick = (e: React.MouseEvent) => {
    e.preventDefault() // Prevent the Link navigation
    setShowMore(!showMore)
  }

  const handleTagClick = (e: React.MouseEvent, tag: string) => {
    e.preventDefault() // Prevent the Link navigation
    e.stopPropagation() // Prevent bubbling
    const params = new URLSearchParams()
    params.set('tags', tag)
    router.push(`/?${params.toString()}`)
  }

  const handleBlockchainClick = (e: React.MouseEvent, blockchain: string) => {
    e.preventDefault()
    e.stopPropagation()
    router.push(`/?blockchains=${encodeURIComponent(blockchain)}`)
  }

  return (
    <Link 
      href={`/${project.type !== 'tool' ? 'projects' : 'resources'}/${encodeURIComponent(project.name.toLowerCase().replaceAll('.', '-').replaceAll(' ', '-'))}`}
    >
      <div className={`bg-[#2A2D3A] p-6 rounded-lg hover:bg-[#353849] transition-colors ${
        animate ? 'animate-shake bg-[#DA1333]' : ''
      }`}>
        <div className="flex items-center mb-4">
          <div className="cursor-pointer" onClick={() => router.push(`/${project.type !== 'tool' ? 'projects' : 'resources'}/${encodeURIComponent(project.name.toLowerCase().replaceAll('.', '-').replaceAll(' ', '-'))}`)}>
            <Image 
              src={project.profileImage} 
              alt={project.name} 
              width={50} 
              height={50} 
              className="rounded-full"
              unoptimized={project.profileImage.startsWith('http')}
            />
            <h3 className="ml-4 text-xl font-semibold text-white">{project.name}</h3>
          </div>
        </div>
        <p className="text-gray-400 mb-4">{project.description}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.map((tag, index) => (
            <span 
              key={index} 
              className="bg-[#1FD978] text-primary text-xs px-2 py-1 cursor-pointer"
              onClick={(e) => handleTagClick(e, tag)}
            >
              {tag}
            </span>
          ))}
          {project.blockchain && Array.isArray(project.blockchain) && project.blockchain.map((chain, index) => (
            <span 
              key={index} 
              className="bg-[#4A5568] text-white text-xs px-2 py-1 cursor-pointer hover:bg-gray-600"
              onClick={(e) => handleBlockchainClick(e, chain)}
            >
              {chain}
            </span>
          ))}
          {project.blockchain && !Array.isArray(project.blockchain) && (
            <span 
              className="bg-[#4A5568] text-white text-xs px-2 py-1 cursor-pointer hover:bg-gray-600"
              onClick={(e) => handleBlockchainClick(e, project.blockchain as string)}
            >
              {project.blockchain}
            </span>
          )}
        </div>
        <div className="flex space-x-4 mb-4">
          {project.twitter && (
            <a 
              href={`https://twitter.com/${project.twitter}`} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-[#9DC4F8] hover:text-[#1FD978]"
              onClick={(e) => e.stopPropagation()}
            >
              <Twitter size={20} />
            </a>
          )}
          {project.url && (
            <a 
              href={project.url} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-[#9DC4F8] hover:text-[#1FD978]"
              onClick={(e) => e.stopPropagation()}
            >
              <Globe size={20} />
            </a>
          )}
          {project.chatLink && (
            <a 
              href={project.chatLink} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-[#9DC4F8] hover:text-[#1FD978]"
              onClick={(e) => e.stopPropagation()}
            >
              <MessageCircle size={20} />
            </a>
          )}
        </div>
        <button
          onClick={handleMoreInfoClick}
          className="text-white hover:underline focus:outline-none"
        >
          {showMore ? 'Less Info' : 'More Info'}
        </button>
        {showMore && (
          <div className="mt-4 text-sm text-[#9DA3AE]">
            {project.tvl && <p>TVL: {project.tvl}</p>}
            {project.github && (
              <p>
                GitHub:{' '}
                <a 
                  href={project.github} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-[#9DC4F8] hover:underline"
                  onClick={(e) => e.stopPropagation()}
                >
                  {project.github}
                </a>
              </p>
            )}
            {project.contracts && project.contracts.length > 0 && (
              <div className="mt-2">
                <p className="font-medium">Contracts:</p>
                {project.contracts.map((contract, index) => (
                  <a 
                    key={index}
                    href={getExplorerUrl(contract.chain, contract.address)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#9DC4F8] hover:underline block"
                  >
                    {contract.type} on {contract.chain}
                  </a>
                ))}
              </div>
            )}
            {project.tokens && project.tokens.length > 0 && (
              <div className="mt-2">
                <p className="font-medium">Tokens:</p>
                {project.tokens.map((token, index) => (
                  <a 
                    key={index}
                    href={getExplorerUrl(token.chain, token.address, 'token')}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#9DC4F8] hover:underline block"
                  >
                    {token.symbol} on {token.chain}
                  </a>
                ))}
              </div>
            )}
            <p className="mt-2">Relation to AMERICA FIRST ECOSYSTEM: {project.relation}</p>
          </div>
        )}
      </div>
    </Link>
  )
}

