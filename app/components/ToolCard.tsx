import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Twitter, Globe, MessageCircle } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

interface Tool {
  name: string;
  twitter: string;
  description: string;
  url: string;
  chatLink: string;
  profileImage: string;
  tags: string[];
  blockchain?: string | string[];
  relation: string;
}

export function ToolCard({ tool }: { tool: Tool }) {
  const [showMore, setShowMore] = useState(false)
  const [animate, setAnimate] = useState(false)
  const router = useRouter()

  useEffect(() => {
    setAnimate(true)
    const timer = setTimeout(() => setAnimate(false), 500)
    return () => clearTimeout(timer)
  }, [])

  const handleMoreInfoClick = (e: React.MouseEvent) => {
    e.preventDefault()
    setShowMore(!showMore)
  }

  const handleTagClick = (e: React.MouseEvent, tag: string) => {
    e.preventDefault()
    e.stopPropagation()
    router.push(`/?tags=${encodeURIComponent(tag)}`)
  }

  const handleBlockchainClick = (e: React.MouseEvent, blockchain: string) => {
    e.preventDefault()
    e.stopPropagation()
    router.push(`/?blockchains=${encodeURIComponent(blockchain)}`)
  }

  return (
    <div className={`bg-[#2A2D3A] overflow-hidden shadow-lg transition-all duration-300 hover:border hover:border-white ${
      animate ? 'animate-shake bg-yellow-400' : ''
    }`}>
      <div className="p-4">
        <Link href={`/tools/${encodeURIComponent(tool.name.toLowerCase().replaceAll('.', '-').replaceAll(' ', '-'))}`}>
          <div className="cursor-pointer">
            <div className="flex items-center mb-4">
              <Image 
                src={tool.profileImage} 
                alt={tool.name} 
                width={50} 
                height={50} 
                className="rounded-full"
                unoptimized={tool.profileImage.startsWith('http')}
              />
              <h3 className="ml-4 text-lg font-medium">{tool.name}</h3>
            </div>
            <p className="text-sm text-[#9DA3AE] mb-4">{tool.description}</p>
          </div>
        </Link>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {tool.tags.map((tag, index) => (
            <span 
              key={index} 
              className="bg-[#1FD978] text-primary text-xs px-2 py-1 cursor-pointer hover:bg-green-400"
              onClick={(e) => handleTagClick(e, tag)}
            >
              {tag}
            </span>
          ))}
          {tool.blockchain && (
            <span 
              className="bg-[#4A5568] text-white text-xs px-2 py-1 cursor-pointer hover:bg-gray-600"
              onClick={(e) => handleBlockchainClick(e, Array.isArray(tool.blockchain) 
                ? tool.blockchain[0] 
                : tool.blockchain)}
            >
              {Array.isArray(tool.blockchain) 
                ? tool.blockchain.join(', ') 
                : tool.blockchain}
            </span>
          )}
        </div>
        <div className="flex space-x-4 mb-4">
          {tool.twitter && (
            <a 
              href={`https://twitter.com/${tool.twitter}`} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-[#9DC4F8] hover:text-[#1FD978]"
              onClick={(e) => e.stopPropagation()}
            >
              <Twitter size={20} />
            </a>
          )}
          {tool.url && (
            <a 
              href={tool.url} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-[#9DC4F8] hover:text-[#1FD978]"
              onClick={(e) => e.stopPropagation()}
            >
              <Globe size={20} />
            </a>
          )}
          {tool.chatLink && (
            <a 
              href={tool.chatLink} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-[#9DC4F8] hover:text-[#1FD978]"
              onClick={(e) => e.stopPropagation()}
            >
              <MessageCircle size={20} />
            </a>
          )}
        </div>
      </div>
    </div>
  )
} 