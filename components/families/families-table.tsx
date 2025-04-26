"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { Badge } from "@/components/ui/badge"
import { Eye, MoreHorizontal, Pencil, Trash2, Users, UserPlus } from "lucide-react"
import { mockFamilies } from "./mock-families-data"
import { ViewFamilyDrawer } from "./view-family-drawer"
import { AddFamilyMemberModal } from "./add-family-member-modal"
import { EditFamilyModal } from "./edit-family-modal"
import { DeleteFamilyDialog } from "./delete-family-dialog"

export function FamiliesTable() {
  const [viewFamily, setViewFamily] = useState<string | null>(null)
  const [addMemberToFamily, setAddMemberToFamily] = useState<string | null>(null)
  const [editFamily, setEditFamily] = useState<string | null>(null)
  const [deleteFamily, setDeleteFamily] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Active</Badge>
      case "inactive":
        return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">Inactive</Badge>
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Pending</Badge>
      default:
        return <Badge>{status}</Badge>
    }
  }

  const getFamilyTypeLabel = (type: string) => {
    switch (type) {
      case "nuclear":
        return "Nuclear Family"
      case "extended":
        return "Extended Family"
      case "single-parent":
        return "Single Parent"
      case "blended":
        return "Blended Family"
      default:
        return type
    }
  }

  const paginatedFamilies = mockFamilies.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  const totalPages = Math.ceil(mockFamilies.length / itemsPerPage)

  return (
    <>
      <div className="rounded-lg border bg-card">
        <div className="relative w-full overflow-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Family Name</TableHead>
                <TableHead>Head of Family</TableHead>
                <TableHead>Family Type</TableHead>
                <TableHead>Members</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedFamilies.length > 0 ? (
                paginatedFamilies.map((family) => (
                  <TableRow key={family.id}>
                    <TableCell className="font-medium">{family.name}</TableCell>
                    <TableCell>{family.headOfFamily}</TableCell>
                    <TableCell>{getFamilyTypeLabel(family.type)}</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-1" />
                        <span>{family.memberCount}</span>
                      </div>
                    </TableCell>
                    <TableCell>{getStatusBadge(family.status)}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Open menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => setViewFamily(family.id)}>
                            <Eye className="mr-2 h-4 w-4" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => setAddMemberToFamily(family.id)}>
                            <UserPlus className="mr-2 h-4 w-4" />
                            Add Member
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => setEditFamily(family.id)}>
                            <Pencil className="mr-2 h-4 w-4" />
                            Edit Family
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => setDeleteFamily(family.id)} className="text-red-600">
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete Family
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="h-24 text-center">
                    No families found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        <div className="p-4 border-t">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                />
              </PaginationItem>

              {Array.from({ length: totalPages }).map((_, i) => (
                <PaginationItem key={i}>
                  <PaginationLink onClick={() => setCurrentPage(i + 1)} isActive={currentPage === i + 1}>
                    {i + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}

              <PaginationItem>
                <PaginationNext
                  onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                  className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>

      {viewFamily && <ViewFamilyDrawer familyId={viewFamily} open={!!viewFamily} onClose={() => setViewFamily(null)} />}

      {addMemberToFamily && (
        <AddFamilyMemberModal
          familyId={addMemberToFamily}
          open={!!addMemberToFamily}
          onClose={() => setAddMemberToFamily(null)}
        />
      )}

      {editFamily && <EditFamilyModal familyId={editFamily} open={!!editFamily} onClose={() => setEditFamily(null)} />}

      {deleteFamily && (
        <DeleteFamilyDialog familyId={deleteFamily} open={!!deleteFamily} onClose={() => setDeleteFamily(null)} />
      )}
    </>
  )
}
