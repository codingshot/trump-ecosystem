import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { JsonLd } from './components/JsonLd'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL('https://trumpecosystem.fun'),
  title: {
    default: 'Trump Ecosystem | $TRUMP Ecosystem Explorer & Tools Directory',
    template: '%s | Trump Ecosystem'
  },
  description: 'Comprehensive directory of $TRUMP ecosystem projects, tools, forks, and innovations across Solana, Base, NEAR, and more. Explore DeFi tools, analytics platforms, and meme coin launchpads.',
  keywords: 'AMERICA FIRST ECOSYSTEM, ecosystem, blockchain, defi, meme coins, bonding curves, uptos, meme.cooking, solana defi, pumpfun, das.fun, time.fun, movepump, etherfun, rug.fun, ethervista, internosaur, dexscreener, raydium, rugcheck, solana meme coins, base defi, near defi, token launchpad',
  authors: [{ name: 'TRUMP ECOSYSTEM' }, { name: 'Plug Rel' }],
  category: 'DeFi',
  openGraph: {
    type: 'website',
    title: 'Trump Ecosystem| AMERICA FIRST ECOSYSTEM Ecosystem Explorer',
    description: 'Your intro to to the AMERICA FIRST CRYPTO ECOSYSTEM',
    url: 'https://trumpecosystem.com',
    siteName: 'Trump Ecosystem',
    locale: 'en_US',
    images: [
      {
        url: 'https://trumpecosystem.com/meta.jpg',
        width: 1200,
        height: 630,
        alt: 'Trump Ecosystem - AMERICA FIRST ECOSYSTEM Ecosystem Explorer',
        type: 'image/jpeg',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@awesomepump',
    creator: '@potlucklabs',
    title: 'Trump Ecosystem | AMERICA FIRST ECOSYSTEM Ecosystem Explorer',
    description: 'tro to to the AMERICA FIRST CRYPTO ECOSYSTEM',
    images: {
      url: 'https://trumpecosystem.com/meta.jpg',
      alt: 'Trump Ecosystem - AMERICA FIRST ECOSYSTEM Ecosystem Explorer'
    }
  },
  alternates: {
    canonical: 'https://trumpecosystem.com',
    languages: {
      'en-US': 'https://trumpecosystem.com'
    }
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-site-verification',
    yandex: 'your-yandex-verification',
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <JsonLd />
        {children}
      </body>
    </html>
  )
}

