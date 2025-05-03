"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

interface FamilyHistoryPreviewProps {
  title: string
  familyName: string
  submittedBy: string
  location?: string
  timePeriod?: string
  submissionDate?: string
  summary?: string
  content: string
  coverImage?: string
  galleryImages?: string[]
}

export default function FamilyHistoryPreview({
  title,
  familyName,
  submittedBy,
  location,
  timePeriod,
  submissionDate,
  summary,
  content,
  coverImage,
  galleryImages = [],
}: FamilyHistoryPreviewProps) {
  const [activeImageIndex, setActiveImageIndex] = useState<number | null>(null)

  // Simple markdown renderer for demonstration
  const renderMarkdown = (text: string) => {
    if (!text) return null

    // Replace headings
    const html = text
      .replace(/^# (.*$)/gm, '<h1 class="text-2xl font-bold my-4">$1</h1>')
      .replace(/^## (.*$)/gm, '<h2 class="text-xl font-bold my-3">$1</h2>')
      .replace(/^### (.*$)/gm, '<h3 class="text-lg font-bold my-2">$1</h3>')

      // Replace bold and italic
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
      .replace(/_(.*?)_/g, "<em>$1</em>")

      // Replace lists
      .replace(/^- (.*$)/gm, '<li class="ml-6 list-disc">$1</li>')
      .replace(/^\d+\. (.*$)/gm, '<li class="ml-6 list-decimal">$1</li>')

      // Replace quotes
      .replace(/^> (.*$)/gm, '<blockquote class="pl-4 border-l-4 border-gray-300 italic my-2">$1</blockquote>')

      // Replace links
      .replace(/\[(.*?)\]$$(.*?)$$/g, '<a href="$2" class="text-blue-600 hover:underline">$1</a>')

      // Replace paragraphs
      .replace(/^(?!<[hl]|<li|<blockquote)(.+$)/gm, '<p class="my-2">$1</p>')

    return <div dangerouslySetInnerHTML={{ __html: html }} />
  }

  const openGallery = (index: number) => {
    setActiveImageIndex(index)
  }

  const closeGallery = () => {
    setActiveImageIndex(null)
  }

  const nextImage = () => {
    if (activeImageIndex === null || !galleryImages.length) return
    setActiveImageIndex((activeImageIndex + 1) % galleryImages.length)
  }

  const prevImage = () => {
    if (activeImageIndex === null || !galleryImages.length) return
    setActiveImageIndex((activeImageIndex - 1 + galleryImages.length) % galleryImages.length)
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold">{title || "Untitled Family History"}</h1>

        <div className="flex flex-wrap gap-x-6 gap-y-2 mt-4 text-sm text-muted-foreground">
          {familyName && (
            <div>
              <span className="font-medium">Family:</span> {familyName}
            </div>
          )}

          {submittedBy && (
            <div>
              <span className="font-medium">Submitted by:</span> {submittedBy}
            </div>
          )}

          {location && (
            <div>
              <span className="font-medium">Location:</span> {location}
            </div>
          )}

          {timePeriod && (
            <div>
              <span className="font-medium">Time Period:</span> {timePeriod}
            </div>
          )}

          {submissionDate && (
            <div>
              <span className="font-medium">Date:</span> {new Date(submissionDate).toLocaleDateString()}
            </div>
          )}
        </div>
      </div>

      {/* Cover Image */}
      {coverImage && (
        <div className="mb-8">
          <img src={coverImage || "/placeholder.svg"} alt={title} className="w-full h-64 object-cover rounded-lg" />
        </div>
      )}

      {/* Summary */}
      {summary && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-2">Summary</h2>
          <p className="text-muted-foreground italic">{summary}</p>
        </div>
      )}

      <Separator className="my-6" />

      {/* Content */}
      <div className="prose max-w-none">{renderMarkdown(content)}</div>

      {/* Gallery */}
      {galleryImages.length > 0 && (
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Gallery</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {galleryImages.map((image, index) => (
              <div
                key={index}
                className="cursor-pointer hover:opacity-90 transition-opacity"
                onClick={() => openGallery(index)}
              >
                <img
                  src={image || "/placeholder.svg"}
                  alt={`Gallery image ${index + 1}`}
                  className="w-full h-40 object-cover rounded-md"
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Gallery Modal */}
      {activeImageIndex !== null && galleryImages.length > 0 && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center">
          <Button variant="ghost" size="icon" className="absolute top-4 right-4 text-white" onClick={closeGallery}>
            <X className="h-6 w-6" />
          </Button>

          <div className="relative max-w-4xl max-h-[80vh] mx-4">
            <img
              src={galleryImages[activeImageIndex] || "/placeholder.svg"}
              alt={`Gallery image ${activeImageIndex + 1}`}
              className="max-w-full max-h-[80vh] object-contain"
            />

            {galleryImages.length > 1 && (
              <>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-1/2 left-4 -translate-y-1/2 text-white"
                  onClick={prevImage}
                >
                  <ChevronLeft className="h-8 w-8" />
                </Button>

                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-1/2 right-4 -translate-y-1/2 text-white"
                  onClick={nextImage}
                >
                  <ChevronRight className="h-8 w-8" />
                </Button>

                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white text-sm">
                  {activeImageIndex + 1} / {galleryImages.length}
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
