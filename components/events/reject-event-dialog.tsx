"use client"

import { useState } from "react"
import { XCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { toast } from "@/components/ui/use-toast"

interface RejectEventDialogProps {
  event: any
  open: boolean
  onClose: () => void
}

export default function RejectEventDialog({ event, open, onClose }: RejectEventDialogProps) {
  const [reason, setReason] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  if (!event) return null

  const handleReject = () => {
    if (!reason.trim()) {
      toast({
        title: "Rejection reason required",
        description: "Please provide a reason for rejecting this event.",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      console.log("Rejecting event", event.id, "with reason:", reason)
      toast({
        title: "Event rejected",
        description: "The event has been rejected.",
      })
      setIsSubmitting(false)
      setReason("")
      onClose()
    }, 1000)
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Reject Event</DialogTitle>
          <DialogDescription>You are about to reject "{event.title}". This action cannot be undone.</DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-2">
          <div>
            <label htmlFor="rejection-reason" className="text-sm font-medium">
              Rejection Reason <span className="text-destructive">*</span>
            </label>
            <Textarea
              id="rejection-reason"
              placeholder="Provide a reason for rejecting this event"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="mt-1"
              required
            />
            <p className="text-sm text-muted-foreground mt-1">This reason will be shared with the event creator.</p>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={handleReject} disabled={isSubmitting} className="gap-2">
            <XCircle className="h-4 w-4" />
            {isSubmitting ? "Rejecting..." : "Reject Event"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
