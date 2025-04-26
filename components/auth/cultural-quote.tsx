"use client"

import { useState, useEffect } from "react"

const quotes = [
  {
    text: "Knowledge is like a garden; if it is not cultivated, it cannot be harvested.",
    origin: "Ghanaian Proverb",
  },
  {
    text: "The ruin of a nation begins in the homes of its people.",
    origin: "Ashanti Proverb",
  },
  {
    text: "When a king has good counselors, his reign is peaceful.",
    origin: "Ghanaian Proverb",
  },
  {
    text: "It is the calm and silent water that drowns a man.",
    origin: "Ghanaian Proverb",
  },
  {
    text: "Unity is strength, division is weakness.",
    origin: "Swahili Proverb",
  },
  {
    text: "Wisdom is not like money to be tied up and hidden.",
    origin: "Akan Proverb",
  },
]

export function CulturalQuote() {
  const [quoteIndex, setQuoteIndex] = useState(0)
  const [fadeIn, setFadeIn] = useState(true)

  useEffect(() => {
    const intervalId = setInterval(() => {
      setFadeIn(false)

      setTimeout(() => {
        setQuoteIndex((prevIndex) => (prevIndex + 1) % quotes.length)
        setFadeIn(true)
      }, 500)
    }, 10000)

    return () => clearInterval(intervalId)
  }, [])

  const currentQuote = quotes[quoteIndex]

  return (
    <div
      className={`text-white text-center mb-6 transition-opacity duration-500 ${fadeIn ? "opacity-100" : "opacity-0"}`}
    >
      <p className="text-lg italic mb-1">"{currentQuote.text}"</p>
      <p className="text-sm text-white/80">— {currentQuote.origin}</p>
    </div>
  )
}
