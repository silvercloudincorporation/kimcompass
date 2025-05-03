"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Upload, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface ImageUploadProps {
  value: string
  onChange: (url: string) => void
  placeholder?: string
  className?: string
  accept?: string
  maxSizeMB?: number
}

export default function ImageUpload({
  value,
  onChange,
  placeholder = "Upload image",
  className,
  accept = "image/jpeg, image/png, image/webp",
  maxSizeMB = 5,
}: ImageUploadProps) {
  const [isHovering, setIsHovering] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleUploadClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    fileInputRef.current?.click()
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    setError(null)

    if (!file) return

    // Validate file type
    if (!file.type.match(/(jpeg|jpg|png|webp)/i)) {
      setError("Please upload a valid image file (JPEG, PNG, or WebP)")
      return
    }

    // Validate file size
    if (file.size > maxSizeMB * 1024 * 1024) {
      setError(`File size must be less than ${maxSizeMB}MB`)
      return
    }

    // For demo purposes, we'll create a local object URL
    // In a real app, you would upload to a server and get a URL back
    const objectUrl = URL.createObjectURL(file)
    onChange(objectUrl)

    // Reset the input value so the same file can be selected again if needed
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const handleRemove = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    onChange("")
    setError(null)
  }

  return (
    <div className="space-y-2">
      <div
        className={cn(
          "relative flex items-center justify-center border rounded-md transition-all overflow-hidden",
          value ? "h-40" : "h-32",
          error ? "border-red-500" : "border-input",
          className,
        )}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <input type="file" ref={fileInputRef} className="hidden" accept={accept} onChange={handleFileChange} />

        {value ? (
          <>
            <img src={value || "/placeholder.svg"} alt="Uploaded image" className="w-full h-full object-cover" />
            {isHovering && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="absolute top-2 right-2 h-8 w-8 p-0 bg-white hover:bg-white/90"
                  onClick={handleRemove}
                >
                  <X className="h-4 w-4" />
                </Button>
                <Button type="button" variant="secondary" size="sm" onClick={handleUploadClick}>
                  Change image
                </Button>
              </div>
            )}
          </>
        ) : (
          <div
            className="flex flex-col items-center justify-center p-4 text-center cursor-pointer"
            onClick={handleUploadClick}
          >
            <Upload className="h-8 w-8 mb-2 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">{placeholder}</span>
            <span className="text-xs text-muted-foreground mt-1">{`(Max ${maxSizeMB}MB, JPEG, PNG or WebP)`}</span>
          </div>
        )}
      </div>

      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  )
}
