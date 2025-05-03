"use client"

import { useRouter } from "next/navigation"
import { format } from "date-fns"
import { ArrowLeft, Edit, Trash2 } from "lucide-react"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { mockNewsData } from "./mock-news-data"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

interface NewsDetailProps {
  newsId: string
}

export default function NewsDetail({ newsId }: NewsDetailProps) {
  const router = useRouter()
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)

  // Find the news item by ID
  const news = mockNewsData.find((item) => item.id === newsId)

  // Handle if news item not found
  if (!news) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <h2 className="text-2xl font-bold mb-4">News Article Not Found</h2>
        <p className="text-muted-foreground mb-6">
          The news article you're looking for doesn't exist or has been removed.
        </p>
        <Button onClick={() => router.push("/events/news")}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to News
        </Button>
      </div>
    )
  }

  // Get status badge color
  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "Published":
        return "bg-green-500 hover:bg-green-600"
      case "Scheduled":
        return "bg-blue-500 hover:bg-blue-600"
      default:
        return "bg-gray-500 hover:bg-gray-600"
    }
  }

  // Handle delete
  const handleDelete = () => {
    // In a real app, you would delete the news item from the database
    console.log(`Deleting news with ID: ${newsId}`)
    setDeleteDialogOpen(false)
    router.push("/dashboard/events/news")
  }

  return (
    <>
      <div className="mb-6 flex items-center justify-between">
        <Button variant="outline" onClick={() => router.push("/dashboard/events/news")}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to News
        </Button>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => router.push(`/dashboard/events/news/edit/${newsId}`)}>
            <Edit className="mr-2 h-4 w-4" />
            Edit
          </Button>
          <Button variant="destructive" onClick={() => setDeleteDialogOpen(true)}>
            <Trash2 className="mr-2 h-4 w-4" />
            Delete
          </Button>
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="relative">
            <img
              src={news.featuredImage || "/placeholder.svg?height=400&width=1200"}
              alt={news.title}
              className="w-full h-[300px] object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
              <Badge className={`${getStatusBadgeColor(news.status)} mb-2`}>{news.status}</Badge>
              <h1 className="text-3xl font-bold text-white">{news.title}</h1>
            </div>
          </div>

          <div className="p-6">
            <div className="flex flex-wrap gap-2 mb-4">
              {news.categories.map((category) => (
                <Badge key={category} variant="outline">
                  {category}
                </Badge>
              ))}
            </div>

            <div className="flex items-center text-sm text-muted-foreground mb-6">
              <span>By {news.author}</span>
              <span className="mx-2">•</span>
              <span>Published on {format(new Date(news.publishDate), "MMMM d, yyyy")}</span>
              <span className="mx-2">•</span>
              <span>{news.views.toLocaleString()} views</span>
            </div>

            <div className="bg-muted/30 p-4 rounded-md mb-6">
              <h2 className="font-medium mb-2">Summary</h2>
              <p>{news.summary}</p>
            </div>

            <div className="prose max-w-none">
              <h2 className="text-xl font-bold mb-4">Content</h2>
              <div dangerouslySetInnerHTML={{ __html: news.content }} />
            </div>

            <div className="border-t mt-8 pt-4 flex justify-between text-sm text-muted-foreground">
              <div>Created: {format(new Date(news.createdAt), "MMM d, yyyy HH:mm")}</div>
              <div>Last updated: {format(new Date(news.updatedAt), "MMM d, yyyy HH:mm")}</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this news article? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2 sm:gap-0">
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
