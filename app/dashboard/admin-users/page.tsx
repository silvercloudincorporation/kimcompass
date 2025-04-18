"use client"

import { useState } from "react"
import { Edit, MoreHorizontal, Plus, Search, Shield, User, UserX } from "lucide-react"
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AddAdminModal } from "@/components/admin/add-admin-modal"
import { EditAdminModal } from "@/components/admin/edit-admin-modal"
import { SuspendAdminDialog } from "@/components/admin/suspend-admin-dialog"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface Roles {id: string, name: string}
interface permission {id: string, label: string}
interface PermissionGroup {name: string, permissions: permission[]}

// Mock data for admin users
const initialAdmins = [
  {
    id: "1",
    name: "John Doe",
    email: "john.doe@kimcompass.com",
    role: "Super Admin",
    status: "active",
    avatar: "/placeholder-user.jpg",
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
    lastLogin: "2023-05-15T10:30:00Z",
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane.smith@kimcompass.com",
    role: "Admin",
    status: "active",
    avatar: "/placeholder-user.jpg",
    permissions: {
      dashboard: true,
      users: true,
      clans: true,
      ethnicGroups: true,
      events: true,
      payments: false,
      reports: true,
      settings: false,
    },
    lastLogin: "2023-05-14T14:45:00Z",
  },
  {
    id: "3",
    name: "Michael Johnson",
    email: "michael.johnson@kimcompass.com",
    role: "Editor",
    status: "active",
    avatar: "/placeholder-user.jpg",
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
    lastLogin: "2023-05-13T09:15:00Z",
  },
  {
    id: "4",
    name: "Sarah Williams",
    email: "sarah.williams@kimcompass.com",
    role: "Viewer",
    status: "inactive",
    avatar: "/placeholder-user.jpg",
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
    lastLogin: "2023-05-10T11:20:00Z",
  },
  {
    id: "5",
    name: "David Brown",
    email: "david.brown@kimcompass.com",
    role: "Admin",
    status: "active",
    avatar: "/placeholder-user.jpg",
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
    lastLogin: "2023-05-12T16:30:00Z",
  },
]

// Available roles for dropdown
const roles: Roles[] = [
  { id: "1", name: "Super Admin" },
  { id: "2", name: "Admin" },
  { id: "3", name: "Editor" },
  { id: "4", name: "Viewer" },
]

// Available permissions for checkbox matrix
const permissionGroups: PermissionGroup[] = [
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

export default function AdminUsersPage() {
  const { toast } = useToast()
  const [admins, setAdmins] = useState(initialAdmins)
  const [searchTerm, setSearchTerm] = useState("")
  const [roleFilter, setRoleFilter] = useState("")
  const [statusFilter, setStatusFilter] = useState("")
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isSuspendDialogOpen, setIsSuspendDialogOpen] = useState(false)
  const [selectedAdmin, setSelectedAdmin] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5

  // Filter admins based on search term, role, and status
  const filteredAdmins = admins.filter((admin) => {
    const matchesSearch =
      admin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      admin.email.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesRole = roleFilter ? admin.role === roleFilter : true
    const matchesStatus = statusFilter ? admin.status === statusFilter : true

    return matchesSearch && matchesRole && matchesStatus
  })

  // Calculate pagination
  const totalPages = Math.ceil(filteredAdmins.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedAdmins = filteredAdmins.slice(startIndex, startIndex + itemsPerPage)

  const handleAddAdmin = (newAdmin: any) => {
    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      const id = (admins.length + 1).toString()
      setAdmins([
        ...admins,
        {
          ...newAdmin,
          id,
          avatar: "/placeholder-user.jpg",
          lastLogin: new Date().toISOString(),
        },
      ])
      setIsAddModalOpen(false)
      setIsLoading(false)
      toast({
        title: "Admin Added",
        description: `${newAdmin.name} has been successfully added as ${newAdmin.role}.`,
      })
    }, 1000)
  }

  const handleEditAdmin = (updatedAdmin: any) => {
    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      setAdmins(admins.map((admin) => (admin.id === updatedAdmin.id ? { ...admin, ...updatedAdmin } : admin)))
      setIsEditModalOpen(false)
      setIsLoading(false)
      toast({
        title: "Admin Updated",
        description: `${updatedAdmin.name}'s information has been successfully updated.`,
      })
    }, 1000)
  }

  const handleSuspendAdmin = (id: string) => {
    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      setAdmins(
        admins.map((admin) =>
          admin.id === id ? { ...admin, status: admin.status === "active" ? "inactive" : "active" } : admin,
        ),
      )
      setIsSuspendDialogOpen(false)
      setIsLoading(false)

      const admin = admins.find((a) => a.id === id)
      const newStatus = admin?.status === "active" ? "inactive" : "active"

      toast({
        title: newStatus === "inactive" ? "Admin Suspended" : "Admin Activated",
        description: `${admin?.name} has been ${newStatus === "inactive" ? "suspended" : "activated"}.`,
        variant: newStatus === "inactive" ? "destructive" : "default",
      })
    }, 1000)
  }

  const handleEdit = (admin: any) => {
    setSelectedAdmin(admin)
    setIsEditModalOpen(true)
  }

  const handleSuspend = (admin: any) => {
    setSelectedAdmin(admin)
    setIsSuspendDialogOpen(true)
  }

  const resetFilters = () => {
    setSearchTerm("")
    setRoleFilter("")
    setStatusFilter("")
    setCurrentPage(1)
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-poppins font-medium text-[#0A1931]">Admin Users</h1>
          <p className="text-muted-foreground">Manage administrator accounts and permissions</p>
        </div>
        <Button className="bg-[#0A1931] hover:bg-[#0A1931]/90 w-full sm:w-auto" onClick={() => setIsAddModalOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add New Admin
        </Button>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Admin Users</CardTitle>
          <CardDescription>
            A list of all administrators in the system with their roles and permissions.
          </CardDescription>

          <div className="mt-4 flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search by name or email..."
                className="pl-8 w-full"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-2">
              <Select value={roleFilter} onValueChange={setRoleFilter}>
                <SelectTrigger className="w-full sm:w-[150px]">
                  <SelectValue placeholder="Filter by role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Roles</SelectItem>
                  {roles.map((role) => (
                    <SelectItem key={role.id} value={role.name}>
                      {role.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full sm:w-[150px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>

              <Button variant="outline" onClick={resetFilters} className="w-full sm:w-auto">
                Reset Filters
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader className="sticky top-0 bg-muted">
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead className="hidden md:table-cell">Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="hidden md:table-cell">Last Login</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  // Loading skeleton
                  Array.from({ length: 5 }).map((_, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Skeleton className="h-8 w-8 rounded-full" />
                          <Skeleton className="h-6 w-[150px]" />
                        </div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        <Skeleton className="h-6 w-[180px]" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-6 w-[100px]" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-6 w-[80px]" />
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        <Skeleton className="h-6 w-[120px]" />
                      </TableCell>
                      <TableCell className="text-right">
                        <Skeleton className="h-8 w-[40px] ml-auto" />
                      </TableCell>
                    </TableRow>
                  ))
                ) : paginatedAdmins.length > 0 ? (
                  paginatedAdmins.map((admin) => (
                    <TableRow key={admin.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={admin.avatar || "/placeholder.svg"} alt={admin.name} />
                            <AvatarFallback>
                              {admin.name.charAt(0)}
                              {admin.name.split(" ")[1]?.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{admin.name}</p>
                            <p className="text-xs text-muted-foreground md:hidden">{admin.email}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">{admin.email}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-[#F8F9FA] text-[#0A1931] border-[#E9ECEF]">
                          {admin.role === "Super Admin" ? (
                            <Shield className="mr-1 h-3 w-3 text-[#185ADB]" />
                          ) : admin.role === "Admin" ? (
                            <User className="mr-1 h-3 w-3 text-[#185ADB]" />
                          ) : null}
                          {admin.role}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={
                            admin.status === "active"
                              ? "border-green-500 text-green-600"
                              : "border-red-500 text-red-600"
                          }
                        >
                          {admin.status === "active" ? "Active" : "Inactive"}
                        </Badge>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">{formatDate(admin.lastLogin)}</TableCell>
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
                            <DropdownMenuItem onClick={() => handleEdit(admin)}>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit Admin
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => handleSuspend(admin)}
                              className={
                                admin.status === "active"
                                  ? "text-red-600 focus:text-red-600"
                                  : "text-green-600 focus:text-green-600"
                              }
                            >
                              <UserX className="mr-2 h-4 w-4" />
                              {admin.status === "active" ? "Suspend Admin" : "Activate Admin"}
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-6 text-muted-foreground">
                      No admin users found. Try a different search or add a new admin.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          {filteredAdmins.length > 0 && (
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

      {/* Add Admin Modal */}
      <AddAdminModal
        open={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={handleAddAdmin}
        roles={roles}
        permissionGroups={permissionGroups}
        isLoading={isLoading}
      />

      {/* Edit Admin Modal */}
      {selectedAdmin && (
        <EditAdminModal
          open={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          onSave={handleEditAdmin}
          admin={selectedAdmin}
          roles={roles}
          permissionGroups={permissionGroups}
          isLoading={isLoading}
        />
      )}

      {/* Suspend Admin Dialog */}
      {selectedAdmin && (
        <SuspendAdminDialog
          open={isSuspendDialogOpen}
          onClose={() => setIsSuspendDialogOpen(false)}
          onConfirm={() => handleSuspendAdmin(selectedAdmin.id)}
          admin={selectedAdmin}
          isLoading={isLoading}
        />
      )}
    </div>
  )
}
