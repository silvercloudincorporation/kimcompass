"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { format } from "date-fns"
import { CalendarIcon, Save } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { MultiSelect } from "@/components/ui/multi-select"
import ImageUpload from "@/components/ui/image-upload"

const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  type: z.string({
    required_error: "Please select an event type",
  }),
  customType: z.string().optional(),
  startDate: z.date({
    required_error: "Start date is required",
  }),
  endDate: z.date({
    required_error: "End date is required",
  }),
  location: z.string().min(1, "Location is required"),
  attendees: z.string().min(1, "Expected attendees is required"),
  visibility: z.string({
    required_error: "Please select visibility",
  }),
  communities: z.array(z.string()).optional(),
  regions: z.array(z.string()).optional(),
  clans: z.array(z.string()).optional(),
  subClans: z.array(z.string()).optional(),
  countries: z.array(z.string()).optional(),
  contact: z.string().min(1, "Contact information is required"),
  notes: z.string().optional(),
  eventImage: z.string().optional(),
})

interface EditEventModalProps {
  event: any
  open: boolean
  onClose: () => void
}

export default function EditEventModal({ event, open, onClose }: EditEventModalProps) {
  const [selectedVisibility, setSelectedVisibility] = useState(event?.visibility || "Public")
  const [eventImage, setEventImage] = useState<string | null>(event?.image || null)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: event?.title || "",
      description: event?.description || "",
      type: event?.type || "",
      customType: "",
      startDate: event?.startDate ? new Date(event.startDate) : new Date(),
      endDate: event?.endDate ? new Date(event.endDate) : new Date(),
      location: event?.location || "",
      attendees: event?.attendees?.toString() || "",
      visibility: event?.visibility || "Public",
      communities: [],
      regions: [],
      clans: [],
      subClans: [],
      countries: [],
      contact: event?.contact || "",
      notes: event?.notes || "",
      eventImage: event?.image || "",
    },
  })

  const eventType = form.watch("type")
  const visibility = form.watch("visibility")

  const handleVisibilityChange = (value: string) => {
    setSelectedVisibility(value)
    form.setValue("visibility", value)
  }

  const handleImageUpload = (imageUrl: string) => {
    setEventImage(imageUrl)
    form.setValue("eventImage", imageUrl)
  }

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values)
    onClose()
  }

  if (!event) return null

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Event</DialogTitle>
          <DialogDescription>Update the details for {event.title}.</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Event Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter event title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Describe the event" className="resize-none min-h-[100px]" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Event Type</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select event type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Wedding">Wedding</SelectItem>
                        <SelectItem value="Funeral">Funeral</SelectItem>
                        <SelectItem value="Birthday">Birthday</SelectItem>
                        <SelectItem value="Graduation">Graduation</SelectItem>
                        <SelectItem value="Community Meeting">Community Meeting</SelectItem>
                        <SelectItem value="Cultural Ceremony">Cultural Ceremony</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {eventType === "Other" && (
                <FormField
                  control={form.control}
                  name="customType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Custom Event Type</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter custom event type" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="startDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Start Date & Time</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn("w-full pl-3 text-left font-normal", !field.value && "text-muted-foreground")}
                          >
                            {field.value ? format(field.value, "PPP p") : <span>Pick a date</span>}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar mode="single" selected={field.value} onSelect={field.onChange} initialFocus />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="endDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>End Date & Time</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn("w-full pl-3 text-left font-normal", !field.value && "text-muted-foreground")}
                          >
                            {field.value ? format(field.value, "PPP p") : <span>Pick a date</span>}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar mode="single" selected={field.value} onSelect={field.onChange} initialFocus />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location</FormLabel>
                    <FormControl>
                      <Input placeholder="Event location" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="attendees"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Expected Attendees</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="Number of attendees" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="visibility"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Visibility</FormLabel>
                  <Select onValueChange={handleVisibilityChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select visibility" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Public">Public (Visible to everyone)</SelectItem>
                      <SelectItem value="Community">Community (Specific communities)</SelectItem>
                      <SelectItem value="Region">Region (Specific regions)</SelectItem>
                      <SelectItem value="Clan">Clan (Specific clans)</SelectItem>
                      <SelectItem value="SubClan">Sub-Clan (Specific sub-clans)</SelectItem>
                      <SelectItem value="Country">Country (Specific countries)</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {selectedVisibility === "Community" && (
              <FormField
                control={form.control}
                name="communities"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Select Communities</FormLabel>
                    <FormControl>
                      <MultiSelect
                        placeholder="Select communities"
                        options={[
                          { label: "Nairobi Central", value: "nairobi-central" },
                          { label: "Mombasa South", value: "mombasa-south" },
                          { label: "Kisumu East", value: "kisumu-east" },
                          { label: "Nakuru West", value: "nakuru-west" },
                          { label: "Eldoret", value: "eldoret" },
                        ]}
                        selected={field.value || []}
                        onChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            {selectedVisibility === "Region" && (
              <FormField
                control={form.control}
                name="regions"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Select Regions</FormLabel>
                    <FormControl>
                      <MultiSelect
                        placeholder="Select regions"
                        options={[
                          { label: "Nairobi", value: "nairobi" },
                          { label: "Coast", value: "coast" },
                          { label: "Western", value: "western" },
                          { label: "Rift Valley", value: "rift-valley" },
                          { label: "Central", value: "central" },
                        ]}
                        selected={field.value || []}
                        onChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            {selectedVisibility === "Clan" && (
              <FormField
                control={form.control}
                name="clans"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Select Clans</FormLabel>
                    <FormControl>
                      <MultiSelect
                        placeholder="Select clans"
                        options={[
                          { label: "Kikuyu", value: "kikuyu" },
                          { label: "Luo", value: "luo" },
                          { label: "Kalenjin", value: "kalenjin" },
                          { label: "Luhya", value: "luhya" },
                          { label: "Kamba", value: "kamba" },
                        ]}
                        selected={field.value || []}
                        onChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            {selectedVisibility === "SubClan" && (
              <FormField
                control={form.control}
                name="subClans"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Select Sub-Clans</FormLabel>
                    <FormControl>
                      <MultiSelect
                        placeholder="Select sub-clans"
                        options={[
                          { label: "Agikuyu", value: "agikuyu" },
                          { label: "Suba", value: "suba" },
                          { label: "Nandi", value: "nandi" },
                          { label: "Maragoli", value: "maragoli" },
                          { label: "Akamba", value: "akamba" },
                        ]}
                        selected={field.value || []}
                        onChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            {selectedVisibility === "Country" && (
              <FormField
                control={form.control}
                name="countries"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Select Countries</FormLabel>
                    <FormControl>
                      <MultiSelect
                        placeholder="Select countries"
                        options={[
                          { label: "Kenya", value: "kenya" },
                          { label: "Uganda", value: "uganda" },
                          { label: "Tanzania", value: "tanzania" },
                          { label: "Ethiopia", value: "ethiopia" },
                          { label: "Somalia", value: "somalia" },
                        ]}
                        selected={field.value || []}
                        onChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            <FormField
              control={form.control}
              name="eventImage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Event Banner/Poster</FormLabel>
                  <FormControl>
                    <ImageUpload value={eventImage || ''} onChange={handleImageUpload} />
                  </FormControl>
                  <FormDescription>Upload an image for your event banner or poster.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="contact"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contact Information</FormLabel>
                  <FormControl>
                    <Input placeholder="Contact person or phone number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Additional Notes</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Any additional information about the event"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit">
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
