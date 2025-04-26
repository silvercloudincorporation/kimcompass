"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowLeft, Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { AuthCard } from "@/components/auth/auth-card"
import { CulturalQuote } from "@/components/auth/cultural-quote"
import { useToast } from "@/components/ui/use-toast"

export default function TwoFactorPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [code, setCode] = useState(["", "", "", "", "", ""])
  const [timeLeft, setTimeLeft] = useState(60)
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  // Timer countdown
  useEffect(() => {
    if (timeLeft <= 0) return

    const timer = setTimeout(() => {
      setTimeLeft(timeLeft - 1)
    }, 1000)

    return () => clearTimeout(timer)
  }, [timeLeft])

  // Format time as MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const handleInputChange = (index: number, value: string) => {
    if (value.length > 1) {
      value = value.charAt(0)
    }

    // Only allow numbers
    if (value && !/^\d+$/.test(value)) return

    const newCode = [...code]
    newCode[index] = value
    setCode(newCode)

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    // Handle backspace
    if (e.key === "Backspace") {
      if (!code[index] && index > 0) {
        const newCode = [...code]
        newCode[index - 1] = ""
        setCode(newCode)
        inputRefs.current[index - 1]?.focus()
      }
    }
  }

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault()
    const pastedData = e.clipboardData.getData("text")

    // Only process if it looks like a verification code
    if (!/^\d+$/.test(pastedData)) return

    const digits = pastedData.slice(0, 6).split("")
    const newCode = [...code]

    digits.forEach((digit, index) => {
      if (index < 6) {
        newCode[index] = digit
      }
    })

    setCode(newCode)

    // Focus the next empty input or the last input
    const nextEmptyIndex = newCode.findIndex((c) => c === "")
    if (nextEmptyIndex !== -1) {
      inputRefs.current[nextEmptyIndex]?.focus()
    } else {
      inputRefs.current[5]?.focus()
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const verificationCode = code.join("")

    if (verificationCode.length !== 6) {
      toast({
        variant: "destructive",
        title: "Invalid code",
        description: "Please enter all 6 digits of the verification code.",
      })
      return
    }

    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)

      // For demo purposes, any code is accepted
      toast({
        title: "Verification successful",
        description: "You have been successfully authenticated.",
      })
      router.push("/")
    }, 1500)
  }

  const handleResendCode = () => {
    setTimeLeft(60)
    toast({
      title: "Code resent",
      description: "A new verification code has been sent to your email.",
    })
  }

  return (
    <>
      <div className="absolute top-6 left-6 z-20">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-[#0A1931] flex items-center justify-center">
            <span className="text-white font-bold">K</span>
          </div>
          <span className="text-white font-semibold text-xl">KimCompass</span>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <CulturalQuote />

        <AuthCard title="Two-Factor Authentication" description="Enter the 6-digit code sent to your email">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex justify-center gap-2">
              {code.map((digit, index) => (
                <Input
                  key={index}
                  ref={(el) => {
                    inputRefs.current[index] = el;
                  }}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleInputChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  onPaste={index === 0 ? handlePaste : undefined}
                  className="w-10 h-12 text-center text-lg font-medium"
                />
              ))}
            </div>

            <div className="text-center text-sm">
              <p className="text-muted-foreground">
                Code expires in <span className="font-medium">{formatTime(timeLeft)}</span>
              </p>
            </div>

            <Button
              type="submit"
              className="w-full bg-[#0A1931] hover:bg-[#0A1931]/90"
              disabled={isLoading || code.some((digit) => digit === "")}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Verifying...
                </>
              ) : (
                "Verify"
              )}
            </Button>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-sm">
              <Link href="/auth/login" className="text-[#0A1931] hover:underline inline-flex items-center">
                <ArrowLeft className="mr-1 h-3 w-3" />
                Back to login
              </Link>

              <Button
                type="button"
                variant="link"
                className="text-[#0A1931] p-0 h-auto"
                onClick={handleResendCode}
                disabled={timeLeft > 0}
              >
                {timeLeft > 0 ? `Resend code in ${timeLeft}s` : "Resend code"}
              </Button>
            </div>
          </form>
        </AuthCard>
      </div>
    </>
  )
}
