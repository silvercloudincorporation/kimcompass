"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Eye, CreditCard, Edit, Trash2, CheckCircle } from "lucide-react"
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
import CreatePaymentModal from "./create-payment-modal"
import EditPaymentModal from "./edit-payment-modal"
import DeletePaymentDialog from "./delete-payment-dialog"
import ApprovePaymentDialog from "./approve-payment-dialog"

export default function EventsPaymentTable() {
  const [page, setPage] = useState(1)
  const [selectedEvent, setSelectedEvent] = useState<any | null>(null)
  const [showDetailsDrawer, setShowDetailsDrawer] = useState(false)
  const [showCreatePaymentModal, setShowCreatePaymentModal] = useState(false)
  const [showEditPaymentModal, setShowEditPaymentModal] = useState(false)
  const [showDeletePaymentDialog, setShowDeletePaymentDialog] = useState(false)
  const [showApprovePaymentDialog, setShowApprovePaymentDialog] = useState(false)

  // Filter events to only show those requiring payment
  const paymentEvents = mockEvents.filter(
    (event) => event.paymentStatus === "Required" || event.paymentStatus === "Paid",
  )

  const handleViewDetails = (event: any) => {
    setSelectedEvent(event)
    setShowDetailsDrawer(true)
  }

  const handleCreatePayment = () => {
    setShowCreatePaymentModal(true)
  }

  const handleEditPayment = (event: any) => {
    setSelectedEvent(event)
    setShowEditPaymentModal(true)
  }

  const handleDeletePayment = (event: any) => {
    setSelectedEvent(event)
    setShowDeletePaymentDialog(true)
  }

  const handleApprovePayment = (event: any) => {
    setSelectedEvent(event)
    setShowApprovePaymentDialog(true)
  }

  return (
    <>
      <div className="flex justify-between mb-4">
        <h2 className="text-xl font-semibold">Event Payments</h2>
        <Button onClick={handleCreatePayment}>
          <CreditCard className="mr-2 h-4 w-4" />
          Create Payment
        </Button>
      </div>

      <div className="rounded-md border bg-white">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Event Title</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Payment Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paymentEvents.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-6 text-muted-foreground">
                  No payments found
                </TableCell>
              </TableRow>
            ) : (
              paymentEvents.map((event) => (
                <TableRow key={event.id}>
                  <TableCell className="font-medium">{event.title}</TableCell>
                  <TableCell>{event.type}</TableCell>
                  <TableCell>KES 5,000</TableCell>
                  <TableCell>{event.paymentStatus === "Paid" ? "April 15, 2024" : "Pending"}</TableCell>
                  <TableCell>
                    <Badge variant={event.paymentStatus === "Paid" ? "success" : "destructive"}>
                      {event.paymentStatus}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" size="sm" onClick={() => handleViewDetails(event)}>
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleEditPayment(event)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleDeletePayment(event)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                      {event.paymentStatus === "Required" && (
                        <Button variant="default" size="sm" onClick={() => handleApprovePayment(event)}>
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Approve
                        </Button>
                      )}
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
            <span className="font-medium">{paymentEvents.length}</span> of{" "}
            <span className="font-medium">{paymentEvents.length}</span> payments
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

      {/* Create Payment Modal */}
      <CreatePaymentModal open={showCreatePaymentModal} onClose={() => setShowCreatePaymentModal(false)} />

      {/* Edit Payment Modal */}
      <EditPaymentModal
        payment={selectedEvent}
        open={showEditPaymentModal}
        onClose={() => setShowEditPaymentModal(false)}
      />

      {/* Delete Payment Dialog */}
      <DeletePaymentDialog
        payment={selectedEvent}
        open={showDeletePaymentDialog}
        onClose={() => setShowDeletePaymentDialog(false)}
      />

      {/* Approve Payment Dialog */}
      <ApprovePaymentDialog
        payment={selectedEvent}
        open={showApprovePaymentDialog}
        onClose={() => setShowApprovePaymentDialog(false)}
      />
    </>
  )
}
