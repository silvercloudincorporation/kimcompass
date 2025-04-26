"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import PeopleTable from "@/components/people/people-table"
import { PeopleFilters } from "@/components/people/people-filters"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { AddPersonModal } from "@/components/people/add-person-modal"

export default function DeathsPage() {
  const [filters, setFilters] = useState({
    name: "",
    status: "",
    family: "",
    gender: "",
    lifeStatus: "",
  })
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)

  const handleFilterChange = (newFilters: any) => {
    setFilters({ ...filters, ...newFilters })
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-poppins font-medium text-[#0A1931]">Death Records</h1>
          <p className="text-muted-foreground">Manage all death records in the system</p>
        </div>
        <Button onClick={() => setIsAddModalOpen(true)} className="bg-[#0A1931] hover:bg-[#0A1931]/90">
          <Plus className="mr-2 h-4 w-4" /> Add Death Record
        </Button>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Death Records</CardTitle>
          <CardDescription>View and manage all death records in the system.</CardDescription>

          <div className="mt-4">
            <PeopleFilters filters={filters} onFilterChange={handleFilterChange} />
          </div>
        </CardHeader>
        <CardContent>
          <PeopleTable type="deaths" filters={filters} />
        </CardContent>
      </Card>

      <AddPersonModal open={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} type="death" />
    </div>
  )
}
