// components/providers/QueryClientComponent.tsx
'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactNode } from 'react'

// ✅ 클라이언트 컴포넌트에서만 QueryClient 생성
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5분
      gcTime: 1000 * 60 * 10, // 10분 (이전 cacheTime)
      retry: 1, // 실패 시 1회 재시도
    },
  },
})

export default function QueryClientComponent({ children }: { children: ReactNode }) {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
}
