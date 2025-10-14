import { useCallback, useEffect, useRef, useState } from "react"

type Options = {
  // Bottom padding from viewport
  bottomGap?: number
}

export function useScrollAreaHeight({ bottomGap = 16 }: Options = {}) {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const [height, setHeight] = useState<number>(0)

  const measure = useCallback(() => {
    const el = containerRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const available = window.innerHeight - rect.top - bottomGap
    setHeight(Math.max(0, Math.floor(available)))
  }, [bottomGap])

  useEffect(() => {
    measure()
    const onResize = () => measure()
    window.addEventListener('resize', onResize)
    window.addEventListener('orientationchange', onResize)
    const t = setTimeout(measure, 0)
    return () => {
      clearTimeout(t)
      window.removeEventListener('resize', onResize)
      window.removeEventListener('orientationchange', onResize)
    }
  }, [measure])

  return { ref: containerRef, height, measure }
}


