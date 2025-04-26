"use client"

import { useEffect, useState } from "react"

export function useMediaQuery() {
  const [isSmall, setIsSmall] = useState(false)
  const [isMedium, setIsMedium] = useState(false)
  const [isLarge, setIsLarge] = useState(false)
  const [isExtralarge, setIsExtralarge] = useState(false)

  useEffect(() => {
    const smallMediaQuery = window.matchMedia("(min-width: 640px)")
    const mediumMediaQuery = window.matchMedia("(min-width: 768px)")
    const largeMediaQuery = window.matchMedia("(min-width: 1024px)")
    const extraLargeMediaQuery = window.matchMedia("(min-width: 1280px)")

    const handleSmallChange = (e: MediaQueryListEvent) => setIsSmall(e.matches)
    const handleMediumChange = (e: MediaQueryListEvent) => setIsMedium(e.matches)
    const handleLargeChange = (e: MediaQueryListEvent) => setIsLarge(e.matches)
    const handleExtraLargeChange = (e: MediaQueryListEvent) => setIsExtralarge(e.matches)

    // Set initial values
    setIsSmall(smallMediaQuery.matches)
    setIsMedium(mediumMediaQuery.matches)
    setIsLarge(largeMediaQuery.matches)
    setIsExtralarge(extraLargeMediaQuery.matches)

    // Listen for changes
    smallMediaQuery.addEventListener("change", handleSmallChange)
    mediumMediaQuery.addEventListener("change", handleMediumChange)
    largeMediaQuery.addEventListener("change", handleLargeChange)
    extraLargeMediaQuery.addEventListener("change", handleExtraLargeChange)

    // Clean up
    return () => {
      smallMediaQuery.removeEventListener("change", handleSmallChange)
      mediumMediaQuery.removeEventListener("change", handleMediumChange)
      largeMediaQuery.removeEventListener("change", handleLargeChange)
      extraLargeMediaQuery.removeEventListener("change", handleExtraLargeChange)
    }
  }, [])

  return { isSmall, isMedium, isLarge, isExtralarge }
}
