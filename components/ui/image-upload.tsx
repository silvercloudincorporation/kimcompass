"use client"

import type React from "react"

import { useState } from "react"
import { Upload, X } from "lucide-react"
import { cn } from "@/lib/utils"

interface ImageUploadProps {
  value: string
  onChange: (url: string) => void
  placeholder?: string
  className?: string
}

export default function ImageUpload({ value, onChange, placeholder = "Upload image", className }: ImageUploadProps) {
  const [isHovering, setIsHovering] = useState(false)

  // For demo purposes, we'll use a placeholder image
  const handleUpload = () => {
    // In a real implementation, this would handle file upload
    const placeholderUrl = `/placeholder.svg?height=400&width=600&text=${Math.random().toString(36).substring(7)}`
    onChange(placeholderUrl)
  }

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation()
    onChange("")
  }

  return (
    <div
      className={cn(
        "relative flex items-center justify-center border rounded-md cursor-pointer transition-all overflow-hidden",
        value ? "h-40" : "h-32",
        className,
      )}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onClick={handleUpload}
    >
      {value ? (
        <>
          <img src={value || "/placeholder.svg"} alt="Uploaded image" className="w-full h-full object-cover" />
          {isHovering && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <button type="button" className="absolute top-2 right-2 bg-white rounded-full p-1" onClick={handleRemove}>
                <X className="h-4 w-4" />
              </button>
              <span className="text-white text-sm">Click to change</span>
            </div>
          )}
        </>
      ) : (
        <div className="flex flex-col items-center justify-center p-4 text-center">
          <Upload className="h-8 w-8 mb-2 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">{placeholder}</span>
        </div>
      )}
    </div>
  )
}
