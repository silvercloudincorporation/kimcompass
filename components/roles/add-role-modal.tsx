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
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Loader2 } from "lucide-react"

// Form schema
const formSchema = z.object({
  name: z.string().min(2, { message: "Role name must be at least 2 characters." }),
  description: z.string().min(10, { message: "Description must be at least 10 characters." }),
  permissions: z.record(z.boolean()).refine(
    (data) => {
      // Ensure at least dashboard permission is granted
      return data.dashboard === true
    },
    {
      message: "Dashboard access is required for all roles.",
      path: ["permissions"],
    },
  ),
})

type FormValues = z.infer<typeof formSchema>

interface AddRoleModalProps {
  open: boolean
  onClose: () => void
  onAdd: (data: any) => void
  permissionGroups: {
    name: string
    permissions: { id: string; label: string }[]
  }[]
  isLoading: boolean
}

export function AddRoleModal({ open, onClose, onAdd, permissionGroups, isLoading }: AddRoleModalProps) {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      permissions: {
        dashboard: true, // Dashboard is always required
        users: false,
        clans: false,
        ethnicGroups: false,
        events: false,
        payments: false,
        reports: false,
        settings: false,
      },
    },
  })

  const onSubmit = (data: FormValues) => {
    onAdd({
      name: data.name,
      description: data.description,
      permissions: data.permissions,
    })
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Role</DialogTitle>
          <DialogDescription>Create a new user role with specific permissions.</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Role Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter role name" {...field} />
                  </FormControl>
                  <FormDescription>The name of the role as it will appear in the system.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter a description of the role and its permissions"
                      className="min-h-[100px]"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Provide a clear description of what this role is for and what permissions it grants.
                  </FormDescription>
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
                    Creating...
                  </>
                ) : (
                  "Create Role"
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
