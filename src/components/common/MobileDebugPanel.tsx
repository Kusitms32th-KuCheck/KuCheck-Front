// components/common/MobileDebugPanel.tsx
'use client'

import { useState } from 'react'
import { DebugLog, useDebugStore } from '@/store/member/debugStore'

export default function MobileDebugPanel() {
  const { logs, isDebugOpen, toggleDebug, clearLogs } = useDebugStore()
  const [autoScroll, setAutoScroll] = useState(true)

  if (!isDebugOpen) {
    return (
      <button
        onClick={toggleDebug}
        className="fixed bottom-20 right-4 z-[999] bg-red-500 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-xs hover:bg-red-600"
        title="디버그 패널 열기"
      >
        🐛 {logs.filter((l) => l.type === 'error').length}
      </button>
    )
  }

  const errorCount = logs.filter((l) => l.type === 'error').length

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[999] bg-gray-900 text-white rounded-t-lg shadow-2xl max-h-96 flex flex-col">
      {/* 헤더 */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-700 sticky top-0 bg-gray-900">
        <div className="flex items-center gap-2">
          <span className="text-lg">🐛 디버그 패널</span>
          <span className="text-xs bg-red-600 px-2 py-1 rounded">에러 {errorCount}</span>
        </div>
        <div className="flex items-center gap-2">
          <label className="text-xs flex items-center gap-1 cursor-pointer">
            <input
              type="checkbox"
              checked={autoScroll}
              onChange={(e) => setAutoScroll(e.target.checked)}
              className="w-3 h-3"
            />
            Auto Scroll
          </label>
          <button
            onClick={clearLogs}
            className="text-xs bg-gray-700 hover:bg-gray-600 px-2 py-1 rounded"
          >
            Clear
          </button>
          <button
            onClick={toggleDebug}
            className="text-xs bg-gray-700 hover:bg-gray-600 px-2 py-1 rounded"
          >
            닫기
          </button>
        </div>
      </div>

      {/* 로그 목록 */}
      <div className="overflow-y-auto flex-1 font-mono text-xs space-y-1 p-3">
        {logs.length === 0 ? (
          <div className="text-gray-500">로그 없음</div>
        ) : (
          logs.map((log) => (
            <LogItem key={log.id} log={log} />
          ))
        )}
      </div>
    </div>
  )
}

function LogItem({ log }: { log: DebugLog }) {
  const [expanded, setExpanded] = useState(false)

  const typeColors = {
    error: 'text-red-400',
    warn: 'text-yellow-400',
    info: 'text-blue-400',
    log: 'text-gray-400',
  }

  const typeIcons = {
    error: '❌',
    warn: '⚠️',
    info: 'ℹ️',
    log: '📝',
  }

  const time = new Date(log.timestamp).toLocaleTimeString()

  // ✅ details를 문자열로 변환
  const detailsText = typeof log.details === 'string' ? log.details : log.details ? JSON.stringify(log.details, null, 2) : undefined

  return (
    <div className="border-l-2 border-gray-700 pl-2 py-1">
      <button
        onClick={() => setExpanded(!expanded)}
        className={`w-full text-left ${typeColors[log.type]} hover:bg-gray-800 px-2 py-1 rounded`}
      >
        <span className="mr-1">{typeIcons[log.type]}</span>
        <span className="text-gray-500">[{time}]</span>
        <span className="ml-2">{log.message}</span>
        {detailsText && <span className="ml-1 text-gray-600">▼</span>}
      </button>

      {expanded && detailsText && (
        <div className="bg-gray-800 text-gray-300 p-2 mt-1 rounded text-xs whitespace-pre-wrap break-words max-h-40 overflow-y-auto">
          {detailsText}
        </div>
      )}
    </div>
  )
}
