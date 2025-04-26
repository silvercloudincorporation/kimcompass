"use client"

import { useState } from "react"
import { format } from "date-fns"
import { CalendarDays, MapPin, Users, Clock, Info, CheckCircle, XCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer"
import { ScrollArea } from "@/components/ui/scroll-area"
import ApproveEventDialog from "./approve-event-dialog"
import RejectEventDialog from "./reject-event-dialog"

interface EventDetailsDrawerProps {
  event: any
  open: boolean
  onClose: () => void
}

export default function EventDetailsDrawer({ event, open, onClose }: EventDetailsDrawerProps) {
  const [showApproveDialog, setShowApproveDialog] = useState(false)
  const [showRejectDialog, setShowRejectDialog] = useState(false)

  if (!event) return null

  const formatDate = (dateString: string) => {
    return format(new Date(dateString), "PPP p")
  }

  const handleApprove = () => {
    setShowApproveDialog(true)
  }

  const handleReject = () => {
    setShowRejectDialog(true)
  }

  return (
    <>
      <Drawer open={open} onOpenChange={onClose}>
        <DrawerContent className="h-[85vh]">
          <DrawerHeader>
            <DrawerTitle className="text-2xl">{event.title}</DrawerTitle>
            <DrawerDescription>
              <div className="flex items-center gap-2 mt-1">
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
                <Badge variant="outline">{event.type}</Badge>
                <Badge variant="outline">{event.visibility}</Badge>
              </div>
            </DrawerDescription>
          </DrawerHeader>
          <ScrollArea className="px-4 h-full pb-8">
            <Tabs defaultValue="details">
              <TabsList className="mb-4">
                <TabsTrigger value="details">Event Details</TabsTrigger>
                <TabsTrigger value="payment">Payment</TabsTrigger>
              </TabsList>
              <TabsContent value="details">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Description</h3>
                    <p className="text-muted-foreground">{event.description}</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-4">
                      <div className="flex items-start gap-2">
                        <CalendarDays className="h-5 w-5 text-muted-foreground mt-0.5" />
                        <div>
                          <h4 className="font-medium">Date & Time</h4>
                          <p className="text-sm text-muted-foreground">Start: {formatDate(event.startDate)}</p>
                          <p className="text-sm text-muted-foreground">End: {formatDate(event.endDate)}</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-2">
                        <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
                        <div>
                          <h4 className="font-medium">Location</h4>
                          <p className="text-sm text-muted-foreground">{event.location}</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-2">
                        <Users className="h-5 w-5 text-muted-foreground mt-0.5" />
                        <div>
                          <h4 className="font-medium">Expected Attendees</h4>
                          <p className="text-sm text-muted-foreground">{event.attendees} people</p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-start gap-2">
                        <Info className="h-5 w-5 text-muted-foreground mt-0.5" />
                        <div>
                          <h4 className="font-medium">Additional Notes</h4>
                          <p className="text-sm text-muted-foreground">{event.notes}</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-2">
                        <Clock className="h-5 w-5 text-muted-foreground mt-0.5" />
                        <div>
                          <h4 className="font-medium">Created</h4>
                          <p className="text-sm text-muted-foreground">By: {event.createdBy}</p>
                          <p className="text-sm text-muted-foreground">On: {formatDate(event.createdAt)}</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-2">
                        <Users className="h-5 w-5 text-muted-foreground mt-0.5" />
                        <div>
                          <h4 className="font-medium">Contact</h4>
                          <p className="text-sm text-muted-foreground">{event.contact}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="payment">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Payment Information</h3>
                    <div className="bg-muted p-4 rounded-md">
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Payment ID:</span>
                          <span className="text-sm font-medium">PAY-{event.id.substring(4)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Payment Date:</span>
                          <span className="text-sm font-medium">
                            {event.paymentStatus === "Paid" ? "April 15, 2024" : "Pending"}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Amount:</span>
                          <span className="text-sm font-medium">KES 5,000</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Payment Method:</span>
                          <span className="text-sm font-medium">
                            {event.paymentStatus === "Paid" ? "M-Pesa" : "Pending"}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Transaction Reference:</span>
                          <span className="text-sm font-medium">
                            {event.paymentStatus === "Paid" ? "MPESA123456789" : "Pending"}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Received By:</span>
                          <span className="text-sm font-medium">
                            {event.paymentStatus === "Paid" ? "John Doe" : "Pending"}
                          </span>
                        </div>
                        <Separator />
                        <div className="flex justify-between font-medium">
                          <span>Status:</span>
                          <span className={event.paymentStatus === "Paid" ? "text-green-600" : "text-amber-600"}>
                            {event.paymentStatus}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {event.paymentStatus !== "Paid" && (
                    <div className="bg-muted p-4 rounded-md">
                      <h4 className="font-medium mb-2">Payment Required</h4>
                      <p className="text-sm text-muted-foreground mb-4">
                        This event requires payment before it can be published.
                      </p>
                      <div className="flex gap-2">
                        <Button variant="outline" className="flex-1">
                          View Payment Details
                        </Button>
                        <Button className="flex-1">Record Payment</Button>
                      </div>
                    </div>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </ScrollArea>
          <DrawerFooter className="pt-2">
            {event.status === "Pending" && (
              <div className="flex gap-2 w-full">
                <Button variant="outline" className="flex-1" onClick={handleReject}>
                  <XCircle className="mr-2 h-4 w-4" />
                  Reject
                </Button>
                <Button className="flex-1" onClick={handleApprove}>
                  <CheckCircle className="mr-2 h-4 w-4" />
                  Approve
                </Button>
              </div>
            )}
            <DrawerClose asChild>
              <Button variant="outline">Close</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>

      {/* Approve Event Dialog */}
      <ApproveEventDialog event={event} open={showApproveDialog} onClose={() => setShowApproveDialog(false)} />

      {/* Reject Event Dialog */}
      <RejectEventDialog event={event} open={showRejectDialog} onClose={() => setShowRejectDialog(false)} />
    </>
  )
}
