"use client"

import { useState } from "react"
import { Plus, Search, Filter, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/components/ui/use-toast"
import { DataTable } from "@/components/data-table/data-table"
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header"
import { CreateEditSidebar } from "@/components/geographical/create-edit-sidebar"
import { StatusFilter } from "@/components/geographical/status-filter"

// Mock data for regions
const initialRegions = [
  {
    id: "1",
    name: "Greater Accra",
    code: "GA",
    country: "Ghana",
    capital: "Accra",
    description: "The capital region of Ghana",
    status: "approved",
    createdAt: "2023-01-10T09:00:00Z",
    updatedAt: "2023-01-10T09:00:00Z",
    tribesCount: 5,
  },
  {
    id: "2",
    name: "Ashanti",
    code: "AS",
    country: "Ghana",
    capital: "Kumasi",
    description: "A region in southern Ghana",
    status: "approved",
    createdAt: "2023-01-11T10:30:00Z",
    updatedAt: "2023-01-11T10:30:00Z",
    tribesCount: 8,
  },
  {
    id: "3",
    name: "Western",
    code: "WE",
    country: "Ghana",
    capital: "Sekondi-Takoradi",
    description: "A region in southwestern Ghana",
    status: "approved",
    createdAt: "2023-01-12T11:45:00Z",
    updatedAt: "2023-01-12T11:45:00Z",
    tribesCount: 6,
  },
  {
    id: "4",
    name: "Eastern",
    code: "EA",
    country: "Ghana",
    capital: "Koforidua",
    description: "A region in southeastern Ghana",
    status: "approved",
    createdAt: "2023-01-13T12:15:00Z",
    updatedAt: "2023-01-13T12:15:00Z",
    tribesCount: 4,
  },
  {
    id: "5",
    name: "Central",
    code: "CE",
    country: "Ghana",
    capital: "Cape Coast",
    description: "A region in southern Ghana",
    status: "approved",
    createdAt: "2023-01-14T13:30:00Z",
    updatedAt: "2023-01-14T13:30:00Z",
    tribesCount: 5,
  },
  {
    id: "6",
    name: "Volta",
    code: "VO",
    country: "Ghana",
    capital: "Ho",
    description: "A region in southeastern Ghana",
    status: "pending",
    createdAt: "2023-01-15T14:45:00Z",
    updatedAt: "2023-01-15T14:45:00Z",
    tribesCount: 7,
  },
  {
    id: "7",
    name: "Northern",
    code: "NO",
    country: "Ghana",
    capital: "Tamale",
    description: "A region in northern Ghana",
    status: "pending",
    createdAt: "2023-01-16T15:00:00Z",
    updatedAt: "2023-01-16T15:00:00Z",
    tribesCount: 9,
  },
]

// Mock data for countries (for dropdown)
const countries = [
  { id: "1", name: "Ghana" },
  { id: "2", name: "Nigeria" },
  { id: "3", name: "Kenya" },
  { id: "4", name: "South Africa" },
  { id: "5", name: "Egypt" },
]

export default function RegionsPage() {
  const { toast } = useToast()
  const [regions, setRegions] = useState(initialRegions)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string | null>(null)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [selectedRegion, setSelectedRegion] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)

  // Filter regions based on search term and status
  const filteredRegions = regions.filter((region) => {
    const matchesSearch =
      region.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      region.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      region.capital.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter ? region.status === statusFilter : true
    return matchesSearch && matchesStatus
  })

  const handleCreateNew = () => {
    setSelectedRegion(null)
    setIsSidebarOpen(true)
  }

  const handleEdit = (region: any) => {
    setSelectedRegion(region)
    setIsSidebarOpen(true)
  }

  const handleSave = (data: any) => {
    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      if (selectedRegion) {
        // Update existing region
        setRegions(regions.map((region) => (region.id === selectedRegion.id ? { ...region, ...data } : region)))
        toast({
          title: "Region Updated",
          description: `${data.name} has been successfully updated.`,
        })
      } else {
        // Create new region
        const newRegion = {
          ...data,
          id: (regions.length + 1).toString(),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          tribesCount: 0,
        }
        setRegions([...regions, newRegion])
        toast({
          title: "Region Created",
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
      setRegions(
        regions.map((region) =>
          region.id === id ? { ...region, status: newStatus, updatedAt: new Date().toISOString() } : region,
        ),
      )
      setIsLoading(false)
      toast({
        title: "Status Updated",
        description: `Region status has been changed to ${newStatus}.`,
      })
    }, 500)
  }

  const handleDelete = (id: string) => {
    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      setRegions(regions.filter((region) => region.id !== id))
      setIsLoading(false)
      toast({
        title: "Region Deleted",
        description: "The region has been successfully deleted.",
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
      accessorKey: "country",
      header: ({ column }: any) => <DataTableColumnHeader column={column} title="Country" />,
      cell: ({ row }: any) => <div>{row.getValue("country")}</div>,
    },
    {
      accessorKey: "capital",
      header: ({ column }: any) => <DataTableColumnHeader column={column} title="Capital" />,
      cell: ({ row }: any) => <div>{row.getValue("capital")}</div>,
    },
    {
      accessorKey: "tribesCount",
      header: ({ column }: any) => <DataTableColumnHeader column={column} title="Tribes" />,
      cell: ({ row }: any) => <div className="text-center">{row.getValue("tribesCount")}</div>,
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
      label: "Region Name",
      type: "text",
      placeholder: "Enter region name",
      description: "The name of the region as it will appear in the system.",
      required: true,
    },
    {
      name: "code",
      label: "Region Code",
      type: "text",
      placeholder: "Enter region code (e.g., GA, AS)",
      description: "A unique code for the region (typically 2 letters).",
      required: true,
    },
    {
      name: "country",
      label: "Country",
      type: "select",
      options: countries.map((country) => ({
        value: country.name,
        label: country.name,
      })),
      description: "The country this region belongs to.",
      required: true,
    },
    {
      name: "capital",
      label: "Capital City",
      type: "text",
      placeholder: "Enter capital city",
      description: "The capital city of the region.",
      required: true,
    },
    {
      name: "description",
      label: "Description",
      type: "textarea",
      placeholder: "Enter a description of the region",
      description: "Provide details about the region.",
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
      description: "Set the approval status of this region.",
      required: true,
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-poppins font-medium text-[#0A1931]">Regions</h1>
          <p className="text-muted-foreground">Manage regions in the system</p>
        </div>
        <Button className="bg-[#0A1931] hover:bg-[#0A1931]/90 w-full sm:w-auto" onClick={handleCreateNew}>
          <Plus className="mr-2 h-4 w-4" />
          Add New Region
        </Button>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Regions</CardTitle>
          <CardDescription>A list of all regions in the system.</CardDescription>

          <div className="mt-4 flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search by name, code or capital..."
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
            data={filteredRegions}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onStatusChange={handleStatusChange}
            isLoading={isLoading}
            entityName="region"
            emptyMessage="No regions found. Try a different search or add a new region."
          />
        </CardContent>
      </Card>

      <CreateEditSidebar
        open={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        onSave={handleSave}
        item={selectedRegion}
        fields={formFields}
        isLoading={isLoading}
        title={selectedRegion ? "Edit Region" : "Add New Region"}
        description={
          selectedRegion ? "Update the region details below." : "Fill in the details below to create a new region."
        }
        icon={<MapPin className="h-5 w-5 text-[#0A1931]" />}
      />
    </div>
  )
}
