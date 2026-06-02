import type { Metadata } from 'next'
import { Cormorant_Garamond, DM_Mono, Syne } from 'next/font/google'
import './globals.css'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '600'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
})

const dmMono = DM_Mono({
  subsets: ['latin'],
  weight: ['300', '400'],
  variable: '--font-dm-mono',
})

const syne = Syne({
  subsets: ['latin'],
  weight: ['400', '700', '800'],
  variable: '--font-syne',
})

export const metadata: Metadata = {
  title: 'Sovereign Social — Drop Your URL. Walk Away.',
  description: 'AI-powered social media content. One URL. Six platforms. Zero effort.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${cormorant.variable} ${dmMono.variable} ${syne.variable}`}>
        {children}
      </body>
    </html>
  )
}
