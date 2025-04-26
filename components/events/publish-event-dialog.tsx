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

interface PublishEventDialogProps {
  event: any
  open: boolean
  onClose: () => void
}

export default function PublishEventDialog({ event, open, onClose }: PublishEventDialogProps) {
  const handlePublish = () => {
    console.log("Publishing event:", event?.title)
    onClose()
  }

  if (!event) return null

  return (
    <AlertDialog open={open} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Publish Event</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to publish &quot;{event.title}&quot;? This will make the event visible to all users
            according to its visibility settings.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handlePublish} className="bg-primary text-primary-foreground hover:bg-primary/90">
            Publish
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
