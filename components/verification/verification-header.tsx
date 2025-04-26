"use client"

import { Button } from "@/components/ui/button"
import { CheckCircle2, RefreshCw, X } from "lucide-react"

interface VerificationHeaderProps {
  selectedItems: string[]
  onBulkApprove: () => void
  onBulkReject: () => void
  onRefresh: () => void
}

export default function VerificationHeader({
  selectedItems,
  onBulkApprove,
  onBulkReject,
  onRefresh,
}: VerificationHeaderProps) {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Verification Center</h1>
        <p className="text-muted-foreground">Review and verify submitted content from community members</p>
      </div>
      <div className="flex items-center gap-2">
        {selectedItems.length > 0 && (
          <>
            <Button variant="default" size="sm" className="bg-green-600 hover:bg-green-700" onClick={onBulkApprove}>
              <CheckCircle2 className="mr-1.5 h-4 w-4" />
              Approve ({selectedItems.length})
            </Button>
            <Button variant="default" size="sm" className="bg-red-600 hover:bg-red-700" onClick={onBulkReject}>
              <X className="mr-1.5 h-4 w-4" />
              Reject ({selectedItems.length})
            </Button>
          </>
        )}
        <Button variant="outline" size="sm" onClick={onRefresh}>
          <RefreshCw className="mr-1.5 h-4 w-4" />
          Refresh
        </Button>
      </div>
    </div>
  )
}
