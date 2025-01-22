import type { Metadata } from 'next'
import projectsData from '../../data/projects.json'

export async function generateMetadata({ params }: { params: { name: string } }): Promise<Metadata> {
  const project = projectsData.find(p => 
    p.name.toLowerCase().replaceAll('.', '-').replaceAll(' ', '-') === decodeURIComponent(params.name)
  )

  if (!project) {
    return {
      title: 'Project Not Found | Trump Ecosystem',
      description: 'The requested project could not be found in the AMERICA FIRST ECOSYSTEM ecosystem.',
    }
  }

  return {
    title: `${project.name} | Trump Ecosystem`,
    description: project.description + ' | Trump Ecosystem is the pump fun ecosystem explorer',
    openGraph: {
      title: project.name + ' | Trump Ecosystem',
      description: project.description + ' | Trump Ecosystem is the pump fun ecosystem explorer',
      url: `https://trumpecosystem.com/projects/${params.name}`,
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
      title: project.name + ' | Trump Ecosystem',
      description: project.description + ' | Trump Ecosystem is the pump fun ecosystem explorer',
      images: ['https://trumpecosystem.com/meta.jpg'],
    },
  }
}

export default function ProjectLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
