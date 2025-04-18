import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Home, Search } from "lucide-react"

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#F5F5F5] p-4">
      <div className="w-full max-w-md text-center space-y-6">
        <div className="flex justify-center">
          <div className="h-20 w-20 rounded-xl bg-[#0A1931] flex items-center justify-center">
            <span className="text-white font-poppins font-bold text-3xl">K</span>
          </div>
        </div>

        <h1 className="text-6xl font-bold text-[#0A1931] font-poppins">404</h1>
        <h2 className="text-2xl font-medium text-[#0A1931] font-poppins">Page Not Found</h2>

        <p className="text-muted-foreground">The page you are looking for doesn't exist or has been moved.</p>

        <div className="relative w-full max-w-sm mx-auto mt-8">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search for pages..."
            className="w-full pl-10 pr-4 py-2 rounded-md border border-input bg-background"
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6">
          <Button asChild variant="outline" className="gap-2">
            <Link href="/dashboard">
              <ArrowLeft className="h-4 w-4" />
              Go Back
            </Link>
          </Button>
          <Button asChild className="gap-2 bg-[#0A1931] hover:bg-[#0A1931]/90">
            <Link href="/dashboard">
              <Home className="h-4 w-4" />
              Dashboard
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
