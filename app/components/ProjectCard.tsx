'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Twitter, Globe, MessageCircle } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

interface Project {
  name: string
  twitter: string
  description: string
  url: string
  chatLink: string
  profileImage: string
  tags: string[]
  blockchain?: string | string[]
  tvl?: string
  github?: string
  contractAddress?: string
  relation: string
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
    router.push(`/?q=${encodeURIComponent(tag)}`)
  }

  return (
    <div className={`bg-[#2A2D3A] overflow-hidden shadow-lg transition-all duration-300 hover:border hover:border-white ${
      animate ? 'animate-shake bg-yellow-400' : ''
    }`}>
      <div className="p-4">
        <Link href={`/projects/${encodeURIComponent(project.name.toLowerCase().replaceAll('.', '-').replaceAll(' ', '-'))}`}>
          <div className="cursor-pointer">
            <div className="flex items-center mb-4">
              <Image 
                src={project.profileImage} 
                alt={project.name} 
                width={50} 
                height={50} 
                className="rounded-full"
                unoptimized={project.profileImage.startsWith('http')}
              />
              <h3 className="ml-4 text-lg font-medium">{project.name}</h3>
            </div>
            <p className="text-sm text-[#9DA3AE] mb-4">{project.description}</p>
          </div>
        </Link>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.map((tag, index) => (
            <span 
              key={index} 
              className="bg-[#1FD978] text-primary text-xs px-2 py-1 cursor-pointer hover:bg-green-400"
              onClick={(e) => handleTagClick(e, tag)}
            >
              {tag}
            </span>
          ))}
          {project.blockchain && (
            <span className="bg-[#4A5568] text-white text-xs px-2 py-1">
              {Array.isArray(project.blockchain) 
                ? project.blockchain.join(', ') 
                : project.blockchain}
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
          className="text-[#1FD978] hover:underline focus:outline-none"
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
            {project.contractAddress && <p>Contract Address: {project.contractAddress}</p>}
            <p className="mt-2">Relation to Pump.fun: {project.relation}</p>
          </div>
        )}
      </div>
    </div>
  )
}

