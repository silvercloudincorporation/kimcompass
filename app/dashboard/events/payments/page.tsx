import type { Metadata } from "next"
import EventsPaymentTable from "@/components/events/events-payment-table"
import EventsFilters from "@/components/events/events-filters"

export const metadata: Metadata = {
  title: "Event Payments | KimCompass Admin",
  description: "Manage event payments in the KimCompass platform",
}

export default function EventPaymentsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Event Payments</h1>
        <p className="text-muted-foreground">Track and manage payments for events.</p>
      </div>

      <div className="flex items-center justify-between">
        <EventsFilters />
      </div>

      <EventsPaymentTable />
    </div>
  )
}
