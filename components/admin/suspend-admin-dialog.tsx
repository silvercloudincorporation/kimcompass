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

interface SuspendAdminDialogProps {
  open: boolean
  onClose: () => void
  onConfirm: () => void
  admin: any
  isLoading: boolean
}

export function SuspendAdminDialog({ open, onClose, onConfirm, admin, isLoading }: SuspendAdminDialogProps) {
  const isActivating = admin.status === "inactive"

  return (
    <AlertDialog open={open} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{isActivating ? "Activate Admin User" : "Suspend Admin User"}</AlertDialogTitle>
          <AlertDialogDescription>
            {isActivating
              ? `Are you sure you want to activate ${admin.name}? They will regain access to the system based on their assigned permissions.`
              : `Are you sure you want to suspend ${admin.name}? This will prevent them from accessing the system until reactivated.`}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button variant={isActivating ? "default" : "destructive"} onClick={onConfirm} disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {isActivating ? "Activating..." : "Suspending..."}
                </>
              ) : isActivating ? (
                "Activate User"
              ) : (
                "Suspend User"
              )}
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
