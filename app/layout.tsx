import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { JsonLd } from './components/JsonLd'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL('https://awesomepump.fun'),
  title: {
    default: 'Awesome Pump | Pump.fun Ecosystem Explorer & Tools Directory',
    template: '%s | Awesome Pump'
  },
  description: 'Comprehensive directory of pump.fun ecosystem projects, tools, forks, and innovations across Solana, Base, NEAR, and more. Explore DeFi tools, analytics platforms, and meme coin launchpads.',
  keywords: 'pump.fun, ecosystem, blockchain, defi, meme coins, bonding curves, uptos, meme.cooking, solana defi, pumpfun, das.fun, time.fun, movepump, etherfun, rug.fun, ethervista, internosaur, dexscreener, raydium, rugcheck, solana meme coins, base defi, near defi, token launchpad',
  authors: [{ name: 'Potluck Labs' }, { name: 'Plug Rel' }],
  category: 'DeFi',
  openGraph: {
    type: 'website',
    title: 'Awesome Pump | Pump.fun Ecosystem Explorer',
    description: 'Your intro to the [trenches] tooling, copy cats, forks, and innovations in the pump.fun ecosystem',
    url: 'https://awesomepump.fun',
    siteName: 'Awesome Pump',
    locale: 'en_US',
    images: [
      {
        url: 'https://awesomepump.fun/meta.jpg',
        width: 1200,
        height: 630,
        alt: 'Awesome Pump - Pump.fun Ecosystem Explorer',
        type: 'image/jpeg',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@awesomepump',
    creator: '@potlucklabs',
    title: 'Awesome Pump | Pump.fun Ecosystem Explorer',
    description: 'Your intro to the [trenches] tooling, copy cats, forks, and innovations in the pump.fun ecosystem',
    images: {
      url: 'https://awesomepump.fun/meta.jpg',
      alt: 'Awesome Pump - Pump.fun Ecosystem Explorer'
    }
  },
  alternates: {
    canonical: 'https://awesomepump.fun',
    languages: {
      'en-US': 'https://awesomepump.fun'
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

