"use client"

import { useState } from "react"
import { X } from "lucide-react"
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
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

interface RejectVerificationDialogProps {
  open: boolean
  item: VerificationItem | null
  onClose: () => void
  onReject: (reason: string) => void
}

export function RejectVerificationDialog({ open, item, onClose, onReject }: RejectVerificationDialogProps) {
  const [reason, setReason] = useState("")

  if (!item) return null

  const handleReject = () => {
    onReject(reason)
    setReason("")
  }

  return (
    <AlertDialog open={open} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Reject Verification</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to reject <span className="font-medium">{item.name}</span>? Please provide a reason
            for the rejection which will be shared with the submitter.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <div className="py-2">
          <Label htmlFor="reject-reason">Reason for rejection</Label>
          <Textarea
            id="reject-reason"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="Example: Missing important information, needs more details about origins..."
            className="mt-2"
          />
        </div>

        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => setReason("")}>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleReject} className="bg-red-600 hover:bg-red-700" disabled={!reason.trim()}>
            <X className="mr-2 h-4 w-4" />
            Reject
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
