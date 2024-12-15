import type { Metadata } from 'next'
import toolsData from '../../data/tools.json'

export async function generateMetadata({ params }: { params: { name: string } }): Promise<Metadata> {
  const tool = toolsData.find(t => 
    t.name.toLowerCase().replaceAll('.', '-').replaceAll(' ', '-') === decodeURIComponent(params.name)
  )

  if (!tool) {
    return {
      title: 'Tool Not Found | Awesome Pump',
      description: 'The requested tool could not be found in the Pump.fun ecosystem.',
    }
  }

  return {
    title: `${tool.name} | Awesome Pump Tools`,
    description: tool.description + ' | Awesome Pump is the pump fun ecosystem explorer',
    openGraph: {
      title: tool.name + ' | Awesome Pump Tools',
      description: tool.description + ' | Awesome Pump is the pump fun ecosystem explorer',
      url: `https://awesomepump.fun/tools/${params.name}`,
      siteName: 'Awesome Pump',
      images: [
        {
          url: 'https://awesomepump.fun/meta.jpg',
          width: 1200,
          height: 630,
        },
      ],
      locale: 'en-US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: tool.name + ' | Awesome Pump Tools',
      description: tool.description + ' | Awesome Pump is the pump fun ecosystem explorer',
      images: ['https://awesomepump.fun/meta.jpg'],
    },
  }
}

export default function ToolLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
} 