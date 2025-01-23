import type { Metadata } from 'next'
import resourcesData from '../../data/resources.json'

export async function generateMetadata({ params }: { params: { name: string } }): Promise<Metadata> {
  const tool = resourcesData.find(t => 
    t.name.toLowerCase().replaceAll('.', '-').replaceAll(' ', '-') === decodeURIComponent(params.name)
  )

  if (!tool) {
    return {
      title: 'Tool Not Found | Trump Ecosystem',
      description: 'The requested tool could not be found in the AMERICA FIRST ECOSYSTEM ecosystem.',
    }
  }

  const faviconUrl = tool.profileImage ? tool.profileImage : 'https://trumpecosystem.com/favicon.ico';

  return {
    title: `${tool.name} | Trump Ecosystem Tools`,
    description: tool.description + ' | Trump Ecosystem is the pump fun ecosystem explorer',
    openGraph: {
      title: tool.name + ' | Trump Ecosystem Tools',
      description: tool.description + ' | Trump Ecosystem is the pump fun ecosystem explorer',
      url: `https://trumpecosystem.com/tools/${params.name}`,
      siteName: 'Trump Ecosystem',
      images: [
        {
          url: 'https://trumpecosystem.com/meta.jpg',
          width: 1200,
          height: 630,
        },
      ],
      locale: 'en-US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: tool.name + ' | Trump Ecosystem Tools',
      description: tool.description + ' | Trump Ecosystem is the pump fun ecosystem explorer',
      images: ['https://trumpecosystem.com/meta.jpg'],
    },
    icons: {
      icon: faviconUrl,
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