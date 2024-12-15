export const DEFAULT_METADATA = {
  title: 'Awesome Pump | Pump.fun Ecosystem Explorer',
  description: 'Comprehensive directory of pump.fun ecosystem projects and tools',
  image: 'https://awesomepump.fun/meta.jpg',
  type: 'website',
  siteName: 'Awesome Pump',
  twitterHandle: '@awesomepump',
  locale: 'en_US'
}

export function generateMetaTags(customMeta = {}) {
  const meta = {
    ...DEFAULT_METADATA,
    ...customMeta
  }

  return {
    title: meta.title,
    description: meta.description,
    openGraph: {
      title: meta.title,
      description: meta.description,
      type: meta.type,
      site_name: meta.siteName,
      images: [
        {
          url: meta.image,
          width: 1200,
          height: 630,
          alt: meta.title,
        },
      ],
    },
    twitter: {
      handle: meta.twitterHandle,
      site: meta.twitterHandle,
      cardType: 'summary_large_image',
    },
  }
} 