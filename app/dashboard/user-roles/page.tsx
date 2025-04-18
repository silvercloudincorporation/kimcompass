"use client"

import { useState } from "react"
import { Edit, MoreHorizontal, Plus, Search, Trash2, Eye, Shield } from "lucide-react"
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
import { AddRoleModal } from "@/components/roles/add-role-modal"
import { EditRoleModal } from "@/components/roles/edit-role-modal"
import { DeleteRoleDialog } from "@/components/roles/delete-role-dialog"
import { ViewRoleDrawer } from "@/components/roles/view-role-drawer"

// Mock data for user roles
const initialRoles = [
  {
    id: "1",
    name: "Super Admin",
    description: "Full access to all system features and settings",
    usersCount: 2,
    createdAt: "2023-01-10T09:00:00Z",
    permissions: {
      dashboard: true,
      users: true,
      clans: true,
      ethnicGroups: true,
      events: true,
      payments: true,
      reports: true,
      settings: true,
    },
    isSystem: true,
  },
  {
    id: "2",
    name: "Admin",
    description: "Administrative access with limited system settings",
    usersCount: 5,
    createdAt: "2023-01-15T10:30:00Z",
    permissions: {
      dashboard: true,
      users: true,
      clans: true,
      ethnicGroups: true,
      events: true,
      payments: true,
      reports: true,
      settings: false,
    },
    isSystem: true,
  },
  {
    id: "3",
    name: "Editor",
    description: "Can edit content but cannot manage users or settings",
    usersCount: 8,
    createdAt: "2023-02-05T14:45:00Z",
    permissions: {
      dashboard: true,
      users: false,
      clans: true,
      ethnicGroups: true,
      events: true,
      payments: false,
      reports: false,
      settings: false,
    },
    isSystem: true,
  },
  {
    id: "4",
    name: "Viewer",
    description: "Read-only access to dashboard and content",
    usersCount: 12,
    createdAt: "2023-02-10T11:20:00Z",
    permissions: {
      dashboard: true,
      users: false,
      clans: false,
      ethnicGroups: false,
      events: false,
      payments: false,
      reports: false,
      settings: false,
    },
    isSystem: true,
  },
  {
    id: "5",
    name: "Content Manager",
    description: "Manages clan and ethnic group content",
    usersCount: 3,
    createdAt: "2023-03-20T16:30:00Z",
    permissions: {
      dashboard: true,
      users: false,
      clans: true,
      ethnicGroups: true,
      events: false,
      payments: false,
      reports: true,
      settings: false,
    },
    isSystem: false,
  },
  {
    id: "6",
    name: "Events Coordinator",
    description: "Manages events and related content",
    usersCount: 4,
    createdAt: "2023-04-15T13:15:00Z",
    permissions: {
      dashboard: true,
      users: false,
      clans: false,
      ethnicGroups: false,
      events: true,
      payments: false,
      reports: true,
      settings: false,
    },
    isSystem: false,
  },
]

// Available permissions for checkbox matrix
const permissionGroups = [
  {
    name: "Access",
    permissions: [
      { id: "dashboard", label: "Dashboard" },
      { id: "users", label: "Users Management" },
      { id: "clans", label: "Clans Management" },
      { id: "ethnicGroups", label: "Ethnic Groups" },
    ],
  },
  {
    name: "Operations",
    permissions: [
      { id: "events", label: "Events Management" },
      { id: "payments", label: "Payment Processing" },
      { id: "reports", label: "Reports & Analytics" },
      { id: "settings", label: "System Settings" },
    ],
  },
]

export default function UserRolesPage() {
  const { toast } = useToast()
  const [roles, setRoles] = useState(initialRoles)
  const [searchTerm, setSearchTerm] = useState("")
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [isViewDrawerOpen, setIsViewDrawerOpen] = useState(false)
  const [selectedRole, setSelectedRole] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5

  // Filter roles based on search term
  const filteredRoles = roles.filter((role) => {
    return (
      role.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      role.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })

  // Calculate pagination
  const totalPages = Math.ceil(filteredRoles.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedRoles = filteredRoles.slice(startIndex, startIndex + itemsPerPage)

  const handleAddRole = (newRole: any) => {
    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      const id = (roles.length + 1).toString()
      setRoles([
        ...roles,
        {
          ...newRole,
          id,
          usersCount: 0,
          createdAt: new Date().toISOString(),
          isSystem: false,
        },
      ])
      setIsAddModalOpen(false)
      setIsLoading(false)
      toast({
        title: "Role Added",
        description: `${newRole.name} role has been successfully created.`,
      })
    }, 1000)
  }

  const handleEditRole = (updatedRole: any) => {
    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      setRoles(roles.map((role) => (role.id === updatedRole.id ? { ...role, ...updatedRole } : role)))
      setIsEditModalOpen(false)
      setIsLoading(false)
      toast({
        title: "Role Updated",
        description: `${updatedRole.name} role has been successfully updated.`,
      })
    }, 1000)
  }

  const handleDeleteRole = (id: string) => {
    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      setRoles(roles.filter((role) => role.id !== id))
      setIsDeleteDialogOpen(false)
      setIsLoading(false)
      toast({
        title: "Role Deleted",
        description: "The role has been successfully deleted.",
        variant: "destructive",
      })
    }, 1000)
  }

  const handleEdit = (role: any) => {
    setSelectedRole(role)
    setIsEditModalOpen(true)
  }

  const handleDelete = (role: any) => {
    setSelectedRole(role)
    setIsDeleteDialogOpen(true)
  }

  const handleView = (role: any) => {
    setSelectedRole(role)
    setIsViewDrawerOpen(true)
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(date)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-poppins font-medium text-[#0A1931]">User Roles</h1>
          <p className="text-muted-foreground">Manage user roles and their permissions</p>
        </div>
        <Button className="bg-[#0A1931] hover:bg-[#0A1931]/90 w-full sm:w-auto" onClick={() => setIsAddModalOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add New Role
        </Button>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>User Roles</CardTitle>
          <CardDescription>A list of all user roles in the system with their assigned permissions.</CardDescription>

          <div className="mt-4 relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search roles..."
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
                  <TableHead>Role Name</TableHead>
                  <TableHead className="hidden md:table-cell">Description</TableHead>
                  <TableHead>Users</TableHead>
                  <TableHead className="hidden md:table-cell">Created</TableHead>
                  <TableHead>Type</TableHead>
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
                        <Skeleton className="h-6 w-[250px]" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-6 w-[50px]" />
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        <Skeleton className="h-6 w-[100px]" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-6 w-[80px]" />
                      </TableCell>
                      <TableCell className="text-right">
                        <Skeleton className="h-8 w-[40px] ml-auto" />
                      </TableCell>
                    </TableRow>
                  ))
                ) : paginatedRoles.length > 0 ? (
                  paginatedRoles.map((role) => (
                    <TableRow key={role.id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-2">
                          {role.name}
                          {role.isSystem && (
                            <Badge variant="outline" className="bg-[#F8F9FA] text-[#0A1931] border-[#E9ECEF]">
                              <Shield className="mr-1 h-3 w-3 text-[#185ADB]" />
                              System
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell max-w-[300px] truncate">{role.description}</TableCell>
                      <TableCell>{role.usersCount}</TableCell>
                      <TableCell className="hidden md:table-cell">{formatDate(role.createdAt)}</TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={
                            role.isSystem ? "border-blue-500 text-blue-600" : "border-green-500 text-green-600"
                          }
                        >
                          {role.isSystem ? "System" : "Custom"}
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
                            <DropdownMenuItem onClick={() => handleView(role)}>
                              <Eye className="mr-2 h-4 w-4" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => handleEdit(role)}
                              disabled={role.isSystem}
                              className={role.isSystem ? "opacity-50 cursor-not-allowed" : ""}
                            >
                              <Edit className="mr-2 h-4 w-4" />
                              Edit Role
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => handleDelete(role)}
                              disabled={role.isSystem}
                              className={
                                role.isSystem ? "opacity-50 cursor-not-allowed" : "text-red-600 focus:text-red-600"
                              }
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete Role
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-6 text-muted-foreground">
                      No roles found. Try a different search or add a new role.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          {filteredRoles.length > 0 && (
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

      {/* Add Role Modal */}
      <AddRoleModal
        open={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={handleAddRole}
        permissionGroups={permissionGroups}
        isLoading={isLoading}
      />

      {/* Edit Role Modal */}
      {selectedRole && (
        <EditRoleModal
          open={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          onSave={handleEditRole}
          role={selectedRole}
          permissionGroups={permissionGroups}
          isLoading={isLoading}
        />
      )}

      {/* Delete Role Dialog */}
      {selectedRole && (
        <DeleteRoleDialog
          open={isDeleteDialogOpen}
          onClose={() => setIsDeleteDialogOpen(false)}
          onDelete={() => handleDeleteRole(selectedRole.id)}
          roleName={selectedRole.name}
          usersCount={selectedRole.usersCount}
          isLoading={isLoading}
        />
      )}

      {/* View Role Drawer */}
      {selectedRole && (
        <ViewRoleDrawer
          open={isViewDrawerOpen}
          onClose={() => setIsViewDrawerOpen(false)}
          role={selectedRole}
          permissionGroups={permissionGroups}
        />
      )}
    </div>
  )
}
