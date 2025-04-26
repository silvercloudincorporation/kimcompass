"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MoreHorizontal, Eye, Edit, Trash2, Link, UserMinus } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { PersonDetailsDrawer } from "@/components/people/person-details-drawer"
import { EditPersonModal } from "@/components/people/edit-person-modal"
import { DeletePersonDialog } from "@/components/people/delete-person-dialog"
import { RecordDeathModal } from "@/components/people/record-death-modal"
import { LinkFamilyModal } from "@/components/people/link-family-modal"
import { mockPeopleData } from "@/components/people/mock-data"

interface PeopleTableProps {
  type: "accounts" | "births" | "deaths" | "linkages" | "all"
  filters: {
    name: string
    status: string
    family: string
    gender: string
    lifeStatus: string
  }
}

export default function PeopleTable({ type, filters }: PeopleTableProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedPerson, setSelectedPerson] = useState<any>(null)
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)
  const [isRecordDeathOpen, setIsRecordDeathOpen] = useState(false)
  const [isLinkFamilyOpen, setIsLinkFamilyOpen] = useState(false)

  const itemsPerPage = 10

  // Filter data based on type and filters
  const filteredData = mockPeopleData.filter((person) => {
    // Filter by tab type
    if (type === "births" && !person.birthRecord) return false
    if (type === "deaths" && person.lifeStatus !== "deceased") return false
    if (type === "linkages" && person.familyLinks.length === 0) return false

    // Apply filters
    if (filters.name && !person.name.toLowerCase().includes(filters.name.toLowerCase())) return false
    if (filters.status && person.status !== filters.status) return false
    if (filters.family && !person.family.toLowerCase().includes(filters.family.toLowerCase())) return false
    if (filters.gender && person.gender !== filters.gender) return false
    if (filters.lifeStatus && person.lifeStatus !== filters.lifeStatus) return false

    return true
  })

  // Calculate pagination
  const totalPages = Math.ceil(filteredData.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedData = filteredData.slice(startIndex, startIndex + itemsPerPage)

  const handleViewDetails = (person: any) => {
    setSelectedPerson(person)
    setIsDetailsOpen(true)
  }

  const handleEdit = (person: any) => {
    setSelectedPerson(person)
    setIsEditOpen(true)
  }

  const handleDelete = (person: any) => {
    setSelectedPerson(person)
    setIsDeleteOpen(true)
  }

  const handleRecordDeath = (person: any) => {
    setSelectedPerson(person)
    setIsRecordDeathOpen(true)
  }

  const handleLinkFamily = (person: any) => {
    setSelectedPerson(person)
    setIsLinkFamilyOpen(true)
  }

  return (
    <div>
      <div className="rounded-md border">
        <Table>
          <TableHeader className="bg-muted">
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead className="hidden md:table-cell">Gender</TableHead>
              <TableHead className="hidden md:table-cell">Family</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="hidden md:table-cell">Life Status</TableHead>
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
                    <Skeleton className="h-6 w-[80px]" />
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <Skeleton className="h-6 w-[120px]" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-6 w-[80px]" />
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <Skeleton className="h-6 w-[80px]" />
                  </TableCell>
                  <TableCell className="text-right">
                    <Skeleton className="h-8 w-[40px] ml-auto" />
                  </TableCell>
                </TableRow>
              ))
            ) : paginatedData.length > 0 ? (
              paginatedData.map((person) => (
                <TableRow key={person.id}>
                  <TableCell className="font-medium">{person.name}</TableCell>
                  <TableCell className="hidden md:table-cell">{person.gender}</TableCell>
                  <TableCell className="hidden md:table-cell">{person.family}</TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={
                        person.status === "active" ? "border-green-500 text-green-600" : "border-red-500 text-red-600"
                      }
                    >
                      {person.status === "active" ? "Active" : "Inactive"}
                    </Badge>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <Badge
                      variant="outline"
                      className={
                        person.lifeStatus === "alive"
                          ? "border-green-500 text-green-600"
                          : "border-gray-500 text-gray-600"
                      }
                    >
                      {person.lifeStatus === "alive" ? "Alive" : "Deceased"}
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
                        <DropdownMenuItem onClick={() => handleViewDetails(person)}>
                          <Eye className="mr-2 h-4 w-4" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleEdit(person)}>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit Person
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleDelete(person)}>
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete Person
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => handleLinkFamily(person)}>
                          <Link className="mr-2 h-4 w-4" />
                          Link Family
                        </DropdownMenuItem>
                        {person.lifeStatus === "alive" && (
                          <DropdownMenuItem onClick={() => handleRecordDeath(person)}>
                            <UserMinus className="mr-2 h-4 w-4" />
                            Record Death
                          </DropdownMenuItem>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-6 text-muted-foreground">
                  No people found matching the current filters.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      {filteredData.length > 0 && (
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
                    <PaginationLink isActive={pageNumber === currentPage} onClick={() => setCurrentPage(pageNumber)}>
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

      {/* Person Details Drawer */}
      {selectedPerson && (
        <PersonDetailsDrawer open={isDetailsOpen} onClose={() => setIsDetailsOpen(false)} person={selectedPerson} />
      )}

      {/* Edit Person Modal */}
      {selectedPerson && (
        <EditPersonModal open={isEditOpen} onClose={() => setIsEditOpen(false)} person={selectedPerson} />
      )}

      {/* Delete Person Dialog */}
      {selectedPerson && (
        <DeletePersonDialog open={isDeleteOpen} onClose={() => setIsDeleteOpen(false)} person={selectedPerson} />
      )}

      {/* Record Death Modal */}
      {selectedPerson && (
        <RecordDeathModal
          open={isRecordDeathOpen}
          onClose={() => setIsRecordDeathOpen(false)}
          person={selectedPerson}
        />
      )}

      {/* Link Family Modal */}
      {selectedPerson && (
        <LinkFamilyModal
          open={isLinkFamilyOpen}
          onClose={() => setIsLinkFamilyOpen(false)}
          initialPerson={selectedPerson}
        />
      )}
    </div>
  )
}
