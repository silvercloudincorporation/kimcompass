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

interface DeleteFamilyHistoryDialogProps {
  history: any
  open: boolean
  onClose: () => void
}

export default function DeleteFamilyHistoryDialog({ history, open, onClose }: DeleteFamilyHistoryDialogProps) {
  if (!history) return null

  const handleDelete = () => {
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Family history deleted",
        description: `"${history.title}" has been deleted successfully.`,
      })
      onClose()
    }, 500)
  }

  return (
    <AlertDialog open={open} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure you want to delete this family history?</AlertDialogTitle>
          <AlertDialogDescription>
            This will permanently delete <span className="font-medium">"{history.title}"</span>. This action cannot be
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
