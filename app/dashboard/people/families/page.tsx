import { Suspense } from "react"
import { FamiliesTable } from "@/components/families/families-table"
import { FamiliesFilters } from "@/components/families/families-filters"
import { AddFamilyModal } from "@/components/families/add-family-modal"

export default function FamiliesPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Families</h1>
          <p className="text-muted-foreground">
            Manage family units, view family members, and track family relationships.
          </p>
        </div>
        <AddFamilyModal />
      </div>

      <FamiliesFilters />

      <Suspense fallback={<div>Loading families...</div>}>
        <FamiliesTable />
      </Suspense>
    </div>
  )
}
