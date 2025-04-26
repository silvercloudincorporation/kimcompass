"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { CalendarIcon, Info } from "lucide-react"
import { format } from "date-fns"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { toast } from "@/components/ui/use-toast"
import { MultiSelect, type Option } from "@/components/ui/multi-select"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import ImageUpload from "../ui/image-upload"

// Mock data for dropdowns
const mockCommunities: Option[] = [
  { label: "Eastlands Community", value: "comm-001" },
  { label: "Westlands Community", value: "comm-002" },
  { label: "Mombasa Old Town", value: "comm-003" },
  { label: "Kisumu Lakeside", value: "comm-004" },
  { label: "Nakuru Town", value: "comm-005" },
  { label: "Eldoret Highlands", value: "comm-006" },
  { label: "Malindi Coastal", value: "comm-007" },
  { label: "Kitale Agricultural", value: "comm-008" },
]

const mockRegions: Option[] = [
  { label: "Nairobi", value: "region-001" },
  { label: "Mombasa", value: "region-002" },
  { label: "Kisumu", value: "region-003" },
  { label: "Nakuru", value: "region-004" },
  { label: "Uasin Gishu", value: "region-005" },
  { label: "Kilifi", value: "region-006" },
  { label: "Trans Nzoia", value: "region-007" },
]

const mockClans: Option[] = [
  { label: "Kikuyu", value: "clan-001" },
  { label: "Luo", value: "clan-002" },
  { label: "Kalenjin", value: "clan-003" },
  { label: "Luhya", value: "clan-004" },
  { label: "Kamba", value: "clan-005" },
  { label: "Kisii", value: "clan-006" },
  { label: "Meru", value: "clan-007" },
]

const mockSubClans: Option[] = [
  { label: "Agikuyu", value: "subclan-001" },
  { label: "Suba", value: "subclan-002" },
  { label: "Nandi", value: "subclan-003" },
  { label: "Maragoli", value: "subclan-004" },
  { label: "Akamba", value: "subclan-005" },
  { label: "Abagusii", value: "subclan-006" },
  { label: "Ameru", value: "subclan-007" },
]

const mockCountries: Option[] = [
  { label: "Kenya", value: "country-001" },
  { label: "Uganda", value: "country-002" },
  { label: "Tanzania", value: "country-003" },
  { label: "Rwanda", value: "country-004" },
  { label: "Burundi", value: "country-005" },
  { label: "Ethiopia", value: "country-006" },
  { label: "Somalia", value: "country-007" },
]

const formSchema = z.object({
  title: z.string().min(5, {
    message: "Title must be at least 5 characters.",
  }),
  type: z.string({
    required_error: "Please select an event type.",
  }),
  customType: z.string().optional(),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
  startDate: z.date({
    required_error: "Start date is required.",
  }),
  endDate: z.date({
    required_error: "End date is required.",
  }),
  location: z.string().min(5, {
    message: "Location must be at least 5 characters.",
  }),
  visibility: z.string({
    required_error: "Please select visibility level.",
  }),
  communities: z.array(z.string()).optional(),
  regions: z.array(z.string()).optional(),
  clans: z.array(z.string()).optional(),
  subclans: z.array(z.string()).optional(),
  countries: z.array(z.string()).optional(),
  attendees: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
    message: "Expected attendees must be a positive number.",
  }),
  notes: z.string().optional(),
  contact: z.string().email({
    message: "Please enter a valid email address.",
  }),
  bannerImage: z.string().min(1, {
    message: "Event banner image is required.",
  }),
})

export default function CreateEventForm() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [selectedCommunities, setSelectedCommunities] = useState<string[]>([])
  const [selectedRegions, setSelectedRegions] = useState<string[]>([])
  const [selectedClans, setSelectedClans] = useState<string[]>([])
  const [selectedSubClans, setSelectedSubClans] = useState<string[]>([])
  const [selectedCountries, setSelectedCountries] = useState<string[]>([])
  const [bannerImage, setBannerImage] = useState("")

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      location: "",
      notes: "",
      contact: "",
      attendees: "",
      communities: [],
      regions: [],
      clans: [],
      subclans: [],
      countries: [],
      bannerImage: "",
    },
  })

  const eventType = form.watch("type")
  const visibility = form.watch("visibility")

  // Update form values when selections change
  useEffect(() => {
    form.setValue("communities", selectedCommunities)
  }, [selectedCommunities, form])

  useEffect(() => {
    form.setValue("regions", selectedRegions)
  }, [selectedRegions, form])

  useEffect(() => {
    form.setValue("clans", selectedClans)
  }, [selectedClans, form])

  useEffect(() => {
    form.setValue("subclans", selectedSubClans)
  }, [selectedSubClans, form])

  useEffect(() => {
    form.setValue("countries", selectedCountries)
  }, [selectedCountries, form])

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      console.log(values)
      toast({
        title: "Event created successfully",
        description: "Your event has been submitted for approval.",
      })
      setIsSubmitting(false)
      router.push("/events")
    }, 1500)
  }

  const handleBannerImageUpload = (url: string) => {
    setBannerImage(url)
    form.setValue("bannerImage", url)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 border rounded-md p-6 bg-card shadow-sm">
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold tracking-tight">Create New Event</h2>
          <p className="text-muted-foreground">Fill in the details to create a new event.</p>
        </div>

        <FormField
          control={form.control}
          name="bannerImage"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Event Banner Image</FormLabel>
              <FormControl>
                <ImageUpload
                  value={bannerImage}
                  onChange={handleBannerImageUpload}
                  placeholder="Upload event banner"
                  className="h-48 w-full"
                />
              </FormControl>
              <FormDescription>This image will be displayed as the banner for your event.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Event Title</FormLabel>
              <FormControl>
                <Input placeholder="Enter event title" {...field} />
              </FormControl>
              <FormDescription>Provide a clear and descriptive title for your event.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                    <SelectItem value="wedding">Wedding</SelectItem>
                    <SelectItem value="funeral">Funeral</SelectItem>
                    <SelectItem value="birthday">Birthday</SelectItem>
                    <SelectItem value="anniversary">Anniversary</SelectItem>
                    <SelectItem value="meeting">Meeting</SelectItem>
                    <SelectItem value="cultural">Cultural</SelectItem>
                    <SelectItem value="festival">Festival</SelectItem>
                    <SelectItem value="conference">Conference</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {eventType === "other" && (
            <FormField
              control={form.control}
              name="customType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Custom Event Type</FormLabel>
                  <FormControl>
                    <Input placeholder="Specify event type" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          <FormField
            control={form.control}
            name="visibility"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-1">
                  Event Visibility
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Info className="h-4 w-4 text-muted-foreground cursor-help" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Who can see and attend this event</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select visibility" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="family">Family (Default)</SelectItem>
                    <SelectItem value="community">Community</SelectItem>
                    <SelectItem value="region">Region</SelectItem>
                    <SelectItem value="clan">Clan</SelectItem>
                    <SelectItem value="subclan">Sub-Clan</SelectItem>
                    <SelectItem value="country">Country</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Conditional multi-select fields based on visibility */}
        {visibility === "community" && (
          <FormField
            control={form.control}
            name="communities"
            render={() => (
              <FormItem>
                <FormLabel>Select Communities</FormLabel>
                <FormControl>
                  <MultiSelect
                    options={mockCommunities}
                    selected={selectedCommunities}
                    onChange={setSelectedCommunities}
                    placeholder="Select communities"
                  />
                </FormControl>
                <FormDescription>Select one or more communities for this event</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        {visibility === "region" && (
          <FormField
            control={form.control}
            name="regions"
            render={() => (
              <FormItem>
                <FormLabel>Select Regions</FormLabel>
                <FormControl>
                  <MultiSelect
                    options={mockRegions}
                    selected={selectedRegions}
                    onChange={setSelectedRegions}
                    placeholder="Select regions"
                  />
                </FormControl>
                <FormDescription>Select one or more regions for this event</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        {visibility === "clan" && (
          <FormField
            control={form.control}
            name="clans"
            render={() => (
              <FormItem>
                <FormLabel>Select Clans</FormLabel>
                <FormControl>
                  <MultiSelect
                    options={mockClans}
                    selected={selectedClans}
                    onChange={setSelectedClans}
                    placeholder="Select clans"
                  />
                </FormControl>
                <FormDescription>Select one or more clans for this event</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        {visibility === "subclan" && (
          <FormField
            control={form.control}
            name="subclans"
            render={() => (
              <FormItem>
                <FormLabel>Select Sub-Clans</FormLabel>
                <FormControl>
                  <MultiSelect
                    options={mockSubClans}
                    selected={selectedSubClans}
                    onChange={setSelectedSubClans}
                    placeholder="Select sub-clans"
                  />
                </FormControl>
                <FormDescription>Select one or more sub-clans for this event</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        {visibility === "country" && (
          <FormField
            control={form.control}
            name="countries"
            render={() => (
              <FormItem>
                <FormLabel>Select Countries</FormLabel>
                <FormControl>
                  <MultiSelect
                    options={mockCountries}
                    selected={selectedCountries}
                    onChange={setSelectedCountries}
                    placeholder="Select countries"
                  />
                </FormControl>
                <FormDescription>Select one or more countries for this event</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea placeholder="Describe your event" className="min-h-[120px]" {...field} />
              </FormControl>
              <FormDescription>
                Provide details about the event purpose, activities, and any special instructions.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                        {field.value ? format(field.value, "PPP p") : <span>Pick a date and time</span>}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar mode="single" selected={field.value} onSelect={field.onChange} initialFocus />
                    <div className="p-3 border-t">
                      <Input
                        type="time"
                        onChange={(e) => {
                          const date = new Date(field.value || new Date())
                          const [hours, minutes] = e.target.value.split(":")
                          date.setHours(Number.parseInt(hours, 10))
                          date.setMinutes(Number.parseInt(minutes, 10))
                          field.onChange(date)
                        }}
                        defaultValue={field.value ? format(field.value, "HH:mm") : undefined}
                      />
                    </div>
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
                        {field.value ? format(field.value, "PPP p") : <span>Pick a date and time</span>}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar mode="single" selected={field.value} onSelect={field.onChange} initialFocus />
                    <div className="p-3 border-t">
                      <Input
                        type="time"
                        onChange={(e) => {
                          const date = new Date(field.value || new Date())
                          const [hours, minutes] = e.target.value.split(":")
                          date.setHours(Number.parseInt(hours, 10))
                          date.setMinutes(Number.parseInt(minutes, 10))
                          field.onChange(date)
                        }}
                        defaultValue={field.value ? format(field.value, "HH:mm") : undefined}
                      />
                    </div>
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Location</FormLabel>
              <FormControl>
                <Input placeholder="Event location" {...field} />
              </FormControl>
              <FormDescription>Provide the full address or venue name.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="attendees"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Expected Attendees</FormLabel>
                <FormControl>
                  <Input type="number" min="1" placeholder="Number of expected attendees" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="contact"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Contact Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="Contact email for inquiries" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="notes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Additional Notes</FormLabel>
              <FormControl>
                <Textarea placeholder="Any additional information" {...field} />
              </FormControl>
              <FormDescription>Optional: Include any special requirements or additional information.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end gap-4">
          <Button variant="outline" type="button" onClick={() => router.push("/events")}>
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Creating..." : "Create Event"}
          </Button>
        </div>
      </form>
    </Form>
  )
}
