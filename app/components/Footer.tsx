import Link from 'next/link'
import { Github } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-primary py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-[#9DA3AE]">
              Made with ❤️ by{' '}
              <a href="https://trumpecosyste,com" target="_blank" rel="noopener noreferrer" className="text-[#DA1333] hover:underline">
                AMERICA FIRST. 
              </a>
            </p>
          </div>
          <div>
          <a
            href="https://github.com/codingshot/trump-ecosystem"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-green-300"
          >
            <Github className="w-6 h-6" />
          </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

