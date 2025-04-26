"use client"

import { CheckCircle } from "lucide-react"
import type { VerificationItem } from "./mock-verification-data"
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

interface ApproveVerificationDialogProps {
  open: boolean
  item: VerificationItem | null
  onClose: () => void
  onApprove: () => void
}

export function ApproveVerificationDialog({ open, item, onClose, onApprove }: ApproveVerificationDialogProps) {
  if (!item) return null

  return (
    <AlertDialog open={open} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Approve Verification</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to approve <span className="font-medium">{item.name}</span>? This will add the
            information to the system and make it visible to all users.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={onApprove} className="bg-green-600 hover:bg-green-700">
            <CheckCircle className="mr-2 h-4 w-4" />
            Approve
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
