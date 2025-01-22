export function JsonLd() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Trump Ecosystem",
    "description": "Directory of $TRUMP ecosystem projects and tools",
    "url": "https://trumpecosystem.fun",
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://trumpecosystem.com/search?q={search_term_string}"
      },
      "query-input": "required name=search_term_string"
    },
    "publisher": {
      "@type": "Organization",
      "name": "TRUMP ECOSYSTEM",
      "logo": {
        "@type": "ImageObject",
        "url": "https://trumpecosystem.com/logo.png"
      }
    },
    "sameAs": [
      "https://twitter.com/trumpacc",
      "https://github.com/codingshot/trump-ecosystem"
    ]
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
} 