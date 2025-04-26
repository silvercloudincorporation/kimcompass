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

interface ApprovePaymentDialogProps {
  payment: any
  open: boolean
  onClose: () => void
}

export default function ApprovePaymentDialog({ payment, open, onClose }: ApprovePaymentDialogProps) {
  const handleApprove = () => {
    console.log("Approving payment for event:", payment?.title)
    onClose()
  }

  if (!payment) return null

  return (
    <AlertDialog open={open} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Approve Payment</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to approve the payment for &quot;{payment.title}&quot;? This will mark the payment as
            paid and allow the event to proceed to publication.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleApprove} className="bg-primary text-primary-foreground hover:bg-primary/90">
            Approve
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
