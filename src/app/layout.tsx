import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import localFont from 'next/font/local'
import './globals.css'
import QueryClientComponent from '@/components/member/common/QueryClient'
import ToastContainer from '@/components/member/common/toast/ToastContainer'
import { ToastProvider } from '@/components/member/common/toast/ToastContext'
import Script from 'next/script'

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
  const mazeApiKey = process.env.NEXT_PUBLIC_MAZE_API_KEY

  return (
    <html lang="en" className={pretendard.className}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
      </head>
      <Script
        id="maze-snippet"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `(function (m, a, z, e) {
              var s, t, u, v;
              try {
                t = m.sessionStorage.getItem('maze-us');
              } catch (err) {}
              if (!t) {
                t = new Date().getTime();
                try {
                  m.sessionStorage.setItem('maze-us', t);
                } catch (err) {}
              }
              u = document.currentScript || (function () {
                var w = document.getElementsByTagName('script');
                return w[w.length - 1];
              })();
              v = u && u.nonce;
              s = a.createElement('script');
              s.src = z + '?apiKey=' + e;
              s.async = true;
              if (v) s.setAttribute('nonce', v);
              a.getElementsByTagName('head')[0].appendChild(s);
              m.mazeUniversalSnippetApiKey = e;
            })(window, document, 'https://snippet.maze.co/maze-universal-loader.js', '${mazeApiKey}');`,
        }}
      />
      <body className={`${geistSans.variable} ${geistMono.variable} ${pretendard.variable} antialiased`}>
        <QueryClientComponent>
          <ToastProvider>
            {children}
            <ToastContainer />
          </ToastProvider>
        </QueryClientComponent>
      </body>
    </html>
  )
}
