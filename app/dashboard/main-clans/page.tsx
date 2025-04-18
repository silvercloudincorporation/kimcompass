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
import { AddClanDrawer } from "@/components/clans/add-clan-drawer"
import { EditClanModal } from "@/components/clans/edit-clan-modal"
import { DeleteClanDialog } from "@/components/clans/delete-clan-dialog"
import { ViewClanDrawer } from "@/components/clans/view-clan-drawer"
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

// Mock data for clans
const initialClans = [
  {
    id: "1",
    name: "Ashanti Clan",
    tribe: "Ashanti",
    createdBy: "Admin User",
    status: "active",
    subClansCount: 5,
    description: "The Ashanti Clan is one of the major clans of the Ashanti people in Ghana.",
    createdAt: "2023-01-15",
  },
  {
    id: "2",
    name: "Ewe Clan",
    tribe: "Ewe",
    createdBy: "John Doe",
    status: "active",
    subClansCount: 3,
    description: "The Ewe Clan represents the Ewe people primarily located in southeastern Ghana.",
    createdAt: "2023-02-20",
  },
  {
    id: "3",
    name: "Ga-Adangbe Clan",
    tribe: "Ga",
    createdBy: "Admin User",
    status: "inactive",
    subClansCount: 2,
    description: "The Ga-Adangbe Clan represents the Ga people primarily located in the Greater Accra Region.",
    createdAt: "2023-03-10",
  },
  {
    id: "4",
    name: "Fante Clan",
    tribe: "Akan",
    createdBy: "Jane Smith",
    status: "active",
    subClansCount: 4,
    description: "The Fante Clan is a major clan of the Akan people in the Central and Western regions of Ghana.",
    createdAt: "2023-04-05",
  },
  {
    id: "5",
    name: "Dagomba Clan",
    tribe: "Dagomba",
    createdBy: "Admin User",
    status: "active",
    subClansCount: 1,
    description: "The Dagomba Clan represents the Dagomba people primarily located in northern Ghana.",
    createdAt: "2023-05-12",
  },
]

// Mock data for tribes (for dropdown)
export const tribes = [
  { id: "1", name: "Ashanti" },
  { id: "2", name: "Ewe" },
  { id: "3", name: "Ga" },
  { id: "4", name: "Akan" },
  { id: "5", name: "Dagomba" },
  { id: "6", name: "Gonja" },
  { id: "7", name: "Frafra" },
]

export default function MainClansPage() {
  const { toast } = useToast()
  const [clans, setClans] = useState(initialClans)
  const [searchTerm, setSearchTerm] = useState("")
  const [isAddDrawerOpen, setIsAddDrawerOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [isViewDrawerOpen, setIsViewDrawerOpen] = useState(false)
  const [selectedClan, setSelectedClan] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5

  // Filter clans based on search term
  const filteredClans = clans.filter(
    (clan) =>
      clan.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      clan.tribe.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  // Calculate pagination
  const totalPages = Math.ceil(filteredClans.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedClans = filteredClans.slice(startIndex, startIndex + itemsPerPage)

  const handleAddClan = (newClan: any) => {
    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      const id = (clans.length + 1).toString()
      setClans([...clans, { ...newClan, id, subClansCount: 0, createdAt: new Date().toISOString().split("T")[0] }])
      setIsAddDrawerOpen(false)
      setIsLoading(false)
      toast({
        title: "Clan Added",
        description: `${newClan.name} has been successfully added.`,
      })
    }, 1000)
  }

  const handleEditClan = (updatedClan: any) => {
    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      setClans(clans.map((clan) => (clan.id === updatedClan.id ? { ...clan, ...updatedClan } : clan)))
      setIsEditModalOpen(false)
      setIsLoading(false)
      toast({
        title: "Clan Updated",
        description: `${updatedClan.name} has been successfully updated.`,
      })
    }, 1000)
  }

  const handleDeleteClan = (id: string) => {
    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      setClans(clans.filter((clan) => clan.id !== id))
      setIsDeleteDialogOpen(false)
      setIsLoading(false)
      toast({
        title: "Clan Deleted",
        description: "The clan has been successfully deleted.",
        variant: "destructive",
      })
    }, 1000)
  }

  const handleEdit = (clan: any) => {
    setSelectedClan(clan)
    setIsEditModalOpen(true)
  }

  const handleDelete = (clan: any) => {
    setSelectedClan(clan)
    setIsDeleteDialogOpen(true)
  }

  const handleView = (clan: any) => {
    setSelectedClan(clan)
    setIsViewDrawerOpen(true)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-poppins font-medium text-[#0A1931]">Main Clans</h1>
          <p className="text-muted-foreground">Manage all main clans in the system</p>
        </div>
        <Button
          className="bg-[#0A1931] hover:bg-[#0A1931]/90 w-full sm:w-auto"
          onClick={() => setIsAddDrawerOpen(true)}
        >
          <Plus className="mr-2 h-4 w-4" />
          Add New Clan
        </Button>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Main Clans</CardTitle>
          <CardDescription>A list of all main clans in the system. You can add, edit, or delete clans.</CardDescription>
          <div className="mt-4 relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search clans..."
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
                  <TableHead className="hidden md:table-cell">Ethnic Group</TableHead>
                  <TableHead className="hidden md:table-cell">Created By</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="hidden md:table-cell">Sub-Clans</TableHead>
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
                ) : paginatedClans.length > 0 ? (
                  paginatedClans.map((clan) => (
                    <TableRow key={clan.id}>
                      <TableCell className="font-medium">{clan.name}</TableCell>
                      <TableCell className="hidden md:table-cell">{clan.tribe}</TableCell>
                      <TableCell className="hidden md:table-cell">{clan.createdBy}</TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={
                            clan.status === "active" ? "border-green-500 text-green-600" : "border-red-500 text-red-600"
                          }
                        >
                          {clan.status === "active" ? "Active" : "Inactive"}
                        </Badge>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">{clan.subClansCount}</TableCell>
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
                            <DropdownMenuItem onClick={() => handleView(clan)}>
                              <Eye className="mr-2 h-4 w-4" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleEdit(clan)}>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit Clan
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => handleDelete(clan)}
                              className="text-red-600 focus:text-red-600"
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete Clan
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-6 text-muted-foreground">
                      No clans found. Try a different search or add a new clan.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          {filteredClans.length > 0 && (
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

      {/* Add Clan Drawer */}
      <AddClanDrawer
        open={isAddDrawerOpen}
        onClose={() => setIsAddDrawerOpen(false)}
        onAdd={handleAddClan}
        tribes={tribes}
        isLoading={isLoading}
      />

      {/* Edit Clan Modal */}
      {selectedClan && (
        <EditClanModal
          open={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          onSave={handleEditClan}
          clan={selectedClan}
          tribes={tribes}
          isLoading={isLoading}
        />
      )}

      {/* Delete Clan Dialog */}
      {selectedClan && (
        <DeleteClanDialog
          open={isDeleteDialogOpen}
          onClose={() => setIsDeleteDialogOpen(false)}
          onDelete={() => handleDeleteClan(selectedClan.id)}
          clanName={selectedClan.name}
          isLoading={isLoading}
        />
      )}

      {/* View Clan Drawer */}
      {selectedClan && (
        <ViewClanDrawer open={isViewDrawerOpen} onClose={() => setIsViewDrawerOpen(false)} clan={selectedClan} />
      )}
    </div>
  )
}
