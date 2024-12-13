import Link from 'next/link'
import { SearchIcon, Github } from 'lucide-react'

export function Header({ onSearchClick }: { onSearchClick: () => void }) {
  return (
    <header className="bg-primary py-4">
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <span className="text-2xl mr-2">💊</span>
          <span className="text-lg font-medium">awesome pump</span>
        </Link>
        <button
          onClick={onSearchClick}
          className="text-white hover:text-green-300 focus:outline-none"
        >
          <SearchIcon className="w-6 h-6" />
        </button>
        <div className="flex items-center space-x-4">
          <a
            href="https://github.com/PotLock/awesome-pump"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-green-300"
          >
            <Github className="w-6 h-6" />
          </a>
          <a
            href="https://github.com/PotLock/awesome-pump"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#1FD978] text-primary px-4 py-2 hover:bg-green-400 focus:outline-none focus:ring-2 focus:ring-green-300"
          >
            Submit Project
          </a>
        </div>
      </div>
    </header>
  )
}

