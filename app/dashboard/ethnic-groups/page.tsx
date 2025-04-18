"use client"

import { useState } from "react"
import { Edit, MoreHorizontal, Plus, Search, Trash2, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AddEthnicGroupDrawer } from "@/components/ethnic-groups/add-ethnic-group-drawer"
import { EditEthnicGroupModal } from "@/components/ethnic-groups/edit-ethnic-group-modal"
import { DeleteEthnicGroupDialog } from "@/components/ethnic-groups/delete-ethnic-group-dialog"
import { ViewEthnicGroupDrawer } from "@/components/ethnic-groups/view-ethnic-group-drawer"
import { Skeleton } from "@/components/ui/skeleton"
import { useToast } from "@/components/ui/use-toast"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

// Mock data for ethnic groups
const initialEthnicGroups = [
  {
    id: "1",
    name: "Akan",
    region: "Ashanti",
    country: "Ghana",
    description: "The Akan are a meta-ethnicity predominantly in Ghana and Ivory Coast",
    status: "active",
    createdBy: "Admin User",
    clansCount: 12,
    createdAt: "2023-01-10",
  },
  {
    id: "2",
    name: "Ewe",
    region: "Volta",
    country: "Ghana",
    description: "The Ewe people are a West African ethnic group",
    status: "active",
    createdBy: "John Doe",
    clansCount: 8,
    createdAt: "2023-01-11",
  },
  {
    id: "3",
    name: "Ga-Adangbe",
    region: "Greater Accra",
    country: "Ghana",
    description: "The Ga-Adangbe are an ethnic group in Ghana and Togo",
    status: "active",
    createdBy: "Admin User",
    clansCount: 6,
    createdAt: "2023-01-12",
  },
  {
    id: "4",
    name: "Dagomba",
    region: "Northern",
    country: "Ghana",
    description: "The Dagomba are an ethnic group of northern Ghana",
    status: "active",
    createdBy: "Jane Smith",
    clansCount: 5,
    createdAt: "2023-01-13",
  },
  {
    id: "5",
    name: "Frafra",
    region: "Upper East",
    country: "Ghana",
    description: "The Frafra are an ethnic group in northern Ghana",
    status: "inactive",
    createdBy: "Admin User",
    clansCount: 3,
    createdAt: "2023-01-14",
  },
]

// Mock data for regions (for dropdown)
export const regions = [
  { id: "1", name: "Greater Accra" },
  { id: "2", name: "Ashanti" },
  { id: "3", name: "Western" },
  { id: "4", name: "Eastern" },
  { id: "5", name: "Central" },
  { id: "6", name: "Volta" },
  { id: "7", name: "Northern" },
  { id: "8", name: "Upper East" },
  { id: "9", name: "Upper West" },
]

export default function EthnicGroupsPage() {
  const { toast } = useToast()
  const [ethnicGroups, setEthnicGroups] = useState(initialEthnicGroups)
  const [searchTerm, setSearchTerm] = useState("")
  const [isAddDrawerOpen, setIsAddDrawerOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [isViewDrawerOpen, setIsViewDrawerOpen] = useState(false)
  const [selectedEthnicGroup, setSelectedEthnicGroup] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5

  // Filter ethnic groups based on search term
  const filteredEthnicGroups = ethnicGroups.filter(
    (ethnicGroup) =>
      ethnicGroup.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ethnicGroup.region.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  // Calculate pagination
  const totalPages = Math.ceil(filteredEthnicGroups.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedEthnicGroups = filteredEthnicGroups.slice(startIndex, startIndex + itemsPerPage)

  const handleAddEthnicGroup = (newEthnicGroup: any) => {
    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      const id = (ethnicGroups.length + 1).toString()
      setEthnicGroups([
        ...ethnicGroups,
        { ...newEthnicGroup, id, clansCount: 0, createdAt: new Date().toISOString().split("T")[0] },
      ])
      setIsAddDrawerOpen(false)
      setIsLoading(false)
      toast({
        title: "Ethnic Group Added",
        description: `${newEthnicGroup.name} has been successfully added.`,
      })
    }, 1000)
  }

  const handleEditEthnicGroup = (updatedEthnicGroup: any) => {
    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      setEthnicGroups(
        ethnicGroups.map((group) => (group.id === updatedEthnicGroup.id ? { ...group, ...updatedEthnicGroup } : group)),
      )
      setIsEditModalOpen(false)
      setIsLoading(false)
      toast({
        title: "Ethnic Group Updated",
        description: `${updatedEthnicGroup.name} has been successfully updated.`,
      })
    }, 1000)
  }

  const handleDeleteEthnicGroup = (id: string) => {
    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      setEthnicGroups(ethnicGroups.filter((group) => group.id !== id))
      setIsDeleteDialogOpen(false)
      setIsLoading(false)
      toast({
        title: "Ethnic Group Deleted",
        description: "The ethnic group has been successfully deleted.",
        variant: "destructive",
      })
    }, 1000)
  }

  const handleEdit = (ethnicGroup: any) => {
    setSelectedEthnicGroup(ethnicGroup)
    setIsEditModalOpen(true)
  }

  const handleDelete = (ethnicGroup: any) => {
    setSelectedEthnicGroup(ethnicGroup)
    setIsDeleteDialogOpen(true)
  }

  const handleView = (ethnicGroup: any) => {
    setSelectedEthnicGroup(ethnicGroup)
    setIsViewDrawerOpen(true)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-poppins font-medium text-[#0A1931]">Ethnic Groups</h1>
          <p className="text-muted-foreground">Manage all ethnic groups in the system</p>
        </div>
        <Button
          className="bg-[#0A1931] hover:bg-[#0A1931]/90 w-full sm:w-auto"
          onClick={() => setIsAddDrawerOpen(true)}
        >
          <Plus className="mr-2 h-4 w-4" />
          Add New Ethnic Group
        </Button>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Ethnic Groups</CardTitle>
          <CardDescription>
            A list of all ethnic groups in the system. You can add, edit, or delete ethnic groups.
          </CardDescription>
          <div className="mt-4 relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search ethnic groups..."
              className="pl-8 w-full md:max-w-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader className="sticky top-0 bg-muted">
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead className="hidden md:table-cell">Region</TableHead>
                  <TableHead className="hidden md:table-cell">Created By</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="hidden md:table-cell">Clans</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  // Loading skeleton
                  Array.from({ length: 5 }).map((_, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <Skeleton className="h-6 w-[150px]" />
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        <Skeleton className="h-6 w-[100px]" />
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        <Skeleton className="h-6 w-[120px]" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-6 w-[80px]" />
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        <Skeleton className="h-6 w-[50px]" />
                      </TableCell>
                      <TableCell className="text-right">
                        <Skeleton className="h-8 w-[40px] ml-auto" />
                      </TableCell>
                    </TableRow>
                  ))
                ) : paginatedEthnicGroups.length > 0 ? (
                  paginatedEthnicGroups.map((ethnicGroup) => (
                    <TableRow key={ethnicGroup.id}>
                      <TableCell className="font-medium">{ethnicGroup.name}</TableCell>
                      <TableCell className="hidden md:table-cell">{ethnicGroup.region}</TableCell>
                      <TableCell className="hidden md:table-cell">{ethnicGroup.createdBy}</TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={
                            ethnicGroup.status === "active"
                              ? "border-green-500 text-green-600"
                              : "border-red-500 text-red-600"
                          }
                        >
                          {ethnicGroup.status === "active" ? "Active" : "Inactive"}
                        </Badge>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">{ethnicGroup.clansCount}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Actions</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => handleView(ethnicGroup)}>
                              <Eye className="mr-2 h-4 w-4" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleEdit(ethnicGroup)}>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit Ethnic Group
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => handleDelete(ethnicGroup)}
                              className="text-red-600 focus:text-red-600"
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete Ethnic Group
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-6 text-muted-foreground">
                      No ethnic groups found. Try a different search or add a new ethnic group.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          {filteredEthnicGroups.length > 0 && (
            <Pagination className="mt-4">
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                  />
                </PaginationItem>

                {Array.from({ length: totalPages }).map((_, index) => {
                  const pageNumber = index + 1
                  // Show first page, last page, and pages around current page
                  if (
                    pageNumber === 1 ||
                    pageNumber === totalPages ||
                    (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1)
                  ) {
                    return (
                      <PaginationItem key={pageNumber}>
                        <PaginationLink
                          isActive={pageNumber === currentPage}
                          onClick={() => setCurrentPage(pageNumber)}
                        >
                          {pageNumber}
                        </PaginationLink>
                      </PaginationItem>
                    )
                  }

                  // Show ellipsis for gaps
                  if (
                    (pageNumber === 2 && currentPage > 3) ||
                    (pageNumber === totalPages - 1 && currentPage < totalPages - 2)
                  ) {
                    return (
                      <PaginationItem key={pageNumber}>
                        <PaginationEllipsis />
                      </PaginationItem>
                    )
                  }

                  return null
                })}

                <PaginationItem>
                  <PaginationNext
                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                    className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          )}
        </CardContent>
      </Card>

      {/* Add Ethnic Group Drawer */}
      <AddEthnicGroupDrawer
        open={isAddDrawerOpen}
        onClose={() => setIsAddDrawerOpen(false)}
        onAdd={handleAddEthnicGroup}
        regions={regions}
        isLoading={isLoading}
      />

      {/* Edit Ethnic Group Modal */}
      {selectedEthnicGroup && (
        <EditEthnicGroupModal
          open={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          onSave={handleEditEthnicGroup}
          ethnicGroup={selectedEthnicGroup}
          regions={regions}
          isLoading={isLoading}
        />
      )}

      {/* Delete Ethnic Group Dialog */}
      {selectedEthnicGroup && (
        <DeleteEthnicGroupDialog
          open={isDeleteDialogOpen}
          onClose={() => setIsDeleteDialogOpen(false)}
          onDelete={() => handleDeleteEthnicGroup(selectedEthnicGroup.id)}
          ethnicGroupName={selectedEthnicGroup.name}
          isLoading={isLoading}
        />
      )}

      {/* View Ethnic Group Drawer */}
      {selectedEthnicGroup && (
        <ViewEthnicGroupDrawer
          open={isViewDrawerOpen}
          onClose={() => setIsViewDrawerOpen(false)}
          ethnicGroup={selectedEthnicGroup}
        />
      )}
    </div>
  )
}
