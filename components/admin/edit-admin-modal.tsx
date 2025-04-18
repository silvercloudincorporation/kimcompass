"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Loader2 } from "lucide-react"

// Form schema
const formSchema = z.object({
  id: z.string(),
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  role: z.string().min(1, { message: "Please select a role." }),
  permissions: z.record(z.boolean()).refine(
    (data) => {
      // Ensure at least dashboard permission is granted
      return data.dashboard === true
    },
    {
      message: "Dashboard access is required for all admin users.",
      path: ["permissions"],
    },
  ),
})

type FormValues = z.infer<typeof formSchema>

interface EditAdminModalProps {
  open: boolean
  onClose: () => void
  onSave: (data: any) => void
  admin: any
  roles: { id: string; name: string }[]
  permissionGroups: {
    name: string
    permissions: { id: string; label: string }[]
  }[]
  isLoading: boolean
}

export function EditAdminModal({
  open,
  onClose,
  onSave,
  admin,
  roles,
  permissionGroups,
  isLoading,
}: EditAdminModalProps) {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: admin.id,
      name: admin.name,
      email: admin.email,
      role: admin.role,
      permissions: admin.permissions,
    },
  })

  const onSubmit = (data: FormValues) => {
    onSave({
      id: data.id,
      name: data.name,
      email: data.email,
      role: data.role,
      permissions: data.permissions,
    })
  }

  const selectedRole = form.watch("role")

  // Auto-select permissions based on role
  const handleRoleChange = (role: string) => {
    form.setValue("role", role)

    // Set permissions based on role
    if (role === "Super Admin") {
      // Super Admin gets all permissions
      permissionGroups.forEach((group) => {
        group.permissions.forEach((permission) => {
          form.setValue(`permissions.${permission.id}`, true)
        })
      })
    } else if (role === "Admin") {
      // Admin gets most permissions except settings
      permissionGroups.forEach((group) => {
        group.permissions.forEach((permission) => {
          form.setValue(`permissions.${permission.id}`, permission.id !== "settings")
        })
      })
    } else if (role === "Editor") {
      // Editor gets content permissions
      const editorPermissions = ["dashboard", "clans", "ethnicGroups", "events"]
      permissionGroups.forEach((group) => {
        group.permissions.forEach((permission) => {
          form.setValue(`permissions.${permission.id}`, editorPermissions.includes(permission.id))
        })
      })
    } else if (role === "Viewer") {
      // Viewer only gets dashboard access
      permissionGroups.forEach((group) => {
        group.permissions.forEach((permission) => {
          form.setValue(`permissions.${permission.id}`, permission.id === "dashboard")
        })
      })
    }
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Admin User</DialogTitle>
          <DialogDescription>Update administrator account details and permissions.</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter full name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email Address</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter email address" type="email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Role</FormLabel>
                  <Select onValueChange={handleRoleChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a role" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {roles.map((role) => (
                        <SelectItem key={role.id} value={role.name}>
                          {role.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>Changing the role will update the default permissions.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div>
              <h3 className="text-sm font-medium mb-3">Permissions</h3>
              <div className="border rounded-md p-4 space-y-6">
                {permissionGroups.map((group) => (
                  <div key={group.name} className="space-y-3">
                    <h4 className="text-sm font-medium text-muted-foreground">{group.name}</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {group.permissions.map((permission) => (
                        <FormField
                          key={permission.id}
                          control={form.control}
                          name={`permissions.${permission.id}`}
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                              <FormControl>
                                <Checkbox
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                  disabled={permission.id === "dashboard"} // Dashboard is always required
                                />
                              </FormControl>
                              <div className="space-y-1 leading-none">
                                <FormLabel className="text-sm font-normal">
                                  {permission.label}
                                  {permission.id === "dashboard" && (
                                    <span className="ml-2 text-xs text-muted-foreground">(Required)</span>
                                  )}
                                </FormLabel>
                              </div>
                            </FormItem>
                          )}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <FormMessage className="mt-2">{form.formState.errors.permissions?.message ? String(form.formState.errors.permissions?.message) : ''}</FormMessage>
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  "Save Changes"
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
