"use client"

import { useState } from "react"
import { Plus, Search, Filter, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/components/ui/use-toast"
import { DataTable } from "@/components/data-table/data-table"
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header"
import { CreateEditSidebar } from "@/components/geographical/create-edit-sidebar"
import { StatusFilter } from "@/components/geographical/status-filter"

// Mock data for continents
const initialContinents = [
  {
    id: "1",
    name: "Africa",
    code: "AF",
    description: "The second-largest and second-most populous continent",
    status: "approved",
    createdAt: "2023-01-10T09:00:00Z",
    updatedAt: "2023-01-10T09:00:00Z",
    countriesCount: 54,
  },
  {
    id: "2",
    name: "Europe",
    code: "EU",
    description: "A continent located entirely in the Northern Hemisphere",
    status: "approved",
    createdAt: "2023-01-11T10:30:00Z",
    updatedAt: "2023-01-11T10:30:00Z",
    countriesCount: 44,
  },
  {
    id: "3",
    name: "Asia",
    code: "AS",
    description: "The largest and most populous continent",
    status: "approved",
    createdAt: "2023-01-12T11:45:00Z",
    updatedAt: "2023-01-12T11:45:00Z",
    countriesCount: 48,
  },
  {
    id: "4",
    name: "North America",
    code: "NA",
    description: "A continent entirely within the Northern Hemisphere",
    status: "approved",
    createdAt: "2023-01-13T12:15:00Z",
    updatedAt: "2023-01-13T12:15:00Z",
    countriesCount: 23,
  },
  {
    id: "5",
    name: "South America",
    code: "SA",
    description: "A continent in the Western Hemisphere",
    status: "approved",
    createdAt: "2023-01-14T13:30:00Z",
    updatedAt: "2023-01-14T13:30:00Z",
    countriesCount: 12,
  },
  {
    id: "6",
    name: "Australia/Oceania",
    code: "OC",
    description: "A continent comprising Australia and neighboring islands",
    status: "approved",
    createdAt: "2023-01-15T14:45:00Z",
    updatedAt: "2023-01-15T14:45:00Z",
    countriesCount: 14,
  },
  {
    id: "7",
    name: "Antarctica",
    code: "AN",
    description: "Earth's southernmost continent",
    status: "approved",
    createdAt: "2023-01-16T15:00:00Z",
    updatedAt: "2023-01-16T15:00:00Z",
    countriesCount: 0,
  },
  {
    id: "8",
    name: "Arctic Region",
    code: "AR",
    description: "The northernmost region of Earth",
    status: "pending",
    createdAt: "2023-05-20T09:30:00Z",
    updatedAt: "2023-05-20T09:30:00Z",
    countriesCount: 0,
  },
]

export default function ContinentsPage() {
  const { toast } = useToast()
  const [continents, setContinents] = useState(initialContinents)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string | null>(null)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [selectedContinent, setSelectedContinent] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)

  // Filter continents based on search term and status
  const filteredContinents = continents.filter((continent) => {
    const matchesSearch =
      continent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      continent.code.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter ? continent.status === statusFilter : true
    return matchesSearch && matchesStatus
  })

  const handleCreateNew = () => {
    setSelectedContinent(null)
    setIsSidebarOpen(true)
  }

  const handleEdit = (continent: any) => {
    setSelectedContinent(continent)
    setIsSidebarOpen(true)
  }

  const handleSave = (data: any) => {
    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      if (selectedContinent) {
        // Update existing continent
        setContinents(
          continents.map((continent) =>
            continent.id === selectedContinent.id ? { ...continent, ...data } : continent,
          ),
        )
        toast({
          title: "Continent Updated",
          description: `${data.name} has been successfully updated.`,
        })
      } else {
        // Create new continent
        const newContinent = {
          ...data,
          id: (continents.length + 1).toString(),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          countriesCount: 0,
        }
        setContinents([...continents, newContinent])
        toast({
          title: "Continent Created",
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
      setContinents(
        continents.map((continent) =>
          continent.id === id ? { ...continent, status: newStatus, updatedAt: new Date().toISOString() } : continent,
        ),
      )
      setIsLoading(false)
      toast({
        title: "Status Updated",
        description: `Continent status has been changed to ${newStatus}.`,
      })
    }, 500)
  }

  const handleDelete = (id: string) => {
    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      setContinents(continents.filter((continent) => continent.id !== id))
      setIsLoading(false)
      toast({
        title: "Continent Deleted",
        description: "The continent has been successfully deleted.",
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
      accessorKey: "code",
      header: ({ column }: any) => <DataTableColumnHeader column={column} title="Code" />,
      cell: ({ row }: any) => <div className="w-20">{row.getValue("code")}</div>,
    },
    {
      accessorKey: "description",
      header: ({ column }: any) => <DataTableColumnHeader column={column} title="Description" />,
      cell: ({ row }: any) => <div className="max-w-[500px] truncate">{row.getValue("description")}</div>,
    },
    {
      accessorKey: "countriesCount",
      header: ({ column }: any) => <DataTableColumnHeader column={column} title="Countries" />,
      cell: ({ row }: any) => <div className="text-center">{row.getValue("countriesCount")}</div>,
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
      label: "Continent Name",
      type: "text",
      placeholder: "Enter continent name",
      description: "The name of the continent as it will appear in the system.",
      required: true,
    },
    {
      name: "code",
      label: "Continent Code",
      type: "text",
      placeholder: "Enter continent code (e.g., AF, EU)",
      description: "A unique code for the continent (typically 2 letters).",
      required: true,
    },
    {
      name: "description",
      label: "Description",
      type: "textarea",
      placeholder: "Enter a description of the continent",
      description: "Provide details about the continent.",
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
      description: "Set the approval status of this continent.",
      required: true,
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-poppins font-medium text-[#0A1931]">Continents</h1>
          <p className="text-muted-foreground">Manage continents in the system</p>
        </div>
        <Button className="bg-[#0A1931] hover:bg-[#0A1931]/90 w-full sm:w-auto" onClick={handleCreateNew}>
          <Plus className="mr-2 h-4 w-4" />
          Add New Continent
        </Button>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Continents</CardTitle>
          <CardDescription>A list of all continents in the system.</CardDescription>

          <div className="mt-4 flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search by name or code..."
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
            data={filteredContinents}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onStatusChange={handleStatusChange}
            isLoading={isLoading}
            entityName="continent"
            emptyMessage="No continents found. Try a different search or add a new continent."
          />
        </CardContent>
      </Card>

      <CreateEditSidebar
        open={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        onSave={handleSave}
        item={selectedContinent}
        fields={formFields}
        isLoading={isLoading}
        title={selectedContinent ? "Edit Continent" : "Add New Continent"}
        description={
          selectedContinent
            ? "Update the continent details below."
            : "Fill in the details below to create a new continent."
        }
        icon={<Globe className="h-5 w-5 text-[#0A1931]" />}
      />
    </div>
  )
}
