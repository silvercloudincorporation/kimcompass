"use client"

import { format } from "date-fns"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface NewsPreviewProps {
  title: string
  content: string
  featuredImage?: string
  categories: string[]
  publishDate: Date
}

export default function NewsPreview({ title, content, featuredImage, categories, publishDate }: NewsPreviewProps) {
  return (
    <Card className="overflow-hidden">
      <div className="relative">
        {featuredImage ? (
          <img src={featuredImage || "/placeholder.svg"} alt={title} className="w-full h-[300px] object-cover" />
        ) : (
          <div className="w-full h-[300px] bg-muted flex items-center justify-center text-muted-foreground">
            No featured image selected
          </div>
        )}
      </div>

      <CardContent className="pt-6">
        <div className="flex flex-wrap gap-2 mb-4">
          {categories.map((category, index) => (
            <Badge key={index} variant="secondary">
              {category}
            </Badge>
          ))}
        </div>

        <h1 className="text-3xl font-bold mb-2">{title || "Untitled News Article"}</h1>

        <div className="text-sm text-muted-foreground mb-6">Published on {format(publishDate, "MMMM d, yyyy")}</div>

        {content ? (
          <div className="prose max-w-none dark:prose-invert" dangerouslySetInnerHTML={{ __html: content }} />
        ) : (
          <div className="text-muted-foreground">No content added yet</div>
        )}
      </CardContent>
    </Card>
  )
}
