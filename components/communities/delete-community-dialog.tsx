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
import { toast } from "@/components/ui/use-toast"

interface DeleteCommunityDialogProps {
  community: any
  open: boolean
  onClose: () => void
}

export default function DeleteCommunityDialog({ community, open, onClose }: DeleteCommunityDialogProps) {
  if (!community) return null

  const handleDelete = () => {
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Community deleted",
        description: `"${community.name}" has been deleted successfully.`,
      })
      onClose()
    }, 500)
  }

  return (
    <AlertDialog open={open} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure you want to delete this community?</AlertDialogTitle>
          <AlertDialogDescription>
            This will permanently delete <span className="font-medium">"{community.name}"</span>. This action cannot be
            undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
