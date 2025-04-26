import type { Metadata } from "next"
import CreateEventForm from "@/components/events/create-event-form"

export const metadata: Metadata = {
  title: "Create Event | KimCompass Admin",
  description: "Create a new event in the KimCompass platform",
}

export default function CreateEventPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Create Event</h1>
        <p className="text-muted-foreground">Create a new event for the KimCompass platform.</p>
      </div>

      <CreateEventForm />
    </div>
  )
}
