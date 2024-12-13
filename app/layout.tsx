import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Awesome Pump',
  description: 'Your intro to the [trenches] tooling, copy cats, forks, and innovations in the pump.fun ecosystem',
  keywords: 'pump.fun, ecosystem, blockchain, defi, meme coins, bonding curves',
  openGraph: {
    title: 'Awesome Pump',
    description: 'Your intro to the [trenches] tooling, copy cats, forks, and innovations in the pump.fun ecosystem',
    url: 'https://awesome-pump.vercel.app',
    siteName: 'Awesome Pump',
    images: [
      {
        url: 'https://awesome-pump.vercel.app/og-image.png',
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
    images: ['https://awesome-pump.vercel.app/og-image.png'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}

