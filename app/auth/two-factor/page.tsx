"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowLeft, Shield } from "lucide-react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"

// Form validation schema
const twoFactorSchema = z.object({
  code: z
    .string()
    .min(6, { message: "Code must be 6 digits" })
    .max(6, { message: "Code must be 6 digits" })
    .regex(/^\d+$/, { message: "Code must contain only numbers" }),
})

type TwoFactorFormValues = z.infer<typeof twoFactorSchema>

export default function TwoFactorPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [countdown, setCountdown] = useState(30)
  const [canResend, setCanResend] = useState(false)

  // Initialize form with react-hook-form
  const form = useForm<TwoFactorFormValues>({
    resolver: zodResolver(twoFactorSchema),
    defaultValues: {
      code: "",
    },
  })

  // Countdown timer for resending code
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000)
      return () => clearTimeout(timer)
    } else {
      setCanResend(true)
    }
  }, [countdown])

  // Handle form submission
  const onSubmit = async (data: TwoFactorFormValues) => {
    setIsLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      console.log("Two-factor code:", data.code)

      toast({
        title: "Authentication successful",
        description: "You have been successfully authenticated.",
      })

      // Redirect to dashboard
      router.push("/")
    } catch (error) {
      toast({
        title: "Authentication failed",
        description: "Invalid code. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  // Handle resend code
  const handleResendCode = async () => {
    if (!canResend) return

    setIsLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "Code resent",
        description: "A new verification code has been sent to your email.",
      })

      setCountdown(30)
      setCanResend(false)
    } catch (error) {
      toast({
        title: "Failed to resend code",
        description: "There was a problem sending a new code. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-[#0A1931]">KimCompass</h1>
          <p className="mt-2 text-sm text-gray-600">Admin Dashboard</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Two-Factor Authentication</CardTitle>
            <CardDescription>Enter the verification code sent to your email</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-6 flex justify-center">
              <div className="rounded-full bg-[#0A1931]/10 p-3">
                <Shield className="h-6 w-6 text-[#0A1931]" />
              </div>
            </div>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="code"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Verification Code</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="123456"
                          className="text-center text-lg tracking-widest"
                          maxLength={6}
                          {...field}
                          disabled={isLoading}
                          // Only allow numbers
                          onKeyPress={(e) => {
                            if (!/[0-9]/.test(e.key)) {
                              e.preventDefault()
                            }
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" className="w-full bg-[#0A1931] hover:bg-[#0A1931]/90" disabled={isLoading}>
                  {isLoading ? "Verifying..." : "Verify"}
                </Button>
              </form>
            </Form>

            <div className="mt-4 text-center">
              <p className="text-sm text-muted-foreground">
                Didn't receive a code?{" "}
                <button
                  type="button"
                  onClick={handleResendCode}
                  className={`font-medium ${
                    canResend ? "text-[#0A1931] hover:underline" : "text-muted-foreground cursor-not-allowed"
                  }`}
                  disabled={!canResend || isLoading}
                >
                  {canResend ? "Resend code" : `Resend in ${countdown}s`}
                </button>
              </p>
            </div>
          </CardContent>
          <CardFooter className="flex justify-center border-t p-6">
            <Link href="/auth/login" className="flex items-center text-sm font-medium text-[#0A1931] hover:underline">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to login
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
