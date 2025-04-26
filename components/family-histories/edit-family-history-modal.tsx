"use client"

import { useState, useEffect } from "react"
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
import ImageUpload from "@/components/ui/image-upload"

const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  family: z.string().min(1, "Family name is required"),
  submittedBy: z.string().min(1, "Submitter name is required"),
  submittedDate: z.date({
    required_error: "Submission date is required",
  }),
  summary: z.string().min(1, "Summary is required"),
  content: z.string().min(1, "Content is required"),
  coverImage: z.string().optional(),
  gallery: z.array(z.string()).optional(),
})

interface EditFamilyHistoryModalProps {
  history: any
  open: boolean
  onClose: () => void
}

export default function EditFamilyHistoryModal({ history, open, onClose }: EditFamilyHistoryModalProps) {
  const [coverImage, setCoverImage] = useState<string | null>(null)
  const [galleryImages, setGalleryImages] = useState<string[]>([])

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      family: "",
      submittedBy: "",
      submittedDate: new Date(),
      summary: "",
      content: "",
      gallery: [],
    },
  })

  useEffect(() => {
    if (history) {
      form.reset({
        title: history.title || "",
        family: history.family || "",
        submittedBy: history.submittedBy || "",
        submittedDate: history.submittedDate ? new Date(history.submittedDate) : new Date(),
        summary: history.summary || "",
        content: history.content || "",
        coverImage: history.coverImage || "",
        gallery: history.gallery || [],
      })
      setCoverImage(history.coverImage || null)
      setGalleryImages(history.gallery || [])
    }
  }, [history, form])

  const handleCoverImageUpload = (imageUrl: string) => {
    setCoverImage(imageUrl)
    form.setValue("coverImage", imageUrl)
  }

  const handleGalleryImageUpload = (imageUrl: string) => {
    const newGallery = [...galleryImages, imageUrl]
    setGalleryImages(newGallery)
    form.setValue("gallery", newGallery)
  }

  const removeGalleryImage = (index: number) => {
    const newGallery = galleryImages.filter((_, i) => i !== index)
    setGalleryImages(newGallery)
    form.setValue("gallery", newGallery)
  }

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values)
    onClose()
  }

  if (!history) return null

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Family History</DialogTitle>
          <DialogDescription>Update the details for {history.title}.</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
                name="family"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Family Name</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select family" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Kimani">Kimani</SelectItem>
                        <SelectItem value="Ochieng">Ochieng</SelectItem>
                        <SelectItem value="Mwangi">Mwangi</SelectItem>
                        <SelectItem value="Otieno">Otieno</SelectItem>
                        <SelectItem value="Wanjiku">Wanjiku</SelectItem>
                        <SelectItem value="Njoroge">Njoroge</SelectItem>
                      </SelectContent>
                    </Select>
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
                      <Input placeholder="Name of the submitter" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="submittedDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Submission Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn("w-full pl-3 text-left font-normal", !field.value && "text-muted-foreground")}
                        >
                          {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
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
              name="summary"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Summary</FormLabel>
                  <FormControl>
                    <Textarea placeholder="A brief summary of this family history" className="resize-none" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Content</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="The complete family history narrative"
                      className="resize-none min-h-[150px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="coverImage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cover Image</FormLabel>
                  <FormControl>
                    <ImageUpload value={coverImage || ''} onChange={handleCoverImageUpload} />
                  </FormControl>
                  <FormDescription>Upload a main image for this family history.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="gallery"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Gallery Images</FormLabel>
                  <FormControl>
                    <div className="space-y-4">
                      <div className="grid grid-cols-3 gap-2">
                        {galleryImages.map((image, index) => (
                          <div key={index} className="relative h-24 bg-muted rounded-md overflow-hidden">
                            <img
                              src={image || "/placeholder.svg"}
                              alt={`Gallery image ${index + 1}`}
                              className="h-full w-full object-cover"
                            />
                            <Button
                              type="button"
                              variant="destructive"
                              size="sm"
                              className="absolute top-1 right-1 h-6 w-6 p-0"
                              onClick={() => removeGalleryImage(index)}
                            >
                              ×
                            </Button>
                          </div>
                        ))}
                      </div>
                      <ImageUpload
                        value={''}
                        onChange={handleGalleryImageUpload}
                      />
                    </div>
                  </FormControl>
                  <FormDescription>Add multiple images to the gallery (optional).</FormDescription>
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
