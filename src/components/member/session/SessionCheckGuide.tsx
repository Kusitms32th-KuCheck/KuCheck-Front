'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Polygon14Icon } from '@/assets/svgComponents/member'

const BANNER_KEY = 'session_check_guide_viewed'

export default function SessionCheckGuide() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const hasViewed = localStorage.getItem(BANNER_KEY)

    if (hasViewed) {
      return
    }

    // 0.5s 지연 후 배너 표시
    const showTimer = setTimeout(() => {
      setShow(true)
      localStorage.setItem(BANNER_KEY, 'true')
    }, 500)

    const hideTimer = setTimeout(() => {
      setShow(false)
    }, 4500)

    return () => {
      clearTimeout(showTimer)
      clearTimeout(hideTimer)
    }
  }, [])

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="absolute top-22 right-1 z-40 pt-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{
            opacity: 1,
            y: [0, -8, 0], // 둥둥 떠있는 애니메이션
          }}
          exit={{ opacity: 0 }}
          transition={{
            opacity: { duration: 0.18 },
            y: {
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            },
          }}
        >
          <div className="relative py-2">
            <Polygon14Icon className="absolute top-0 right-5" />
            <div className="caption-sm-medium w-full rounded-full bg-gray-800 px-[10px] py-[6px] whitespace-nowrap text-white">
              전체 일정을 확인해 보세요!
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
