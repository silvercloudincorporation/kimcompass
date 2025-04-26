import type React from "react"
import { AuthBackground } from "@/components/auth/auth-background"

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <AuthBackground>{children}</AuthBackground>
}
