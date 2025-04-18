"use client"

import { useState } from "react"
import { Plus, Search, Filter, Map } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/components/ui/use-toast"
import { DataTable } from "@/components/data-table/data-table"
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header"
import { CreateEditSidebar } from "@/components/geographical/create-edit-sidebar"
import { StatusFilter } from "@/components/geographical/status-filter"

// Mock data for countries
const initialCountries = [
  {
    id: "1",
    name: "Ghana",
    code: "GH",
    continent: "Africa",
    capital: "Accra",
    description: "A country in West Africa",
    status: "approved",
    createdAt: "2023-01-10T09:00:00Z",
    updatedAt: "2023-01-10T09:00:00Z",
    regionsCount: 16,
  },
  {
    id: "2",
    name: "Nigeria",
    code: "NG",
    continent: "Africa",
    capital: "Abuja",
    description: "A country in West Africa",
    status: "approved",
    createdAt: "2023-01-11T10:30:00Z",
    updatedAt: "2023-01-11T10:30:00Z",
    regionsCount: 36,
  },
  {
    id: "3",
    name: "Kenya",
    code: "KE",
    continent: "Africa",
    capital: "Nairobi",
    description: "A country in East Africa",
    status: "approved",
    createdAt: "2023-01-12T11:45:00Z",
    updatedAt: "2023-01-12T11:45:00Z",
    regionsCount: 47,
  },
  {
    id: "4",
    name: "South Africa",
    code: "ZA",
    continent: "Africa",
    capital: "Pretoria",
    description: "A country in Southern Africa",
    status: "approved",
    createdAt: "2023-01-13T12:15:00Z",
    updatedAt: "2023-01-13T12:15:00Z",
    regionsCount: 9,
  },
  {
    id: "5",
    name: "Egypt",
    code: "EG",
    continent: "Africa",
    capital: "Cairo",
    description: "A country in North Africa",
    status: "approved",
    createdAt: "2023-01-14T13:30:00Z",
    updatedAt: "2023-01-14T13:30:00Z",
    regionsCount: 27,
  },
  {
    id: "6",
    name: "Senegal",
    code: "SN",
    continent: "Africa",
    capital: "Dakar",
    description: "A country in West Africa",
    status: "pending",
    createdAt: "2023-01-15T14:45:00Z",
    updatedAt: "2023-01-15T14:45:00Z",
    regionsCount: 14,
  },
  {
    id: "7",
    name: "Cameroon",
    code: "CM",
    continent: "Africa",
    capital: "Yaoundé",
    description: "A country in Central Africa",
    status: "pending",
    createdAt: "2023-01-16T15:00:00Z",
    updatedAt: "2023-01-16T15:00:00Z",
    regionsCount: 10,
  },
]

// Mock data for continents (for dropdown)
const continents = [
  { id: "1", name: "Africa" },
  { id: "2", name: "Europe" },
  { id: "3", name: "Asia" },
  { id: "4", name: "North America" },
  { id: "5", name: "South America" },
  { id: "6", name: "Australia/Oceania" },
  { id: "7", name: "Antarctica" },
]

export default function CountriesPage() {
  const { toast } = useToast()
  const [countries, setCountries] = useState(initialCountries)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string | null>(null)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [selectedCountry, setSelectedCountry] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)

  // Filter countries based on search term and status
  const filteredCountries = countries.filter((country) => {
    const matchesSearch =
      country.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      country.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      country.capital.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter ? country.status === statusFilter : true
    return matchesSearch && matchesStatus
  })

  const handleCreateNew = () => {
    setSelectedCountry(null)
    setIsSidebarOpen(true)
  }

  const handleEdit = (country: any) => {
    setSelectedCountry(country)
    setIsSidebarOpen(true)
  }

  const handleSave = (data: any) => {
    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      if (selectedCountry) {
        // Update existing country
        setCountries(
          countries.map((country) => (country.id === selectedCountry.id ? { ...country, ...data } : country)),
        )
        toast({
          title: "Country Updated",
          description: `${data.name} has been successfully updated.`,
        })
      } else {
        // Create new country
        const newCountry = {
          ...data,
          id: (countries.length + 1).toString(),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          regionsCount: 0,
        }
        setCountries([...countries, newCountry])
        toast({
          title: "Country Created",
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
      setCountries(
        countries.map((country) =>
          country.id === id ? { ...country, status: newStatus, updatedAt: new Date().toISOString() } : country,
        ),
      )
      setIsLoading(false)
      toast({
        title: "Status Updated",
        description: `Country status has been changed to ${newStatus}.`,
      })
    }, 500)
  }

  const handleDelete = (id: string) => {
    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      setCountries(countries.filter((country) => country.id !== id))
      setIsLoading(false)
      toast({
        title: "Country Deleted",
        description: "The country has been successfully deleted.",
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
      accessorKey: "continent",
      header: ({ column }: any) => <DataTableColumnHeader column={column} title="Continent" />,
      cell: ({ row }: any) => <div>{row.getValue("continent")}</div>,
    },
    {
      accessorKey: "capital",
      header: ({ column }: any) => <DataTableColumnHeader column={column} title="Capital" />,
      cell: ({ row }: any) => <div>{row.getValue("capital")}</div>,
    },
    {
      accessorKey: "regionsCount",
      header: ({ column }: any) => <DataTableColumnHeader column={column} title="Regions" />,
      cell: ({ row }: any) => <div className="text-center">{row.getValue("regionsCount")}</div>,
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
      label: "Country Name",
      type: "text",
      placeholder: "Enter country name",
      description: "The name of the country as it will appear in the system.",
      required: true,
    },
    {
      name: "code",
      label: "Country Code",
      type: "text",
      placeholder: "Enter country code (e.g., GH, NG)",
      description: "A unique code for the country (typically 2 letters).",
      required: true,
    },
    {
      name: "continent",
      label: "Continent",
      type: "select",
      options: continents.map((continent) => ({
        value: continent.name,
        label: continent.name,
      })),
      description: "The continent this country belongs to.",
      required: true,
    },
    {
      name: "capital",
      label: "Capital City",
      type: "text",
      placeholder: "Enter capital city",
      description: "The capital city of the country.",
      required: true,
    },
    {
      name: "description",
      label: "Description",
      type: "textarea",
      placeholder: "Enter a description of the country",
      description: "Provide details about the country.",
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
      description: "Set the approval status of this country.",
      required: true,
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-poppins font-medium text-[#0A1931]">Countries</h1>
          <p className="text-muted-foreground">Manage countries in the system</p>
        </div>
        <Button className="bg-[#0A1931] hover:bg-[#0A1931]/90 w-full sm:w-auto" onClick={handleCreateNew}>
          <Plus className="mr-2 h-4 w-4" />
          Add New Country
        </Button>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Countries</CardTitle>
          <CardDescription>A list of all countries in the system.</CardDescription>

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
            data={filteredCountries}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onStatusChange={handleStatusChange}
            isLoading={isLoading}
            entityName="country"
            emptyMessage="No countries found. Try a different search or add a new country."
          />
        </CardContent>
      </Card>

      <CreateEditSidebar
        open={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        onSave={handleSave}
        item={selectedCountry}
        fields={formFields}
        isLoading={isLoading}
        title={selectedCountry ? "Edit Country" : "Add New Country"}
        description={
          selectedCountry ? "Update the country details below." : "Fill in the details below to create a new country."
        }
        icon={<Map className="h-5 w-5 text-[#0A1931]" />}
      />
    </div>
  )
}
