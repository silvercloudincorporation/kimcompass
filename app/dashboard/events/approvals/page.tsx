"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Eye, CheckCircle } from "lucide-react"
import { mockEvents } from "@/components/events/mock-events-data"
import EventsFilters from "@/components/events/events-filters"
import EventDetailsDrawer from "@/components/events/event-details-drawer"
import PublishEventDialog from "@/components/events/publish-event-dialog"

export default function EventApprovalsPage() {
  const [selectedEvent, setSelectedEvent] = useState<any | null>(null)
  const [showDetailsDrawer, setShowDetailsDrawer] = useState(false)
  const [showPublishDialog, setShowPublishDialog] = useState(false)

  // Filter events to only show approved events that are not yet published
  const approvedEvents = mockEvents.filter((event) => event.status === "Approved" && event.paymentStatus === "Paid")

  const handleViewDetails = (event: any) => {
    setSelectedEvent(event)
    setShowDetailsDrawer(true)
  }

  const handlePublish = (event: any) => {
    setSelectedEvent(event)
    setShowPublishDialog(true)
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Event Approvals</h1>
        <p className="text-muted-foreground">Publish approved events that have completed payment.</p>
      </div>

      <div className="flex items-center justify-between">
        <EventsFilters />
      </div>

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
            {approvedEvents.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-6 text-muted-foreground">
                  No approved events ready for publishing
                </TableCell>
              </TableRow>
            ) : (
              approvedEvents.map((event) => (
                <TableRow key={event.id}>
                  <TableCell className="font-medium">{event.title}</TableCell>
                  <TableCell>{event.type}</TableCell>
                  <TableCell>{event.createdBy}</TableCell>
                  <TableCell>
                    <Badge variant="success">{event.status}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="success">{event.paymentStatus}</Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" size="sm" onClick={() => handleViewDetails(event)}>
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="default" size="sm" onClick={() => handlePublish(event)}>
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Publish
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Event Details Drawer */}
      <EventDetailsDrawer event={selectedEvent} open={showDetailsDrawer} onClose={() => setShowDetailsDrawer(false)} />

      {/* Publish Event Dialog */}
      <PublishEventDialog event={selectedEvent} open={showPublishDialog} onClose={() => setShowPublishDialog(false)} />
    </div>
  )
}
