import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Kindness Tracker – Worksheet for Kids',
  description: 'A playful kindness tracker app for kids. Color a flower for every act of kindness! Fun, interactive, and perfect for classrooms or families.',
  generator: 'v0.dev',
  openGraph: {
    title: 'Kindness Tracker – Worksheet for Kids',
    description: 'A playful kindness tracker app for kids. Color a flower for every act of kindness! Fun, interactive, and perfect for classrooms or families.',
    url: 'https://your-kindness-tracker-url.com',
    siteName: 'Kindness Tracker',
    images: [
      {
        url: 'https://your-kindness-tracker-url.com/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Kindness Tracker worksheet screenshot',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kindness Tracker – Worksheet for Kids',
    description: 'A playful kindness tracker app for kids. Color a flower for every act of kindness! Fun, interactive, and perfect for classrooms or families.',
    images: ['https://your-kindness-tracker-url.com/og-image.png'],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body>{children}</body>
    </html>
  )
}
