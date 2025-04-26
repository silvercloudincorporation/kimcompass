"use client"

import { useState } from "react"
import Image from "next/image"
import { format } from "date-fns"
import { CheckCircle, XCircle, Edit, Trash2, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"

interface FamilyHistoryDetailModalProps {
  history: any
  open: boolean
  onClose: () => void
  onEdit: (history: any) => void
  onDelete: (history: any) => void
}

export default function FamilyHistoryDetailModal({
  history,
  open,
  onClose,
  onEdit,
  onDelete,
}: FamilyHistoryDetailModalProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  if (!history) return null

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? history.gallery.length - 1 : prev - 1))
  }

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => (prev === history.gallery.length - 1 ? 0 : prev + 1))
  }

  const handleApprove = () => {
    console.log("Approving history:", history.id)
    // Implementation for approving history
    onClose()
  }

  const handleReject = () => {
    console.log("Rejecting history:", history.id)
    // Implementation for rejecting history
    onClose()
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="text-2xl">{history.title}</DialogTitle>
          <DialogDescription className="flex items-center gap-2">
            <span>Family: {history.family}</span>
            <Badge
              variant={
                history.status === "Published"
                  ? "default"
                  : history.status === "Approved"
                    ? "success"
                    : history.status === "Pending"
                      ? "outline"
                      : "secondary"
              }
            >
              {history.status}
            </Badge>
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="content" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="content">Content</TabsTrigger>
            <TabsTrigger value="gallery">Gallery</TabsTrigger>
          </TabsList>
          <TabsContent value="content">
            <ScrollArea className="h-[400px] pr-4">
              <div className="space-y-4">
                <div className="text-sm text-muted-foreground">
                  <p>Submitted by: {history.submittedBy}</p>
                  <p>Date: {format(new Date(history.submittedDate), "PPP")}</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Summary</h3>
                  <p className="text-muted-foreground">{history.summary}</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Full History</h3>
                  <p className="text-muted-foreground whitespace-pre-line">{history.content}</p>
                </div>
              </div>
            </ScrollArea>
          </TabsContent>
          <TabsContent value="gallery">
            <div className="space-y-4">
              <div className="relative h-[400px] w-full bg-muted rounded-md overflow-hidden">
                {history.gallery && history.gallery.length > 0 ? (
                  <>
                    <Image
                      src={history.gallery[currentImageIndex] || "/placeholder.svg"}
                      alt={`${history.family} family history image ${currentImageIndex + 1}`}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 flex items-center justify-between p-2">
                      <Button
                        variant="secondary"
                        size="icon"
                        className="rounded-full opacity-80 hover:opacity-100"
                        onClick={handlePrevImage}
                      >
                        <ChevronLeft className="h-6 w-6" />
                      </Button>
                      <Button
                        variant="secondary"
                        size="icon"
                        className="rounded-full opacity-80 hover:opacity-100"
                        onClick={handleNextImage}
                      >
                        <ChevronRight className="h-6 w-6" />
                      </Button>
                    </div>
                    <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1">
                      {history.gallery.map((_: any, index: number) => (
                        <span
                          key={index}
                          className={`h-2 w-2 rounded-full ${
                            index === currentImageIndex ? "bg-primary" : "bg-muted-foreground/30"
                          }`}
                        />
                      ))}
                    </div>
                  </>
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <p className="text-muted-foreground">No gallery images available</p>
                  </div>
                )}
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <DialogFooter className="flex justify-between">
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => onEdit(history)}>
              <Edit className="mr-2 h-4 w-4" />
              Edit
            </Button>
            <Button variant="outline" size="sm" onClick={() => onDelete(history)}>
              <Trash2 className="mr-2 h-4 w-4" />
              Delete
            </Button>
          </div>
          {history.status === "Pending" && (
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={handleReject}>
                <XCircle className="mr-2 h-4 w-4" />
                Reject
              </Button>
              <Button size="sm" onClick={handleApprove}>
                <CheckCircle className="mr-2 h-4 w-4" />
                Approve
              </Button>
            </div>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
