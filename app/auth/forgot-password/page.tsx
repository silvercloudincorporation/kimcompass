"use client"

import { useState } from "react"
import Link from "next/link"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { ArrowLeft, Loader2, CheckCircle2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { AuthCard } from "@/components/auth/auth-card"
import { CulturalQuote } from "@/components/auth/cultural-quote"

const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
})

export default function ForgotPasswordPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      setIsSubmitted(true)
    }, 1500)
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

        {!isSubmitted ? (
          <AuthCard
            title="Forgot Password"
            description="Enter your email address and we'll send you a link to reset your password"
          >
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="admin@kimcompass.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" className="w-full bg-[#0A1931] hover:bg-[#0A1931]/90" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    "Send Reset Link"
                  )}
                </Button>

                <div className="text-center">
                  <Link
                    href="/auth/login"
                    className="text-sm font-medium text-[#0A1931] hover:underline inline-flex items-center"
                  >
                    <ArrowLeft className="mr-1 h-3 w-3" />
                    Back to login
                  </Link>
                </div>
              </form>
            </Form>
          </AuthCard>
        ) : (
          <AuthCard title="Check Your Email">
            <div className="text-center space-y-4">
              <div className="flex justify-center">
                <CheckCircle2 className="h-12 w-12 text-green-500" />
              </div>
              <p>
                We've sent a password reset link to <span className="font-medium">{form.getValues().email}</span>
              </p>
              <p className="text-sm text-muted-foreground">
                If you don't see the email, check other places it might be, like your junk, spam, social, or other
                folders.
              </p>
              <div className="pt-4">
                <Link href="/auth/login">
                  <Button className="w-full bg-[#0A1931] hover:bg-[#0A1931]/90">Back to Login</Button>
                </Link>
              </div>
            </div>
          </AuthCard>
        )}
      </div>
    </>
  )
}
