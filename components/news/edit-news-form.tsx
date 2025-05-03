"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { format } from "date-fns"
import { CalendarIcon, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { toast } from "@/components/ui/use-toast"
import RichTextEditor from "@/components/rich-text-editor"
import ImageUpload from "@/components/ui/image-upload"
import { MultiSelect } from "@/components/ui/multi-select"
import NewsPreview from "@/components/news/news-preview"
import { mockNewsData } from "./mock-news-data"

const newsCategories = [
  { label: "Community Updates", value: "Community" },
  { label: "Cultural Events", value: "Cultural" },
  { label: "Announcements", value: "Announcement" },
  { label: "Clan News", value: "Clan" },
  { label: "Genealogy", value: "Genealogy" },
  { label: "History", value: "History" },
  { label: "Education", value: "Education" },
  { label: "Health", value: "Health" },
  { label: "Development", value: "Development" },
  { label: "Infrastructure", value: "Infrastructure" },
  { label: "Youth", value: "Youth" },
  { label: "Event", value: "Event" },
  { label: "Leadership", value: "Leadership" },
  { label: "Heritage", value: "Heritage" },
  { label: "Safety", value: "Safety" },
  { label: "Training", value: "Training" },
  { label: "Business", value: "Business" },
  { label: "Environment", value: "Environment" },
  { label: "Conservation", value: "Conservation" },
  { label: "Sports", value: "Sports" },
]

const relatedEvents = [
  { label: "Annual Cultural Festival 2023", value: "event-1" },
  { label: "Clan Leaders Meeting", value: "event-2" },
  { label: "Heritage Day Celebration", value: "event-3" },
  { label: "Community Outreach Program", value: "event-4" },
  { label: "Elders Council Meeting", value: "event-5" },
]

const formSchema = z.object({
  title: z.string().min(5, { message: "Title must be at least 5 characters" }).max(100, {
    message: "Title must not exceed 100 characters",
  }),
  slug: z
    .string()
    .min(5, { message: "Slug must be at least 5 characters" })
    .max(100, {
      message: "Slug must not exceed 100 characters",
    })
    .regex(/^[a-z0-9-]+$/, {
      message: "Slug can only contain lowercase letters, numbers, and hyphens",
    }),
  summary: z.string().min(10, { message: "Summary must be at least 10 characters" }).max(200, {
    message: "Summary must not exceed 200 characters",
  }),
  content: z.string().min(50, { message: "Content must be at least 50 characters" }),
  featuredImage: z.string().optional(),
  categories: z.array(z.string()).min(1, { message: "Select at least one category" }),
  relatedEvents: z.array(z.string()).optional(),
  publishStatus: z.enum(["Draft", "Published", "Scheduled"]),
  publishDate: z.date().optional(),
})

type FormValues = z.infer<typeof formSchema>

interface EditNewsFormProps {
  newsId: string
}

export default function EditNewsForm({ newsId }: EditNewsFormProps) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [content, setContent] = useState("")
  const [featuredImage, setFeaturedImage] = useState("")
  const [isLoading, setIsLoading] = useState(true)

  // Find the news item by ID
  const newsItem = mockNewsData.find((item) => item.id === newsId)

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      slug: "",
      summary: "",
      content: "",
      featuredImage: "",
      categories: [],
      relatedEvents: [],
      publishStatus: "Draft",
      publishDate: undefined,
    },
  })

  // Load news data when component mounts
  useEffect(() => {
    if (newsItem) {
      form.reset({
        title: newsItem.title,
        slug: newsItem.slug,
        summary: newsItem.summary,
        content: newsItem.content,
        featuredImage: newsItem.featuredImage,
        categories: newsItem.categories,
        relatedEvents: newsItem.relatedEventId ? [newsItem.relatedEventId] : [],
        publishStatus: newsItem.status as "Draft" | "Published" | "Scheduled",
        publishDate: new Date(newsItem.publishDate),
      })
      setContent(newsItem.content)
      setFeaturedImage(newsItem.featuredImage)
      setIsLoading(false)
    } else {
      // Handle case where news item is not found
      toast({
        title: "News article not found",
        description: "The news article you're trying to edit doesn't exist or has been removed.",
        variant: "destructive",
      })
      router.push("/events/news")
    }
  }, [newsItem, form, router])

  const watchPublishStatus = form.watch("publishStatus")

  function generateSlug(title: string) {
    return title
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim()
  }

  function onTitleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const title = e.target.value
    form.setValue("title", title)

    // Only auto-generate slug if it's empty or hasn't been manually edited
    if (!form.getValues("slug")) {
      const slug = generateSlug(title)
      form.setValue("slug", slug)
    }
  }

  function onSubmit(data: FormValues) {
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      console.log("Form submitted:", data)
      setIsSubmitting(false)

      toast({
        title: "News article updated",
        description: `"${data.title}" has been ${
          data.publishStatus === "Published" ? "published" : "saved as " + data.publishStatus.toLowerCase()
        }`,
      })

      router.push("/events/news")
    }, 1500)
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <Tabs defaultValue="edit">
      <TabsList className="mb-6">
        <TabsTrigger value="edit">Edit</TabsTrigger>
        <TabsTrigger value="preview">Preview</TabsTrigger>
      </TabsList>

      <TabsContent value="edit">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <Card>
              <CardContent className="pt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Title</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter news title" {...field} onChange={onTitleChange} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="slug"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Slug</FormLabel>
                        <FormControl>
                          <Input placeholder="news-article-slug" {...field} />
                        </FormControl>
                        <FormDescription>URL-friendly version of the title</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="mt-6">
                  <FormField
                    control={form.control}
                    name="summary"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Summary</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Brief summary of the news article"
                            className="resize-none"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>A short summary that will appear in news listings</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="mt-6">
                  <FormField
                    control={form.control}
                    name="content"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Content</FormLabel>
                        <FormControl>
                          <RichTextEditor
                            value={content}
                            onChange={(value) => {
                              setContent(value)
                              field.onChange(value)
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="mt-6">
                  <FormField
                    control={form.control}
                    name="featuredImage"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Featured Image</FormLabel>
                        <FormControl>
                          <ImageUpload
                            value={featuredImage}
                            onChange={(url) => {
                              setFeaturedImage(url)
                              field.onChange(url)
                            }}
                          />
                        </FormControl>
                        <FormDescription>Upload a featured image for the news article</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                  <FormField
                    control={form.control}
                    name="categories"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Categories</FormLabel>
                        <FormControl>
                          <MultiSelect
                            options={newsCategories}
                            selected={field.value}
                            onChange={field.onChange}
                            placeholder="Select categories"
                          />
                        </FormControl>
                        <FormDescription>Select one or more categories for this news article</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="relatedEvents"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Related Events</FormLabel>
                        <FormControl>
                          <MultiSelect
                            options={relatedEvents}
                            selected={field.value || []}
                            onChange={field.onChange}
                            placeholder="Select related events"
                          />
                        </FormControl>
                        <FormDescription>Optionally link this news to related events</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="mt-6">
                  <FormField
                    control={form.control}
                    name="publishStatus"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Publishing Options</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            value={field.value}
                            className="flex flex-col space-y-1"
                          >
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="Draft" />
                              </FormControl>
                              <FormLabel className="font-normal">Save as Draft</FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="Published" />
                              </FormControl>
                              <FormLabel className="font-normal">Publish Immediately</FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="Scheduled" />
                              </FormControl>
                              <FormLabel className="font-normal">Schedule for Later</FormLabel>
                            </FormItem>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {watchPublishStatus === "Scheduled" && (
                  <div className="mt-4 ml-7">
                    <FormField
                      control={form.control}
                      name="publishDate"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel>Publish Date</FormLabel>
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant={"outline"}
                                  className={cn(
                                    "w-[240px] pl-3 text-left font-normal",
                                    !field.value && "text-muted-foreground",
                                  )}
                                >
                                  {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                              <Calendar
                                mode="single"
                                selected={field.value}
                                onSelect={field.onChange}
                                disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                          <FormDescription>Select when this news article should be published</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                )}
              </CardContent>
            </Card>

            <div className="flex justify-end gap-2">
              <Button type="button" variant="outline" onClick={() => router.push("/events/news")}>
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {watchPublishStatus === "Draft"
                  ? "Save Draft"
                  : watchPublishStatus === "Scheduled"
                    ? "Schedule"
                    : "Publish"}
              </Button>
            </div>
          </form>
        </Form>
      </TabsContent>

      <TabsContent value="preview">
        <NewsPreview
          title={form.getValues("title")}
          content={form.getValues("content")}
          featuredImage={featuredImage}
          categories={form.getValues("categories").map((value) => {
            const category = newsCategories.find((cat) => cat.value === value)
            return category ? category.label : value
          })}
          publishDate={form.getValues("publishDate") || new Date()}
        />
      </TabsContent>
    </Tabs>
  )
}
