"use client"

import type React from "react"

import { useRef, useState, useEffect } from "react"
import { Bold, Italic, List, ListOrdered, AlignLeft, AlignCenter, AlignRight, Link, Image } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Input } from "@/components/ui/input"

interface RichTextEditorProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  className?: string
  minHeight?: string
}

export function RichTextEditor({
  value,
  onChange,
  placeholder = "Enter content...",
  className,
  minHeight = "200px",
}: RichTextEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null)
  const [linkUrl, setLinkUrl] = useState("")
  const [linkText, setLinkText] = useState("")
  const [imageUrl, setImageUrl] = useState("")
  const [imageAlt, setImageAlt] = useState("")
  const [isLinkPopoverOpen, setIsLinkPopoverOpen] = useState(false)
  const [isImagePopoverOpen, setIsImagePopoverOpen] = useState(false)
  const [selection, setSelection] = useState<Range | null>(null)

  // Initialize editor with value
  useEffect(() => {
    if (editorRef.current && value && !editorRef.current.innerHTML) {
      editorRef.current.innerHTML = value
    }
  }, [value])

  // Save selection before opening popovers
  const saveSelection = () => {
    const sel = window.getSelection()
    if (sel && sel.rangeCount > 0) {
      setSelection(sel.getRangeAt(0).cloneRange())
    }
  }

  // Restore selection when inserting content
  const restoreSelection = () => {
    if (selection && editorRef.current) {
      const sel = window.getSelection()
      if (sel) {
        sel.removeAllRanges()
        sel.addRange(selection)
      }
    }
  }

  // Handle editor content changes
  const handleContentChange = () => {
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML)
    }
  }

  // Execute commands safely
  const execCommand = (command: string, value: string | null = null) => {
    document.execCommand("styleWithCSS", false, "true")
    document.execCommand(command, false, value || '')
    handleContentChange()
    if (editorRef.current) {
      editorRef.current.focus()
    }
  }

  // Handle link insertion
  const handleInsertLink = () => {
    if (linkUrl) {
      restoreSelection()

      // If text is selected, create link with that text
      const sel = window.getSelection()
      if (sel && sel.toString().trim() !== "") {
        execCommand("createLink", linkUrl)
      } else {
        // Otherwise insert new link with provided text
        const linkHtml = `<a href="${linkUrl}" target="_blank" rel="noopener noreferrer">${linkText || linkUrl}</a>`
        execCommand("insertHTML", linkHtml)
      }

      setLinkUrl("")
      setLinkText("")
      setIsLinkPopoverOpen(false)
    }
  }

  // Handle image insertion
  const handleInsertImage = () => {
    if (imageUrl) {
      restoreSelection()
      const imgHtml = `<img src="${imageUrl}" alt="${imageAlt}" style="max-width: 100%; height: auto;" />`
      execCommand("insertHTML", imgHtml)
      setImageUrl("")
      setImageAlt("")
      setIsImagePopoverOpen(false)
    }
  }

  // Focus the editor when clicking on the container
  const handleContainerClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget && editorRef.current) {
      editorRef.current.focus()
    }
  }

  return (
    <div className={cn("border rounded-md", className)} onClick={handleContainerClick}>
      <div className="flex flex-wrap gap-1 p-2 border-b bg-muted/50">
        <Button type="button" variant="ghost" size="icon" className="h-8 w-8" onClick={() => execCommand("bold")}>
          <Bold className="h-4 w-4" />
          <span className="sr-only">Bold</span>
        </Button>
        <Button type="button" variant="ghost" size="icon" className="h-8 w-8" onClick={() => execCommand("italic")}>
          <Italic className="h-4 w-4" />
          <span className="sr-only">Italic</span>
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={() => execCommand("insertUnorderedList")}
        >
          <List className="h-4 w-4" />
          <span className="sr-only">Bullet List</span>
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={() => execCommand("insertOrderedList")}
        >
          <ListOrdered className="h-4 w-4" />
          <span className="sr-only">Numbered List</span>
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={() => execCommand("justifyLeft")}
        >
          <AlignLeft className="h-4 w-4" />
          <span className="sr-only">Align Left</span>
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={() => execCommand("justifyCenter")}
        >
          <AlignCenter className="h-4 w-4" />
          <span className="sr-only">Align Center</span>
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={() => execCommand("justifyRight")}
        >
          <AlignRight className="h-4 w-4" />
          <span className="sr-only">Align Right</span>
        </Button>

        <Popover open={isLinkPopoverOpen} onOpenChange={setIsLinkPopoverOpen}>
          <PopoverTrigger asChild>
            <Button type="button" variant="ghost" size="icon" className="h-8 w-8" onClick={saveSelection}>
              <Link className="h-4 w-4" />
              <span className="sr-only">Insert Link</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80">
            <div className="space-y-2">
              <h4 className="font-medium">Insert Link</h4>
              <div className="space-y-2">
                <Input type="url" placeholder="URL" value={linkUrl} onChange={(e) => setLinkUrl(e.target.value)} />
                <Input
                  type="text"
                  placeholder="Text (optional)"
                  value={linkText}
                  onChange={(e) => setLinkText(e.target.value)}
                />
                <Button type="button" size="sm" onClick={handleInsertLink} className="w-full">
                  Insert
                </Button>
              </div>
            </div>
          </PopoverContent>
        </Popover>

        <Popover open={isImagePopoverOpen} onOpenChange={setIsImagePopoverOpen}>
          <PopoverTrigger asChild>
            <Button type="button" variant="ghost" size="icon" className="h-8 w-8" onClick={saveSelection}>
              <Image className="h-4 w-4" />
              <span className="sr-only">Insert Image</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80">
            <div className="space-y-2">
              <h4 className="font-medium">Insert Image</h4>
              <div className="space-y-2">
                <Input
                  type="url"
                  placeholder="Image URL"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                />
                <Input
                  type="text"
                  placeholder="Alt text"
                  value={imageAlt}
                  onChange={(e) => setImageAlt(e.target.value)}
                />
                <Button type="button" size="sm" onClick={handleInsertImage} className="w-full">
                  Insert
                </Button>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>

      <div
        ref={editorRef}
        contentEditable
        className="p-3 outline-none min-h-[200px]"
        style={{ minHeight }}
        onInput={handleContentChange}
        onBlur={handleContentChange}
        dangerouslySetInnerHTML={{ __html: value }}
        data-placeholder={placeholder}
        onFocus={(e) => {
          // If empty, place cursor at beginning
          if (!e.currentTarget.textContent?.trim()) {
            e.currentTarget.innerHTML = "<p><br></p>"
            const range = document.createRange()
            const sel = window.getSelection()
            if (sel) {
              range.setStart(e.currentTarget.firstChild!.firstChild!, 0)
              range.collapse(true)
              sel.removeAllRanges()
              sel.addRange(range)
            }
          }
        }}
      />

      <style jsx global>{`
        [contenteditable=true]:empty:before {
          content: attr(data-placeholder);
          color: #9ca3af;
          cursor: text;
        }
      `}</style>
    </div>
  )
}
