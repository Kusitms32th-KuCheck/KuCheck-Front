'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

const GA_ID = process.env.NEXT_PUBLIC_GA_ID

declare global {
  interface Window {
    gtag: (...args: any[]) => void
  }
}

export default function GATracker() {
  const pathname = usePathname()

  useEffect(() => {
    // 페이지 변경 시 GA에 페이지뷰 전송
    if (typeof window.gtag === 'function') {
      window.gtag('config', GA_ID, {
        page_path: pathname,
      })
    }

    // 🧭 스크롤 추적용 코드
    let maxScrollRatio = 0
    let ticking = false

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollTop = window.scrollY
          const totalHeight = document.body.scrollHeight - window.innerHeight
          const currentRatio = scrollTop / totalHeight

          if (currentRatio > maxScrollRatio) {
            maxScrollRatio = currentRatio

            if (typeof window.gtag === 'function') {
              window.gtag('event', 'max_scroll_ratio', {
                event_category: 'Scroll',
                event_label: 'Max Scroll Ratio',
                value: Math.floor(maxScrollRatio * 100), // 예: 34%
              })
            }
          }

          ticking = false
        })

        ticking = true
      }
    }

    window.addEventListener('scroll', onScroll)

    return () => {
      window.removeEventListener('scroll', onScroll)
    }
  }, [pathname])

  return null
}
