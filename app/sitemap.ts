import { MetadataRoute } from 'next'
import projectsData from './data/projects.json'
import toolsData from './data/tools.json'

export default function sitemap(): MetadataRoute.Sitemap {
  const projects = projectsData.map(project => ({
    url: `https://awesomepump.fun/projects/${project.name.toLowerCase().replaceAll('.', '-').replaceAll(' ', '-')}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.8,
  }))

  return [
    {
      url: 'https://awesomepump.fun',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    ...projects,
  ]
}
