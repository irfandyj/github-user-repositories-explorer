import { useCallback, useEffect, useRef } from "react"

/**
 * useResponsiveParentHeight is a hook that returns the height of the parent element of the ref
 * It's good when your parent is flex
 * @returns { ref: React.RefObject<HTMLDivElement>, height: number }
 */
export default function useResponsiveParentHeight() {
  const ref = useRef<HTMLDivElement>(null)

  const setCurrentElHeight = useCallback(() => {
    if (ref.current) {
      const currentEl = ref.current
      const parentEl = currentEl.parentElement
      currentEl.style.height = `${parentEl!.clientHeight}px`
    }
  }, [ref.current])

  useEffect(() => {
    setCurrentElHeight()

    window.addEventListener("resize", setCurrentElHeight)
    return () => {
      window.removeEventListener("resize", setCurrentElHeight)
    }
  }, [ref.current])

  return { ref }
}