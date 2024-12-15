import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Awesome Pump | Pump.fun Ecosystem Explorer & Tools Directory',
  description: 'Comprehensive directory of pump.fun ecosystem projects, tools, forks, and innovations across Solana, Base, NEAR, and more. Explore DeFi tools, analytics platforms, and meme coin launchpads.',
  keywords: 'pump.fun, ecosystem, blockchain, defi, meme coins, bonding curves, uptos, meme.cooking, solana defi, pumpfun, das.fun, time.fun, movepump, etherfun, rug.fun, ethervista, internosaur, dexscreener, raydium, rugcheck, solana meme coins, base defi, near defi, token launchpad',
  authors: [{ name: 'Potluck Labs' }, { name: 'Plug Rel' }],
  category: 'DeFi',
  openGraph: {
    title: 'Awesome Pump',
    description: 'Your intro to the [trenches] tooling, copy cats, forks, and innovations in the pump.fun ecosystem',
    url: 'https://awesomepump.fun',
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
    title: 'Awesome Pump',
    description: 'Your intro to the [trenches] tooling, copy cats, forks, and innovations in the pump.fun ecosystem',
    images: ['https://awesomepump.fun/meta.jpg'],
  },
  alternates: {
    canonical: 'https://awesomepump.fun'
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#1B1D27" />
        <meta name="msapplication-TileColor" content="#1B1D27" />
        <meta name="theme-color" content="#1B1D27" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}

