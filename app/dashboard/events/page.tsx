import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import EventsTable from "@/components/events/events-table"
import EventsFilters from "@/components/events/events-filters"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import Link from "next/link"

export default function EventsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Events Management</h1>
        <p className="text-muted-foreground">View and manage all events in the KimCompass platform.</p>
      </div>

      <div className="flex items-center justify-between">
        <EventsFilters />
        <Button asChild>
          <Link href="/dashboard/events/create">
            <PlusCircle className="mr-2 h-4 w-4" />
            Create Event
          </Link>
        </Button>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all">All Events</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="approved">Approved</TabsTrigger>
          <TabsTrigger value="published">Published</TabsTrigger>
        </TabsList>
        <TabsContent value="all">
          <EventsTable filter="all" />
        </TabsContent>
        <TabsContent value="pending">
          <EventsTable filter="pending" />
        </TabsContent>
        <TabsContent value="approved">
          <EventsTable filter="approved" />
        </TabsContent>
        <TabsContent value="published">
          <EventsTable filter="published" />
        </TabsContent>
      </Tabs>
    </div>
  )
}
