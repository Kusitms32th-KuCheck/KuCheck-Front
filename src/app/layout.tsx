import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import localFont from 'next/font/local'
import './globals.css'
import QueryClientComponent from '@/components/member/common/QueryClient'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

const pretendard = localFont({
  src: '../../public/fonts/PretendardVariable.woff2',
  variable: '--font-pretendard',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Ku-Check',
  description: '큐시즘 출석 체크 서비스',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={pretendard.className}>
      <head></head>
      <body className={`${geistSans.variable} ${geistMono.variable} ${pretendard.variable} antialiased`}>
        <QueryClientComponent> {children}</QueryClientComponent>
      </body>
    </html>
  )
}
