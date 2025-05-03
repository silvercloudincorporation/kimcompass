"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Save, ArrowLeft, Eye, Pencil, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/components/ui/use-toast"
import ImageUpload from "@/components/ui/image-upload"
import RichTextEditor from "@/components/rich-text-editor"
import FamilyHistoryPreview from "@/components/family-histories/family-history-preview"

const formSchema = z.object({
  title: z.string().min(5, { message: "Title must be at least 5 characters" }),
  familyName: z.string().min(2, { message: "Family name is required" }),
  submittedBy: z.string().min(2, { message: "Submitter name is required" }),
  location: z.string().optional(),
  timePeriod: z.string().optional(),
  submissionDate: z.string().optional(),
  summary: z.string().max(500, { message: "Summary must be less than 500 characters" }).optional(),
  content: z.string().min(50, { message: "Content must be at least 50 characters" }),
  coverImage: z.string().optional(),
  galleryImages: z.array(z.string()).optional(),
  status: z.enum(["draft", "pending_review"]),
})

type FormValues = z.infer<typeof formSchema>

export default function CreateFamilyHistoryForm() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("edit")
  const [galleryImages, setGalleryImages] = useState<string[]>([])

  const defaultValues: Partial<FormValues> = {
    title: "",
    familyName: "",
    submittedBy: "",
    location: "",
    timePeriod: "",
    submissionDate: new Date().toISOString().split("T")[0],
    summary: "",
    content: "",
    coverImage: "",
    galleryImages: [],
    status: "draft",
  }

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
  })

  function onSubmit(data: FormValues) {
    // Include gallery images in the submission
    data.galleryImages = galleryImages

    // In a real app, you would send this data to your API
    console.log(data)

    toast({
      title: data.status === "draft" ? "Draft saved" : "Family history submitted for review",
      description: `"${data.title}" has been ${data.status === "draft" ? "saved as a draft" : "submitted for review"}.`,
    })

    // Navigate back to the family histories list
    router.push("/family-histories")
  }

  const addGalleryImage = (url: string) => {
    setGalleryImages([...galleryImages, url])
  }

  const removeGalleryImage = (index: number) => {
    setGalleryImages(galleryImages.filter((_, i) => i !== index))
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex items-center mb-6">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="mr-2"
            onClick={() => router.push("/family-histories")}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Family Histories
          </Button>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList>
            <TabsTrigger value="edit" className="flex items-center">
              <Pencil className="mr-2 h-4 w-4" />
              Edit
            </TabsTrigger>
            <TabsTrigger value="preview" className="flex items-center">
              <Eye className="mr-2 h-4 w-4" />
              Preview
            </TabsTrigger>
          </TabsList>

          <TabsContent value="edit" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
                <CardDescription>Enter the basic details about this family history</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter a title for this family history" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="familyName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Family Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter family name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="submittedBy"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Submitted By</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter submitter's name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Location</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter location" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="timePeriod"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Time Period</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., 1950-1980" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="submissionDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Submission Date</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="summary"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Summary</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Enter a brief summary of this family history"
                          {...field}
                          className="resize-none"
                          maxLength={500}
                        />
                      </FormControl>
                      <FormDescription className="text-right">
                        {field.value?.length || 0}/500 characters
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Content</CardTitle>
                <CardDescription>Write the detailed family history using the rich text editor</CardDescription>
              </CardHeader>
              <CardContent>
                <FormField
                  control={form.control}
                  name="content"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <RichTextEditor
                          value={field.value}
                          onChange={field.onChange}
                          placeholder="Write the family history here..."
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Media</CardTitle>
                <CardDescription>Upload images related to this family history</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <FormField
                  control={form.control}
                  name="coverImage"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Cover Image</FormLabel>
                      <FormControl>
                        <ImageUpload
                          value={field.value || ""}
                          onChange={field.onChange}
                          placeholder="Upload a cover image"
                        />
                      </FormControl>
                      <FormDescription>
                        This image will be displayed as the main image for this family history
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div>
                  <FormLabel>Gallery Images</FormLabel>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-2">
                    {galleryImages.map((image, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={image || "/placeholder.svg"}
                          alt={`Gallery image ${index + 1}`}
                          className="w-full h-32 object-cover rounded-md border"
                        />
                        <Button
                          type="button"
                          variant="destructive"
                          size="sm"
                          className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={() => removeGalleryImage(index)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}

                    <ImageUpload value="" onChange={addGalleryImage} placeholder="Add to gallery" className="h-32" />
                  </div>
                  <FormDescription className="mt-2">
                    Add multiple images to create a gallery for this family history
                  </FormDescription>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Status</CardTitle>
                <CardDescription>Set the status of this family history</CardDescription>
              </CardHeader>
              <CardContent>
                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Select value={field.value} onValueChange={field.onChange}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="draft">Save as Draft</SelectItem>
                            <SelectItem value="pending_review">Submit for Review</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormDescription>
                        Draft histories are only visible to administrators. Submitted histories will be reviewed before
                        publication.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="preview">
            <Card>
              <CardContent className="pt-6">
                <FamilyHistoryPreview
                  title={form.watch("title")}
                  familyName={form.watch("familyName")}
                  submittedBy={form.watch("submittedBy")}
                  location={form.watch("location")}
                  timePeriod={form.watch("timePeriod")}
                  submissionDate={form.watch("submissionDate")}
                  summary={form.watch("summary")}
                  content={form.watch("content")}
                  coverImage={form.watch("coverImage")}
                  galleryImages={galleryImages}
                />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end gap-4 mt-6">
          <Button type="button" variant="outline" onClick={() => router.push("/family-histories")}>
            Cancel
          </Button>
          <Button type="submit">
            <Save className="mr-2 h-4 w-4" />
            {form.watch("status") === "draft" ? "Save Draft" : "Submit for Review"}
          </Button>
        </div>
      </form>
    </Form>
  )
}
