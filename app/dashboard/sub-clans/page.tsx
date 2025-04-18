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
import { AddSubClanModal } from "@/components/clans/add-sub-clan-modal"
import { EditSubClanModal } from "@/components/clans/edit-sub-clan-modal"
import { DeleteClanDialog } from "@/components/clans/delete-clan-dialog"
import { ViewSubClanDrawer } from "@/components/clans/view-sub-clan-drawer"
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

// Mock data for sub-clans
const initialSubClans = [
  {
    id: "1",
    name: "Ashanti Oyoko Sub-Clan",
    parentClan: "Ashanti Clan",
    tribe: "Ashanti",
    createdBy: "Admin User",
    status: "active",
    description: "The Oyoko is one of the major sub-clans of the Ashanti people in Ghana.",
    createdAt: "2023-01-20",
  },
  {
    id: "2",
    name: "Ewe Anlo Sub-Clan",
    parentClan: "Ewe Clan",
    tribe: "Ewe",
    createdBy: "John Doe",
    status: "active",
    description: "The Anlo is a sub-clan of the Ewe people primarily located in southeastern Ghana.",
    createdAt: "2023-02-25",
  },
  {
    id: "3",
    name: "Ga Sempe Sub-Clan",
    parentClan: "Ga-Adangbe Clan",
    tribe: "Ga",
    createdBy: "Admin User",
    status: "inactive",
    description: "The Sempe is a sub-clan of the Ga people primarily located in the Greater Accra Region.",
    createdAt: "2023-03-15",
  },
  {
    id: "4",
    name: "Fante Ekumfi Sub-Clan",
    parentClan: "Fante Clan",
    tribe: "Akan",
    createdBy: "Jane Smith",
    status: "active",
    description: "The Ekumfi is a sub-clan of the Fante people in the Central region of Ghana.",
    createdAt: "2023-04-10",
  },
  {
    id: "5",
    name: "Dagomba Tugu Sub-Clan",
    parentClan: "Dagomba Clan",
    tribe: "Dagomba",
    createdBy: "Admin User",
    status: "active",
    description: "The Tugu is a sub-clan of the Dagomba people primarily located in northern Ghana.",
    createdAt: "2023-05-18",
  },
]

// Mock data for parent clans (for dropdown)
const parentClans = [
  { id: "1", name: "Ashanti Clan", tribe: "Ashanti" },
  { id: "2", name: "Ewe Clan", tribe: "Ewe" },
  { id: "3", name: "Ga-Adangbe Clan", tribe: "Ga" },
  { id: "4", name: "Fante Clan", tribe: "Akan" },
  { id: "5", name: "Dagomba Clan", tribe: "Dagomba" },
]

export default function SubClansPage() {
  const { toast } = useToast()
  const [subClans, setSubClans] = useState(initialSubClans)
  const [searchTerm, setSearchTerm] = useState("")
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [isViewDrawerOpen, setIsViewDrawerOpen] = useState(false)
  const [selectedSubClan, setSelectedSubClan] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5

  // Filter sub-clans based on search term
  const filteredSubClans = subClans.filter(
    (subClan) =>
      subClan.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      subClan.parentClan.toLowerCase().includes(searchTerm.toLowerCase()) ||
      subClan.tribe.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  // Calculate pagination
  const totalPages = Math.ceil(filteredSubClans.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedSubClans = filteredSubClans.slice(startIndex, startIndex + itemsPerPage)

  const handleAddSubClan = (newSubClan: any) => {
    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      const id = (subClans.length + 1).toString()
      setSubClans([...subClans, { ...newSubClan, id, createdAt: new Date().toISOString().split("T")[0] }])
      setIsAddModalOpen(false)
      setIsLoading(false)
      toast({
        title: "Sub-Clan Added",
        description: `${newSubClan.name} has been successfully added.`,
      })
    }, 1000)
  }

  const handleEditSubClan = (updatedSubClan: any) => {
    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      setSubClans(
        subClans.map((subClan) => (subClan.id === updatedSubClan.id ? { ...subClan, ...updatedSubClan } : subClan)),
      )
      setIsEditModalOpen(false)
      setIsLoading(false)
      toast({
        title: "Sub-Clan Updated",
        description: `${updatedSubClan.name} has been successfully updated.`,
      })
    }, 1000)
  }

  const handleDeleteSubClan = (id: string) => {
    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      setSubClans(subClans.filter((subClan) => subClan.id !== id))
      setIsDeleteDialogOpen(false)
      setIsLoading(false)
      toast({
        title: "Sub-Clan Deleted",
        description: "The sub-clan has been successfully deleted.",
        variant: "destructive",
      })
    }, 1000)
  }

  const handleEdit = (subClan: any) => {
    setSelectedSubClan(subClan)
    setIsEditModalOpen(true)
  }

  const handleDelete = (subClan: any) => {
    setSelectedSubClan(subClan)
    setIsDeleteDialogOpen(true)
  }

  const handleView = (subClan: any) => {
    setSelectedSubClan(subClan)
    setIsViewDrawerOpen(true)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-poppins font-medium text-[#0A1931]">Sub-Clans</h1>
          <p className="text-muted-foreground">Manage all sub-clans in the system</p>
        </div>
        <Button className="bg-[#0A1931] hover:bg-[#0A1931]/90 w-full sm:w-auto" onClick={() => setIsAddModalOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add New Sub-Clan
        </Button>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Sub-Clans</CardTitle>
          <CardDescription>
            A list of all sub-clans in the system. You can add, edit, or delete sub-clans.
          </CardDescription>
          <div className="mt-4 relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search sub-clans..."
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
                  <TableHead className="hidden md:table-cell">Parent Clan</TableHead>
                  <TableHead className="hidden md:table-cell">Tribe</TableHead>
                  <TableHead className="hidden md:table-cell">Created By</TableHead>
                  <TableHead>Status</TableHead>
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
                        <Skeleton className="h-6 w-[120px]" />
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
                      <TableCell className="text-right">
                        <Skeleton className="h-8 w-[40px] ml-auto" />
                      </TableCell>
                    </TableRow>
                  ))
                ) : paginatedSubClans.length > 0 ? (
                  paginatedSubClans.map((subClan) => (
                    <TableRow key={subClan.id}>
                      <TableCell className="font-medium">{subClan.name}</TableCell>
                      <TableCell className="hidden md:table-cell">{subClan.parentClan}</TableCell>
                      <TableCell className="hidden md:table-cell">{subClan.tribe}</TableCell>
                      <TableCell className="hidden md:table-cell">{subClan.createdBy}</TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={
                            subClan.status === "active"
                              ? "border-green-500 text-green-600"
                              : "border-red-500 text-red-600"
                          }
                        >
                          {subClan.status === "active" ? "Active" : "Inactive"}
                        </Badge>
                      </TableCell>
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
                            <DropdownMenuItem onClick={() => handleView(subClan)}>
                              <Eye className="mr-2 h-4 w-4" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleEdit(subClan)}>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit Sub-Clan
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => handleDelete(subClan)}
                              className="text-red-600 focus:text-red-600"
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete Sub-Clan
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-6 text-muted-foreground">
                      No sub-clans found. Try a different search or add a new sub-clan.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          {filteredSubClans.length > 0 && (
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

      {/* Add Sub-Clan Modal */}
      <AddSubClanModal
        open={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={handleAddSubClan}
        parentClans={parentClans}
        isLoading={isLoading}
      />

      {/* Edit Sub-Clan Modal */}
      {selectedSubClan && (
        <EditSubClanModal
          open={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          onSave={handleEditSubClan}
          subClan={selectedSubClan}
          parentClans={parentClans}
          isLoading={isLoading}
        />
      )}

      {/* Delete Sub-Clan Dialog */}
      {selectedSubClan && (
        <DeleteClanDialog
          open={isDeleteDialogOpen}
          onClose={() => setIsDeleteDialogOpen(false)}
          onDelete={() => handleDeleteSubClan(selectedSubClan.id)}
          clanName={selectedSubClan.name}
          isLoading={isLoading}
          isSubClan={true}
        />
      )}

      {/* View Sub-Clan Drawer */}
      {selectedSubClan && (
        <ViewSubClanDrawer
          open={isViewDrawerOpen}
          onClose={() => setIsViewDrawerOpen(false)}
          subClan={selectedSubClan}
        />
      )}
    </div>
  )
}
