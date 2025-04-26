import type React from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface AuthCardProps {
  children: React.ReactNode
  title: string
  description?: string
  footer?: React.ReactNode
  className?: string
}

export function AuthCard({ children, title, description, footer, className }: AuthCardProps) {
  return (
    <div className="container flex items-center justify-center min-h-screen py-10">
      <Card className={cn("w-full max-w-md mx-auto bg-white/90 backdrop-blur-sm shadow-xl", className)}>
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center text-[#0A1931]">{title}</CardTitle>
          {description && <CardDescription className="text-center">{description}</CardDescription>}
        </CardHeader>
        <CardContent>{children}</CardContent>
        {footer && <CardFooter>{footer}</CardFooter>}
      </Card>
    </div>
  )
}
