"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ChevronDown, ChevronUp, Edit, Eye, MoreHorizontal, Trash2 } from "lucide-react"
import { format } from "date-fns"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { mockNewsData } from "./mock-news-data"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

interface NewsTableProps {
  selectedCategories: string[]
  searchQuery: string
  dateRange: {
    from: Date | undefined
    to: Date | undefined
  }
  status: string
}

export default function NewsTable({ selectedCategories, searchQuery, dateRange, status }: NewsTableProps) {
  const router = useRouter()
  const [deleteNewsId, setDeleteNewsId] = useState<string | null>(null)
  const [sortConfig, setSortConfig] = useState<{
    key: string
    direction: "asc" | "desc"
  }>({
    key: "publishDate",
    direction: "desc",
  })

  // Filter news based on filters
  const filteredNews = mockNewsData.filter((news) => {
    // Filter by search query (only if searchQuery is not empty)
    if (
      searchQuery &&
      !news.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !news.summary.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false
    }

    // Filter by categories (only if categories are selected)
    if (selectedCategories.length > 0 && !news.categories.some((category) => selectedCategories.includes(category))) {
      return false
    }

    // Filter by date range (only if dates are defined)
    if (dateRange.from && new Date(news.publishDate) < dateRange.from) {
      return false
    }
    if (dateRange.to) {
      // Add one day to make the "to" date inclusive
      const toDatePlusOne = new Date(dateRange.to)
      toDatePlusOne.setDate(toDatePlusOne.getDate() + 1)
      if (new Date(news.publishDate) > toDatePlusOne) {
        return false
      }
    }

    // Filter by status (only if status is not "All")
    if (status && status !== "All") {
      return news.status === status
    }

    return true
  })

  // Sort news based on sort config
  const sortedNews = [...filteredNews].sort((a, b) => {
    if (sortConfig.key === "publishDate") {
      const dateA = new Date(a.publishDate).getTime()
      const dateB = new Date(b.publishDate).getTime()
      return sortConfig.direction === "asc" ? dateA - dateB : dateB - dateA
    }

    if (sortConfig.key === "title") {
      return sortConfig.direction === "asc" ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title)
    }

    if (sortConfig.key === "status") {
      return sortConfig.direction === "asc" ? a.status.localeCompare(b.status) : b.status.localeCompare(a.status)
    }

    if (sortConfig.key === "views") {
      return sortConfig.direction === "asc" ? a.views - b.views : b.views - a.views
    }

    return 0
  })

  // Handle sort
  const handleSort = (key: string) => {
    setSortConfig({
      key,
      direction: sortConfig.key === key && sortConfig.direction === "asc" ? "desc" : "asc",
    })
  }

  // Handle view news
  const handleViewNews = (id: string) => {
    router.push(`/dashboard/events/news/view/${id}`)
  }

  // Handle edit news
  const handleEditNews = (id: string) => {
    router.push(`/dashboard/events/news/edit/${id}`)
  }

  // Handle delete news
  const handleDeleteNews = (id: string) => {
    setDeleteNewsId(id)
  }

  // Handle confirm delete
  const handleConfirmDelete = () => {
    // In a real app, you would delete the news item from the database
    console.log(`Deleting news with ID: ${deleteNewsId}`)
    setDeleteNewsId(null)
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

  return (
    <div className="space-y-4">
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted/50">
                <tr className="text-left">
                  <th className="p-4 font-medium">
                    <div className="flex items-center cursor-pointer" onClick={() => handleSort("title")}>
                      Title
                      {sortConfig.key === "title" &&
                        (sortConfig.direction === "asc" ? (
                          <ChevronUp className="ml-1 h-4 w-4" />
                        ) : (
                          <ChevronDown className="ml-1 h-4 w-4" />
                        ))}
                    </div>
                  </th>
                  <th className="p-4 font-medium">Categories</th>
                  <th className="p-4 font-medium">
                    <div className="flex items-center cursor-pointer" onClick={() => handleSort("publishDate")}>
                      Publish Date
                      {sortConfig.key === "publishDate" &&
                        (sortConfig.direction === "asc" ? (
                          <ChevronUp className="ml-1 h-4 w-4" />
                        ) : (
                          <ChevronDown className="ml-1 h-4 w-4" />
                        ))}
                    </div>
                  </th>
                  <th className="p-4 font-medium">
                    <div className="flex items-center cursor-pointer" onClick={() => handleSort("status")}>
                      Status
                      {sortConfig.key === "status" &&
                        (sortConfig.direction === "asc" ? (
                          <ChevronUp className="ml-1 h-4 w-4" />
                        ) : (
                          <ChevronDown className="ml-1 h-4 w-4" />
                        ))}
                    </div>
                  </th>
                  <th className="p-4 font-medium">
                    <div className="flex items-center cursor-pointer" onClick={() => handleSort("views")}>
                      Views
                      {sortConfig.key === "views" &&
                        (sortConfig.direction === "asc" ? (
                          <ChevronUp className="ml-1 h-4 w-4" />
                        ) : (
                          <ChevronDown className="ml-1 h-4 w-4" />
                        ))}
                    </div>
                  </th>
                  <th className="p-4 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {sortedNews.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="p-4 text-center text-muted-foreground">
                      No news items found matching your filters.
                    </td>
                  </tr>
                ) : (
                  sortedNews.map((news) => (
                    <tr key={news.id} className="border-t">
                      <td className="p-4">
                        <div className="font-medium">{news.title}</div>
                        <div className="text-sm text-muted-foreground line-clamp-1">{news.summary}</div>
                      </td>
                      <td className="p-4">
                        <div className="flex flex-wrap gap-1">
                          {news.categories.map((category) => (
                            <Badge key={category} variant="outline" className="text-xs">
                              {category}
                            </Badge>
                          ))}
                        </div>
                      </td>
                      <td className="p-4">{format(new Date(news.publishDate), "MMM d, yyyy")}</td>
                      <td className="p-4">
                        <Badge className={`${getStatusBadgeColor(news.status)}`}>{news.status}</Badge>
                      </td>
                      <td className="p-4 text-center">{news.views.toLocaleString()}</td>
                      <td className="p-4 text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Actions</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleViewNews(news.id)}>
                              <Eye className="mr-2 h-4 w-4" />
                              View
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleEditNews(news.id)}>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleDeleteNews(news.id)} className="text-red-600">
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Delete Confirmation Dialog */}
      <Dialog open={!!deleteNewsId} onOpenChange={() => setDeleteNewsId(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this news item? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2 sm:gap-0">
            <Button variant="outline" onClick={() => setDeleteNewsId(null)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleConfirmDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
