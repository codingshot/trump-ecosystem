'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Twitter, Globe, MessageCircle } from 'lucide-react'

interface Project {
  name: string
  twitter: string
  description: string
  url: string
  chatLink: string
  profileImage: string
  tags: string[]
  blockchain?: string
  tvl?: string
  github?: string
  contractAddress?: string
  relation: string
}

export function ProjectCard({ project }: { project: Project }) {
  const [showMore, setShowMore] = useState(false)
  const [animate, setAnimate] = useState(false)

  useEffect(() => {
    setAnimate(true)
    const timer = setTimeout(() => setAnimate(false), 500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className={`bg-[#2A2D3A] overflow-hidden shadow-lg transition-all duration-300 hover:border hover:border-white ${
      animate ? 'animate-shake bg-yellow-400' : ''
    }`}>
      <div className="p-4">
        <div className="flex items-center mb-4">
          <Image src={project.profileImage} alt={project.name} width={50} height={50} className="rounded-full" />
          <h3 className="ml-4 text-lg font-medium">{project.name}</h3>
        </div>
        <p className="text-sm text-[#9DA3AE] mb-4">{project.description}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.map((tag, index) => (
            <span key={index} className="bg-[#1FD978] text-primary text-xs px-2 py-1">
              {tag}
            </span>
          ))}
        </div>
        <div className="flex space-x-4 mb-4">
          <a href={`https://twitter.com/${project.twitter}`} target="_blank" rel="noopener noreferrer" className="text-[#9DC4F8] hover:text-[#1FD978]">
            <Twitter size={20} />
          </a>
          <a href={project.url} target="_blank" rel="noopener noreferrer" className="text-[#9DC4F8] hover:text-[#1FD978]">
            <Globe size={20} />
          </a>
          <a href={project.chatLink} target="_blank" rel="noopener noreferrer" className="text-[#9DC4F8] hover:text-[#1FD978]">
            <MessageCircle size={20} />
          </a>
        </div>
        <button
          onClick={() => setShowMore(!showMore)}
          className="text-[#1FD978] hover:underline focus:outline-none"
        >
          {showMore ? 'Less Info' : 'More Info'}
        </button>
        {showMore && (
          <div className="mt-4 text-sm text-[#9DA3AE]">
            {project.blockchain && <p>Blockchain: {project.blockchain}</p>}
            {project.tvl && <p>TVL: {project.tvl}</p>}
            {project.github && (
              <p>
                GitHub:{' '}
                <a href={project.github} target="_blank" rel="noopener noreferrer" className="text-[#9DC4F8] hover:underline">
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

