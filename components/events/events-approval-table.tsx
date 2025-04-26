"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Eye, CheckCircle, XCircle } from "lucide-react"
import { mockEvents } from "./mock-events-data"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import EventDetailsDrawer from "./event-details-drawer"
import ApproveEventDialog from "./approve-event-dialog"
import RejectEventDialog from "./reject-event-dialog"

export default function EventsApprovalTable() {
  const [page, setPage] = useState(1)
  const [selectedEvent, setSelectedEvent] = useState<any | null>(null)
  const [showDetailsDrawer, setShowDetailsDrawer] = useState(false)
  const [showApproveDialog, setShowApproveDialog] = useState(false)
  const [showRejectDialog, setShowRejectDialog] = useState(false)

  // Filter events to only show pending events
  const pendingEvents = mockEvents.filter((event) => event.status === "Pending")

  const handleViewDetails = (event: any) => {
    setSelectedEvent(event)
    setShowDetailsDrawer(true)
  }

  const handleApprove = (event: any) => {
    setSelectedEvent(event)
    setShowApproveDialog(true)
  }

  const handleReject = (event: any) => {
    setSelectedEvent(event)
    setShowRejectDialog(true)
  }

  return (
    <>
      <div className="rounded-md border bg-white">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Event Title</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Created By</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {pendingEvents.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-6 text-muted-foreground">
                  No pending events found
                </TableCell>
              </TableRow>
            ) : (
              pendingEvents.map((event) => (
                <TableRow key={event.id}>
                  <TableCell className="font-medium">{event.title}</TableCell>
                  <TableCell>{event.type}</TableCell>
                  <TableCell>{event.createdBy}</TableCell>
                  <TableCell>{new Date(event.startDate).toLocaleDateString()}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" size="sm" onClick={() => handleViewDetails(event)}>
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-destructive"
                        onClick={() => handleReject(event)}
                      >
                        <XCircle className="h-4 w-4" />
                      </Button>
                      <Button variant="default" size="sm" onClick={() => handleApprove(event)}>
                        <CheckCircle className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
        <div className="flex items-center justify-between px-4 py-2 border-t">
          <div className="text-sm text-muted-foreground">
            Showing <span className="font-medium">1</span> to{" "}
            <span className="font-medium">{pendingEvents.length}</span> of{" "}
            <span className="font-medium">{pendingEvents.length}</span> pending events
          </div>
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href="#" />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#" isActive>
                  1
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationNext href="#" />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>

      {/* Event Details Drawer */}
      <EventDetailsDrawer event={selectedEvent} open={showDetailsDrawer} onClose={() => setShowDetailsDrawer(false)} />

      {/* Approve Event Dialog */}
      <ApproveEventDialog event={selectedEvent} open={showApproveDialog} onClose={() => setShowApproveDialog(false)} />

      {/* Reject Event Dialog */}
      <RejectEventDialog event={selectedEvent} open={showRejectDialog} onClose={() => setShowRejectDialog(false)} />
    </>
  )
}
