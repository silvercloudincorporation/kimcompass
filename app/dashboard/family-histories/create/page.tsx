import type { Metadata } from "next"
import { Separator } from "@/components/ui/separator"
import CreateFamilyHistoryForm from "@/components/family-histories/create-family-history-form"

export const metadata: Metadata = {
  title: "Create Family History | KimCompass Admin",
  description: "Create a new family history in the KimCompass platform",
}

export default function CreateFamilyHistoryPage() {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Create Family History</h1>
        <p className="text-muted-foreground">
          Create a new family history to document and preserve cultural heritage and lineage information.
        </p>
      </div>

      <Separator />

      <CreateFamilyHistoryForm />
    </div>
  )
}
