"use client"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"

interface DeleteRoleDialogProps {
  open: boolean
  onClose: () => void
  onDelete: () => void
  roleName: string
  usersCount: number
  isLoading: boolean
}

export function DeleteRoleDialog({ open, onClose, onDelete, roleName, usersCount, isLoading }: DeleteRoleDialogProps) {
  return (
    <AlertDialog open={open} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Role</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete the <span className="font-medium">{roleName}</span> role?
            {usersCount > 0 ? (
              <div className="mt-2 p-3 bg-amber-50 border border-amber-200 rounded-md text-amber-800">
                <p className="font-medium">
                  Warning: This role is currently assigned to {usersCount} user{usersCount !== 1 ? "s" : ""}.
                </p>
                <p className="text-sm mt-1">
                  Deleting this role will remove it from these users. They will need to be assigned a new role.
                </p>
              </div>
            ) : (
              <p className="mt-2">This action cannot be undone.</p>
            )}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button variant="destructive" onClick={onDelete} disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Deleting...
                </>
              ) : (
                "Delete Role"
              )}
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
