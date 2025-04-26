"use client"

import { useState } from "react"
import { Trash } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { toast } from "@/components/ui/use-toast"

interface DeleteEventDialogProps {
  event: any
  open: boolean
  onClose: () => void
}

export default function DeleteEventDialog({ event, open, onClose }: DeleteEventDialogProps) {
  const [isDeleting, setIsDeleting] = useState(false)

  if (!event) return null

  const handleDelete = () => {
    setIsDeleting(true)

    // Simulate API call
    setTimeout(() => {
      console.log("Deleting event", event.id)
      toast({
        title: "Event deleted",
        description: "The event has been permanently deleted.",
      })
      setIsDeleting(false)
      onClose()
    }, 1000)
  }

  return (
    <AlertDialog open={open} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the event "{event.title}" and remove all
            associated data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
          <Button variant="destructive" onClick={handleDelete} disabled={isDeleting} className="gap-2">
            <Trash className="h-4 w-4" />
            {isDeleting ? "Deleting..." : "Delete Event"}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
