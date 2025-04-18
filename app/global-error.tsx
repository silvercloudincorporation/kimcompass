"use client"

import { useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { AlertTriangle, Home, RefreshCw } from "lucide-react"

interface GlobalErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <html>
      <body>
        <div className="flex flex-col items-center justify-center min-h-screen bg-[#F5F5F5] p-4">
          <div className="w-full max-w-md text-center space-y-6">
            <div className="flex justify-center">
              <div className="h-20 w-20 rounded-full bg-red-100 flex items-center justify-center">
                <AlertTriangle className="h-10 w-10 text-red-600" />
              </div>
            </div>

            <h1 className="text-2xl font-bold text-[#0A1931]">Critical Error</h1>

            <p className="text-gray-600">
              We apologize for the inconvenience. A critical error has occurred in the application.
            </p>

            {error.digest && (
              <div className="bg-gray-100 p-3 rounded-md text-sm">
                <p className="font-medium">Error ID: {error.digest}</p>
                <p className="text-xs text-gray-500 mt-1">Please provide this ID if you contact support.</p>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6">
              <Button className="gap-2 bg-[#0A1931] hover:bg-[#0A1931]/90" onClick={reset}>
                <RefreshCw className="h-4 w-4" />
                Try Again
              </Button>
              <Button asChild variant="outline" className="gap-2">
                <Link href="/">
                  <Home className="h-4 w-4" />
                  Return Home
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </body>
    </html>
  )
}
