'use client'

import { motion } from 'framer-motion'

const Spinner = () => {
  return (
    <div className="relative h-[100px] w-[100px] rounded-full">
      {/* 4개의 아크 */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1.5, ease: 'linear' }}
        className="absolute inset-0"
      >
        <svg className="h-full w-full" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M90 50A40 40 0 0 0 50 10" stroke="url(#gradient)" strokeWidth="10" strokeLinecap="round" />
          <defs>
            <linearGradient id="gradient" x1="90" y1="50" x2="50" y2="10" gradientUnits="userSpaceOnUse">
              <stop stopColor="#1E90FF" />
              <stop offset="1" stopColor="#1E90FF" stopOpacity="0.1" />
            </linearGradient>
          </defs>
        </svg>
      </motion.div>
    </div>
  )
}

export default Spinner
