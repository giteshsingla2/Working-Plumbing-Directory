import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import '../styles/searchform.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Find Local Plumbing Services',
  description: 'Connect with trusted local plumbing professionals in your area.',
  icons: {
    icon: '/Plumber-Favicon.png',
    apple: '/Plumber-Favicon.png',
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
        <link rel="icon" href="/Plumber-Favicon.png" />
        <link rel="apple-touch-icon" href="/Plumber-Favicon.png" />
      </head>
      <body className={inter.className}>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
