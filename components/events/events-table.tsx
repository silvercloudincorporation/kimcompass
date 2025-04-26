"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Eye, MoreHorizontal, Edit, Trash, CheckCircle, XCircle, CreditCard } from "lucide-react"
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
import DeleteEventDialog from "./delete-event-dialog"

interface EventsTableProps {
  filter: "all" | "pending" | "approved" | "published" | "payment-required"
}

export default function EventsTable({ filter }: EventsTableProps) {
  const [page, setPage] = useState(1)
  const [selectedEvent, setSelectedEvent] = useState<any | null>(null)
  const [showDetailsDrawer, setShowDetailsDrawer] = useState(false)
  const [showApproveDialog, setShowApproveDialog] = useState(false)
  const [showRejectDialog, setShowRejectDialog] = useState(false)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)

  // Filter events based on the selected tab
  const filteredEvents = mockEvents.filter((event) => {
    if (filter === "all") return true
    if (filter === "pending") return event.status === "Pending"
    if (filter === "approved") return event.status === "Approved"
    if (filter === "published") return event.status === "Published"
    return true
  })

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

  const handleDelete = (event: any) => {
    setSelectedEvent(event)
    setShowDeleteDialog(true)
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
              <TableHead>Status</TableHead>
              <TableHead>Payment</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredEvents.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-6 text-muted-foreground">
                  No events found
                </TableCell>
              </TableRow>
            ) : (
              filteredEvents.map((event) => (
                <TableRow key={event.id}>
                  <TableCell className="font-medium">{event.title}</TableCell>
                  <TableCell>{event.type}</TableCell>
                  <TableCell>{event.createdBy}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        event.status === "Published"
                          ? "default"
                          : event.status === "Approved"
                            ? "success"
                            : event.status === "Pending"
                              ? "outline"
                              : event.status === "Rejected"
                                ? "destructive"
                                : "secondary"
                      }
                    >
                      {event.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        event.paymentStatus === "Paid"
                          ? "success"
                          : event.paymentStatus === "Required"
                            ? "destructive"
                            : "outline"
                      }
                    >
                      {event.paymentStatus}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => handleViewDetails(event)}>
                          <Eye className="mr-2 h-4 w-4" />
                          View details
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => console.log("Edit event", event.id)}>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        {event.status === "Pending" && (
                          <>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => handleApprove(event)}>
                              <CheckCircle className="mr-2 h-4 w-4" />
                              Approve
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleReject(event)}>
                              <XCircle className="mr-2 h-4 w-4" />
                              Reject
                            </DropdownMenuItem>
                          </>
                        )}
                        {event.paymentStatus === "Required" && (
                          <>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => console.log("Send payment link", event.id)}>
                              <CreditCard className="mr-2 h-4 w-4" />
                              Send payment link
                            </DropdownMenuItem>
                          </>
                        )}
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={() => handleDelete(event)}
                          className="text-destructive focus:text-destructive"
                        >
                          <Trash className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
        <div className="flex items-center justify-between px-4 py-2 border-t">
          <div className="text-sm text-muted-foreground">
            Showing <span className="font-medium">1</span> to <span className="font-medium">10</span> of{" "}
            <span className="font-medium">{filteredEvents.length}</span> events
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

      {/* Delete Event Dialog */}
      <DeleteEventDialog event={selectedEvent} open={showDeleteDialog} onClose={() => setShowDeleteDialog(false)} />
    </>
  )
}
