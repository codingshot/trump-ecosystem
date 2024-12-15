export function JsonLd() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Awesome Pump",
    "description": "Directory of pump.fun ecosystem projects and tools",
    "url": "https://awesomepump.fun",
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://awesomepump.fun/search?q={search_term_string}"
      },
      "query-input": "required name=search_term_string"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Potluck Labs",
      "logo": {
        "@type": "ImageObject",
        "url": "https://awesomepump.fun/logo.png"
      }
    },
    "sameAs": [
      "https://twitter.com/awesomepump",
      "https://github.com/PotLock/awesome-pump"
    ]
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
} 