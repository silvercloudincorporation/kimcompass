"use client"

import { useState } from "react"
import { Plus, Search, Filter, Tent } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/components/ui/use-toast"
import { DataTable } from "@/components/data-table/data-table"
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header"
import { CreateEditSidebar } from "@/components/geographical/create-edit-sidebar"
import { StatusFilter } from "@/components/geographical/status-filter"

// Mock data for clans
const initialClans = [
  {
    id: "1",
    name: "Oyoko",
    tribe: "Akan",
    region: "Ashanti",
    country: "Ghana",
    description: "One of the major Akan clans in Ghana",
    status: "approved",
    createdAt: "2023-01-10T09:00:00Z",
    updatedAt: "2023-01-10T09:00:00Z",
    membersCount: 1250,
  },
  {
    id: "2",
    name: "Aduana",
    tribe: "Akan",
    region: "Ashanti",
    country: "Ghana",
    description: "One of the eight major Akan clans in Ghana",
    status: "approved",
    createdAt: "2023-01-11T10:30:00Z",
    updatedAt: "2023-01-11T10:30:00Z",
    membersCount: 980,
  },
  {
    id: "3",
    name: "Asona",
    tribe: "Akan",
    region: "Ashanti",
    country: "Ghana",
    description: "One of the major Akan clans in Ghana",
    status: "approved",
    createdAt: "2023-01-12T11:45:00Z",
    updatedAt: "2023-01-12T11:45:00Z",
    membersCount: 1100,
  },
  {
    id: "4",
    name: "Anlo",
    tribe: "Ewe",
    region: "Volta",
    country: "Ghana",
    description: "A major clan of the Ewe people",
    status: "approved",
    createdAt: "2023-01-13T12:15:00Z",
    updatedAt: "2023-01-13T12:15:00Z",
    membersCount: 850,
  },
  {
    id: "5",
    name: "Ga-Mashie",
    tribe: "Ga-Adangbe",
    region: "Greater Accra",
    country: "Ghana",
    description: "A major clan of the Ga people",
    status: "approved",
    createdAt: "2023-01-14T13:30:00Z",
    updatedAt: "2023-01-14T13:30:00Z",
    membersCount: 920,
  },
  {
    id: "6",
    name: "Akyem",
    tribe: "Akan",
    region: "Eastern",
    country: "Ghana",
    description: "A major Akan clan in the Eastern region",
    status: "pending",
    createdAt: "2023-01-15T14:45:00Z",
    updatedAt: "2023-01-15T14:45:00Z",
    membersCount: 780,
  },
  {
    id: "7",
    name: "Dagbon",
    tribe: "Dagomba",
    region: "Northern",
    country: "Ghana",
    description: "A major clan of the Dagomba people",
    status: "pending",
    createdAt: "2023-01-16T15:00:00Z",
    updatedAt: "2023-01-16T15:00:00Z",
    membersCount: 650,
  },
]

// Mock data for tribes (for dropdown)
const tribes = [
  { id: "1", name: "Akan", region: "Ashanti" },
  { id: "2", name: "Ewe", region: "Volta" },
  { id: "3", name: "Ga-Adangbe", region: "Greater Accra" },
  { id: "4", name: "Dagomba", region: "Northern" },
  { id: "5", name: "Frafra", region: "Upper East" },
  { id: "6", name: "Gonja", region: "Northern" },
  { id: "7", name: "Dagaaba", region: "Upper West" },
]

export default function ClansPage() {
  const { toast } = useToast()
  const [clans, setClans] = useState(initialClans)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string | null>(null)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [selectedClan, setSelectedClan] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)

  // Filter clans based on search term and status
  const filteredClans = clans.filter((clan) => {
    const matchesSearch =
      clan.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      clan.tribe.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter ? clan.status === statusFilter : true
    return matchesSearch && matchesStatus
  })

  const handleCreateNew = () => {
    setSelectedClan(null)
    setIsSidebarOpen(true)
  }

  const handleEdit = (clan: any) => {
    setSelectedClan(clan)
    setIsSidebarOpen(true)
  }

  const handleSave = (data: any) => {
    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      if (selectedClan) {
        // Update existing clan
        setClans(clans.map((clan) => (clan.id === selectedClan.id ? { ...clan, ...data } : clan)))
        toast({
          title: "Clan Updated",
          description: `${data.name} has been successfully updated.`,
        })
      } else {
        // Create new clan
        const newClan = {
          ...data,
          id: (clans.length + 1).toString(),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          membersCount: 0,
        }
        setClans([...clans, newClan])
        toast({
          title: "Clan Created",
          description: `${data.name} has been successfully created.`,
        })
      }
      setIsLoading(false)
      setIsSidebarOpen(false)
    }, 1000)
  }

  const handleStatusChange = (id: string, newStatus: string) => {
    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      setClans(
        clans.map((clan) =>
          clan.id === id ? { ...clan, status: newStatus, updatedAt: new Date().toISOString() } : clan,
        ),
      )
      setIsLoading(false)
      toast({
        title: "Status Updated",
        description: `Clan status has been changed to ${newStatus}.`,
      })
    }, 500)
  }

  const handleDelete = (id: string) => {
    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      setClans(clans.filter((clan) => clan.id !== id))
      setIsLoading(false)
      toast({
        title: "Clan Deleted",
        description: "The clan has been successfully deleted.",
        variant: "destructive",
      })
    }, 1000)
  }

  const resetFilters = () => {
    setSearchTerm("")
    setStatusFilter(null)
  }

  // Define columns for the data table
  const columns = [
    {
      accessorKey: "name",
      header: ({ column }: any) => <DataTableColumnHeader column={column} title="Name" />,
      cell: ({ row }: any) => <div className="font-medium">{row.getValue("name")}</div>,
    },
    {
      accessorKey: "tribe",
      header: ({ column }: any) => <DataTableColumnHeader column={column} title="Tribe" />,
      cell: ({ row }: any) => <div>{row.getValue("tribe")}</div>,
    },
    {
      accessorKey: "region",
      header: ({ column }: any) => <DataTableColumnHeader column={column} title="Region" />,
      cell: ({ row }: any) => <div>{row.getValue("region")}</div>,
    },
    {
      accessorKey: "membersCount",
      header: ({ column }: any) => <DataTableColumnHeader column={column} title="Members" />,
      cell: ({ row }: any) => <div className="text-center">{row.getValue("membersCount")}</div>,
    },
    {
      accessorKey: "status",
      header: ({ column }: any) => <DataTableColumnHeader column={column} title="Status" />,
      cell: ({ row }: any) => {
        const status = row.getValue("status")
        return (
          <Badge
            variant="outline"
            className={status === "approved" ? "border-green-500 text-green-600" : "border-amber-500 text-amber-600"}
          >
            {status === "approved" ? "Approved" : "Pending"}
          </Badge>
        )
      },
      filterFn: (row: any, id: any, value: any) => {
        return value.includes(row.getValue(id))
      },
    },
  ]

  // Define form fields for the sidebar
  const formFields:any = [
    {
      name: "name",
      label: "Clan Name",
      type: "text",
      placeholder: "Enter clan name",
      description: "The name of the clan as it will appear in the system.",
      required: true,
    },
    {
      name: "tribe",
      label: "Tribe",
      type: "select",
      options: tribes.map((tribe) => ({
        value: tribe.name,
        label: tribe.name,
      })),
      description: "The tribe this clan belongs to.",
      required: true,
    },
    {
      name: "region",
      label: "Region",
      type: "text",
      placeholder: "Enter region",
      description: "The region this clan belongs to.",
      required: true,
      disabled: true,
      // This would be dynamically set based on the selected tribe in a real app
    },
    {
      name: "country",
      label: "Country",
      type: "text",
      placeholder: "Enter country",
      description: "The country this clan belongs to.",
      required: true,
      disabled: true,
      defaultValue: "Ghana",
    },
    {
      name: "description",
      label: "Description",
      type: "textarea",
      placeholder: "Enter a description of the clan",
      description: "Provide details about the clan, its history, and culture.",
      required: true,
    },
    {
      name: "status",
      label: "Status",
      type: "select",
      options: [
        { value: "pending", label: "Pending" },
        { value: "approved", label: "Approved" },
      ],
      description: "Set the approval status of this clan.",
      required: true,
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-poppins font-medium text-[#0A1931]">Clans</h1>
          <p className="text-muted-foreground">Manage clans in the system</p>
        </div>
        <Button className="bg-[#0A1931] hover:bg-[#0A1931]/90 w-full sm:w-auto" onClick={handleCreateNew}>
          <Plus className="mr-2 h-4 w-4" />
          Add New Clan
        </Button>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Clans</CardTitle>
          <CardDescription>A list of all clans in the system.</CardDescription>

          <div className="mt-4 flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search by name or tribe..."
                className="pl-8 w-full"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-2">
              <StatusFilter value={statusFilter} onChange={setStatusFilter} />

              <Button variant="outline" onClick={resetFilters} className="w-full sm:w-auto">
                <Filter className="mr-2 h-4 w-4" />
                Reset Filters
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={columns}
            data={filteredClans}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onStatusChange={handleStatusChange}
            isLoading={isLoading}
            entityName="clan"
            emptyMessage="No clans found. Try a different search or add a new clan."
          />
        </CardContent>
      </Card>

      <CreateEditSidebar
        open={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        onSave={handleSave}
        item={selectedClan}
        fields={formFields}
        isLoading={isLoading}
        title={selectedClan ? "Edit Clan" : "Add New Clan"}
        description={
          selectedClan ? "Update the clan details below." : "Fill in the details below to create a new clan."
        }
        icon={<Tent className="h-5 w-5 text-[#0A1931]" />}
      />
    </div>
  )
}
