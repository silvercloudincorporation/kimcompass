"use client"

import { format } from "date-fns"
import { BookOpen, Building2, Calendar, CheckCircle, Globe, Home, User, Users, Users2, X } from "lucide-react"
import type { VerificationItem } from "./mock-verification-data"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet"

interface ViewVerificationDrawerProps {
  open: boolean
  item: VerificationItem | null
  onClose: () => void
  onApprove: () => void
  onReject: () => void
}

export function ViewVerificationDrawer({ open, item, onClose, onApprove, onReject }: ViewVerificationDrawerProps) {
  if (!item) return null

  const getDataTypeIcon = (dataType: string) => {
    switch (dataType) {
      case "person":
        return <User className="h-5 w-5" />
      case "family":
        return <Home className="h-5 w-5" />
      case "main-clan":
      case "sub-clan":
        return <Users2 className="h-5 w-5" />
      case "ethnic-group":
        return <Users className="h-5 w-5" />
      case "event":
        return <Calendar className="h-5 w-5" />
      case "community":
        return <Building2 className="h-5 w-5" />
      case "family-history":
        return <BookOpen className="h-5 w-5" />
      default:
        return <Globe className="h-5 w-5" />
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return (
          <Badge variant="outline" className="bg-amber-100 text-amber-800 hover:bg-amber-100">
            Pending
          </Badge>
        )
      case "approved":
        return (
          <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-100">
            Approved
          </Badge>
        )
      case "rejected":
        return (
          <Badge variant="outline" className="bg-red-100 text-red-800 hover:bg-red-100">
            Rejected
          </Badge>
        )
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .substring(0, 2)
  }

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent className="sm:max-w-md">
        <SheetHeader>
          <SheetTitle>Verification Details</SheetTitle>
          <SheetDescription>Review the submitted information before making a decision</SheetDescription>
        </SheetHeader>

        <div className="py-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4">
              <div className="p-2 rounded-full bg-secondary flex items-center justify-center">
                {getDataTypeIcon(item.dataType)}
              </div>
              <div>
                <h3 className="text-lg font-semibold">{item.name}</h3>
                <p className="text-sm text-muted-foreground capitalize">{item.dataType.replace("-", " ")}</p>
              </div>
            </div>
            {getStatusBadge(item.status)}
          </div>

          <Separator className="my-4" />

          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-medium">Submitted By</h4>
              <div className="flex items-center mt-1.5 space-x-2">
                <Avatar className="h-6 w-6">
                  <AvatarFallback>{getInitials(item.submittedBy)}</AvatarFallback>
                </Avatar>
                <span>{item.submittedBy}</span>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-medium">Date Submitted</h4>
              <p className="text-sm mt-1.5">{format(new Date(item.dateSubmitted), "PPP 'at' p")}</p>
            </div>

            {item.status === "rejected" && item.rejectReason && (
              <div>
                <h4 className="text-sm font-medium text-red-600">Reason for Rejection</h4>
                <p className="text-sm mt-1.5 text-muted-foreground">{item.rejectReason}</p>
              </div>
            )}

            <div>
              <h4 className="text-sm font-medium">Details</h4>
              <ScrollArea className="h-[240px] mt-1.5 rounded-md border p-4">
                <div className="space-y-3">
                  {Object.entries(item.details).map(([key, value]) => (
                    <div key={key}>
                      <h5 className="text-xs font-medium capitalize">{key.replace(/([A-Z])/g, " $1").trim()}</h5>
                      <p className="text-sm">
                        {Array.isArray(value)
                          ? value.join(", ")
                          : typeof value === "object"
                            ? JSON.stringify(value)
                            : String(value)}
                      </p>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </div>
          </div>
        </div>

        <SheetFooter className="flex-col sm:flex-row gap-2">
          {item.status === "pending" && (
            <>
              <Button onClick={onReject} variant="destructive" className="w-full sm:w-auto">
                <X className="mr-2 h-4 w-4" />
                Reject
              </Button>
              <Button onClick={onApprove} className="w-full sm:w-auto">
                <CheckCircle className="mr-2 h-4 w-4" />
                Approve
              </Button>
            </>
          )}
          <SheetClose asChild>
            <Button variant="outline" className="w-full sm:w-auto">
              Close
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
