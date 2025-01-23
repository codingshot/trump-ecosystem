import { useState } from 'react'
import Image from 'next/image'
import { Twitter, Globe, MessageCircle } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

interface Resource {
  name: string;
  description: string;
  tags: string[];
  twitter?: string;
  url?: string;
  chatLink?: string;
  profileImage?: string;
  blockchain?: string | string[];
  relation?: string;
  type?: string;
}

export function ResourceCard({ resource }: { resource: Resource }) {
  const [showMore, setShowMore] = useState(false)
  const router = useRouter()

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
    <div className="bg-[#2A2D3A] p-6 rounded-lg hover:bg-[#353849] transition-colors">
      <div className="flex items-center mb-4">
        {resource.profileImage && (
          <Image
            src={resource.profileImage}
            alt={resource.name}
            width={50}
            height={50}
            className="rounded-full"
          />
        )}
        <h3 className="ml-4 text-xl font-semibold text-white">{resource.name}</h3>
      </div>
      <p className="text-gray-400 mb-4">{resource.description}</p>
      <div className="flex flex-wrap gap-2 mb-4">
        {resource.tags.map((tag, index) => (
          <span 
            key={index} 
            className="bg-[#1FD978] text-primary text-xs px-2 py-1 cursor-pointer"
            onClick={(e) => handleTagClick(e, tag)}
          >
            {tag}
          </span>
        ))}
      </div>
      <div className="flex space-x-4 mb-4">
        {resource.twitter && (
          <a href={resource.twitter} target="_blank" rel="noopener noreferrer" className="text-[#9DC4F8] hover:text-[#1FD978]">
            <Twitter size={20} />
          </a>
        )}
        {resource.url && (
          <a href={resource.url} target="_blank" rel="noopener noreferrer" className="text-[#9DC4F8] hover:text-[#1FD978]">
            <Globe size={20} />
          </a>
        )}
        {resource.chatLink && (
          <a href={resource.chatLink} target="_blank" rel="noopener noreferrer" className="text-[#9DC4F8] hover:text-[#1FD978]">
            <MessageCircle size={20} />
          </a>
        )}
      </div>
      <button onClick={handleMoreInfoClick} className="text-white hover:underline">
        {showMore ? 'Less Info' : 'More Info'}
      </button>
      {showMore && (
        <div className="mt-4 text-sm text-[#9DA3AE]">
          <p>Relation: {resource.relation}</p>
          {resource.blockchain && (
            <p>Blockchain: {Array.isArray(resource.blockchain) ? resource.blockchain.join(', ') : resource.blockchain}</p>
          )}
        </div>
      )}
    </div>
  )
} 