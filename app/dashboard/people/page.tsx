"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import PeopleTable from "@/components/people/people-table"
import { PeopleFilters } from "@/components/people/people-filters"
import { LinkFamilyButton } from "@/components/people/link-family-button"

export default function PeoplePage() {
  const [activeTab, setActiveTab] = useState("all")
  const [filters, setFilters] = useState({
    name: "",
    status: "",
    family: "",
    gender: "",
    lifeStatus: "",
  })

  const handleFilterChange = (newFilters: any) => {
    setFilters({ ...filters, ...newFilters })
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-poppins font-medium text-[#0A1931]">People Management</h1>
          <p className="text-muted-foreground">Manage all people records in the system</p>
        </div>
        <LinkFamilyButton />
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>People Records</CardTitle>
          <CardDescription>View and manage people records, births, deaths, and family linkages.</CardDescription>

          <Tabs defaultValue="all" className="w-full mt-4" onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-4 w-full max-w-md">
              <TabsTrigger value="all">All People</TabsTrigger>
              <TabsTrigger value="births">Births</TabsTrigger>
              <TabsTrigger value="deaths">Deaths</TabsTrigger>
              <TabsTrigger value="linkages">Linkages</TabsTrigger>
            </TabsList>

            <div className="mt-4">
              <PeopleFilters filters={filters} onFilterChange={handleFilterChange} />
            </div>

            <TabsContent value="all" className="mt-4">
              <PeopleTable type="all" filters={filters} />
            </TabsContent>

            <TabsContent value="births" className="mt-4">
              <PeopleTable type="births" filters={filters} />
            </TabsContent>

            <TabsContent value="deaths" className="mt-4">
              <PeopleTable type="deaths" filters={filters} />
            </TabsContent>

            <TabsContent value="linkages" className="mt-4">
              <PeopleTable type="linkages" filters={filters} />
            </TabsContent>
          </Tabs>
        </CardHeader>
        <CardContent>{/* Content is rendered inside the tabs */}</CardContent>
      </Card>
    </div>
  )
}
