"use client"

import { Button } from "@/components/ui/button"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer"
import { Badge } from "@/components/ui/badge"
import { Calendar, Check, X } from "lucide-react"

interface ViewRoleDrawerProps {
  open: boolean
  onClose: () => void
  role: any
  permissionGroups: {
    name: string
    permissions: { id: string; label: string }[]
  }[]
}

export function ViewRoleDrawer({ open, onClose, role, permissionGroups }: ViewRoleDrawerProps) {
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
    <Drawer open={open} onOpenChange={onClose}>
      <DrawerContent className="max-h-[90vh]">
        <DrawerHeader className="text-left">
          <DrawerTitle className="text-2xl font-poppins flex items-center gap-2">
            {role.name}
            {role.isSystem && (
              <Badge variant="outline" className="bg-[#F8F9FA] text-[#0A1931] border-[#E9ECEF]">
                System
              </Badge>
            )}
          </DrawerTitle>
          <DrawerDescription>Role details and permissions</DrawerDescription>
        </DrawerHeader>
        <div className="px-4 overflow-y-auto">
          <div className="space-y-6 pb-6">
            <div className="flex justify-between items-center">
              <div className="flex items-center text-sm text-muted-foreground">
                <Calendar className="mr-1 h-4 w-4" />
                Created on {formatDate(role.createdAt)}
              </div>
              <Badge variant="outline" className="border-blue-500 text-blue-600">
                {role.usersCount} User{role.usersCount !== 1 ? "s" : ""}
              </Badge>
            </div>

            <div className="space-y-2">
              <h3 className="font-medium">Description</h3>
              <p className="text-muted-foreground">{role.description}</p>
            </div>

            <div className="space-y-4">
              <h3 className="font-medium">Permissions</h3>
              <div className="border rounded-md divide-y">
                {permissionGroups.map((group) => (
                  <div key={group.name} className="p-4">
                    <h4 className="text-sm font-medium mb-3">{group.name}</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {group.permissions.map((permission) => (
                        <div key={permission.id} className="flex items-center gap-2">
                          {role.permissions[permission.id] ? (
                            <Check className="h-4 w-4 text-green-500" />
                          ) : (
                            <X className="h-4 w-4 text-red-500" />
                          )}
                          <span className={role.permissions[permission.id] ? "font-medium" : "text-muted-foreground"}>
                            {permission.label}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {role.usersCount > 0 && (
              <div className="border-t pt-4">
                <h3 className="font-medium mb-2">Users with this role</h3>
                <div className="bg-muted p-4 rounded-md">
                  <p className="text-sm">
                    This role is currently assigned to <span className="font-medium">{role.usersCount}</span> user
                    {role.usersCount !== 1 ? "s" : ""}.
                  </p>
                  <Button variant="link" className="p-0 h-auto text-[#185ADB] mt-1">
                    View Users
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
        <DrawerFooter>
          <DrawerClose asChild>
            <Button variant="outline">Close</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
