import { Suspense } from "react"
import type { Metadata } from "next"
import AreasClientPage from "./AreasClientPage"
import { Skeleton } from "@/components/ui/skeleton"

export const metadata: Metadata = {
  title: "Areas Management | KimCompass Admin",
  description: "Manage geographical areas within communities",
}

export default function AreasPage() {
  return (
    <Suspense fallback={<Skeleton className="h-[calc(100vh-2rem)] w-full" />}>
      <AreasClientPage />
    </Suspense>
  )
}
