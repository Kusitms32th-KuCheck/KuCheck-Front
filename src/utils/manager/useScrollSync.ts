import { useEffect, useRef, useState } from 'react'

export default function useScrollSync() {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const headerScrollRef = useRef<HTMLDivElement | null>(null)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const container = containerRef.current
    const header = headerScrollRef.current
    if (!container || !header) return

    const onContainerScroll = () => {
      if (header.scrollLeft !== container.scrollLeft) header.scrollLeft = container.scrollLeft
      setIsScrolled(container.scrollTop > 0)
    }

    const onHeaderScroll = () => {
      if (container.scrollLeft !== header.scrollLeft) container.scrollLeft = header.scrollLeft
    }

    container.addEventListener('scroll', onContainerScroll)
    header.addEventListener('scroll', onHeaderScroll)

    onContainerScroll()
    return () => {
      container.removeEventListener('scroll', onContainerScroll)
      header.removeEventListener('scroll', onHeaderScroll)
    }
  }, [])

  return { containerRef, headerScrollRef, isScrolled }
}
