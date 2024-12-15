import type { Metadata } from 'next'
import projectsData from '../../data/projects.json'

export async function generateMetadata({ params }: { params: { name: string } }): Promise<Metadata> {
  const project = projectsData.find(p => 
    p.name.toLowerCase().replaceAll('.', '-').replaceAll(' ', '-') === decodeURIComponent(params.name)
  )

  if (!project) {
    return {
      title: 'Project Not Found | Awesome Pump',
      description: 'The requested project could not be found in the Pump.fun ecosystem.',
    }
  }

  return {
    title: `${project.name} | Awesome Pump`,
    description: project.description + ' | Awesome Pump is the pump fun ecosystem explorer',
    openGraph: {
      title: project.name + ' | Awesome Pump',
      description: project.description + ' | Awesome Pump is the pump fun ecosystem explorer',
      url: `https://awesomepump.fun/projects/${params.name}`,
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
      title: project.name + ' | Awesome Pump',
      description: project.description + ' | Awesome Pump is the pump fun ecosystem explorer',
      images: ['https://awesomepump.fun/meta.jpg'],
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
