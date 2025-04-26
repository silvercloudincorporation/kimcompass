"use client"

import { useState, useEffect } from "react"
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
import { mockFamilies, type Family } from "./mock-families-data"
import { useToast } from "@/components/ui/use-toast"

interface DeleteFamilyDialogProps {
  familyId: string
  open: boolean
  onClose: () => void
}

export function DeleteFamilyDialog({ familyId, open, onClose }: DeleteFamilyDialogProps) {
  const [family, setFamily] = useState<Family | null>(null)
  const { toast } = useToast()

  useEffect(() => {
    if (familyId) {
      const foundFamily = mockFamilies.find((f) => f.id === familyId)
      setFamily(foundFamily || null)
    }
  }, [familyId])

  const handleDelete = () => {
    // In a real app, this would be an API call
    toast({
      title: "Family Deleted",
      description: `${family?.name} has been deleted successfully.`,
    })

    onClose()
  }

  if (!family) {
    return null
  }

  return (
    <AlertDialog open={open} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action will permanently delete the family "{family.name}" and remove all family relationships. This
            action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete} className="bg-red-600 hover:bg-red-700 text-white">
            Delete Family
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
