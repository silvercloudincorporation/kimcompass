"use client"

import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import { DataTable } from "@/components/data-table/data-table"
import { columns } from "@/components/communities/columns"
import { mockCommunities } from "@/components/communities/mock-data"
import { CommunityFilters } from "@/components/communities/community-filters"


export default function CommunitiesPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Communities</h1>
        <p className="text-muted-foreground">Manage communities in the KimCompass platform.</p>
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <CommunityFilters onFilterChange={(filters) => console.log("Filters applied:", filters)} />
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Community
          </Button>
        </div>

        <DataTable columns={columns} data={mockCommunities} />
      </div>
    </div>
  )
}
