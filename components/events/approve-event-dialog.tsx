"use client"

import { useState } from "react"
import { CheckCircle } from "lucide-react"
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

interface ApproveEventDialogProps {
  event: any
  open: boolean
  onClose: () => void
}

export default function ApproveEventDialog({ event, open, onClose }: ApproveEventDialogProps) {
  const [notes, setNotes] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  if (!event) return null

  const handleApprove = () => {
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      console.log("Approving event", event.id, "with notes:", notes)
      toast({
        title: "Event approved",
        description: "The event has been approved successfully.",
      })
      setIsSubmitting(false)
      setNotes("")
      onClose()
    }, 1000)
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Approve Event</DialogTitle>
          <DialogDescription>
            You are about to approve "{event.title}". This will allow the event to proceed to the next stage.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-2">
          <div>
            <label htmlFor="approval-notes" className="text-sm font-medium">
              Approval Notes (Optional)
            </label>
            <Textarea
              id="approval-notes"
              placeholder="Add any notes or requirements for the event organizer"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="mt-1"
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button onClick={handleApprove} disabled={isSubmitting} className="gap-2">
            <CheckCircle className="h-4 w-4" />
            {isSubmitting ? "Approving..." : "Approve Event"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
