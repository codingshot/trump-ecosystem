export function JsonLd() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Awesome Pump",
    "description": "Directory of pump.fun ecosystem projects and tools",
    "url": "https://awesomepump.fun",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://awesomepump.fun/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
} 