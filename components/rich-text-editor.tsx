"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Bold, Italic, List, ListOrdered, Heading1, Heading2, Heading3, Quote, Link } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface RichTextEditorProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

// This is a simplified rich text editor for demonstration purposes
// In a real application, you would use a more robust solution like TipTap, Slate, or React-Quill
export default function RichTextEditor({ value, onChange, placeholder }: RichTextEditorProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const [selectionStart, setSelectionStart] = useState<number>(0)
  const [selectionEnd, setSelectionEnd] = useState<number>(0)

  // Track selection changes
  const handleSelect = () => {
    if (textareaRef.current) {
      setSelectionStart(textareaRef.current.selectionStart)
      setSelectionEnd(textareaRef.current.selectionEnd)
    }
  }

  // Update selection state when textarea is focused
  useEffect(() => {
    const textarea = textareaRef.current
    if (!textarea) return

    const updateSelection = () => {
      setSelectionStart(textarea.selectionStart)
      setSelectionEnd(textarea.selectionEnd)
    }

    textarea.addEventListener("mouseup", updateSelection)
    textarea.addEventListener("keyup", updateSelection)

    return () => {
      textarea.removeEventListener("mouseup", updateSelection)
      textarea.removeEventListener("keyup", updateSelection)
    }
  }, [])

  const insertMarkup = (before: string, after = "", defaultText = "") => {
    if (!textareaRef.current) return

    // Get the current selection
    const start = selectionStart
    const end = selectionEnd

    // Determine what text to wrap
    const selectedText = value.substring(start, end)
    const textToInsert = selectedText || defaultText

    // Create the new value
    const newValue = value.substring(0, start) + before + textToInsert + after + value.substring(end)

    // Update the value
    onChange(newValue)

    // Focus and set selection after update
    setTimeout(() => {
      if (textareaRef.current) {
        textareaRef.current.focus()

        // Calculate new cursor position
        const newPosition = start + before.length + textToInsert.length + after.length

        // If there was no selection and default text was inserted, select the default text
        if (!selectedText && defaultText) {
          textareaRef.current.setSelectionRange(start + before.length, start + before.length + defaultText.length)
        } else {
          // Otherwise place cursor at the end of the inserted text
          textareaRef.current.setSelectionRange(newPosition, newPosition)
        }
      }
    }, 0)
  }

  const formatBold = (e: React.MouseEvent) => {
    e.preventDefault()
    insertMarkup("**", "**", "bold text")
  }

  const formatItalic = (e: React.MouseEvent) => {
    e.preventDefault()
    insertMarkup("_", "_", "italic text")
  }

  const formatH1 = (e: React.MouseEvent) => {
    e.preventDefault()
    insertMarkup("# ", "", "Heading 1")
  }

  const formatH2 = (e: React.MouseEvent) => {
    e.preventDefault()
    insertMarkup("## ", "", "Heading 2")
  }

  const formatH3 = (e: React.MouseEvent) => {
    e.preventDefault()
    insertMarkup("### ", "", "Heading 3")
  }

  const formatQuote = (e: React.MouseEvent) => {
    e.preventDefault()
    insertMarkup("> ", "", "Quoted text")
  }

  const formatBulletList = (e: React.MouseEvent) => {
    e.preventDefault()
    insertMarkup("- ", "", "List item")
  }

  const formatNumberedList = (e: React.MouseEvent) => {
    e.preventDefault()
    insertMarkup("1. ", "", "List item")
  }

  const formatLink = (e: React.MouseEvent) => {
    e.preventDefault()
    insertMarkup("[", "](https://example.com)", "Link text")
  }

  return (
    <div className="border rounded-md">
      <div className="bg-muted p-2 flex flex-wrap gap-1 items-center">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button type="button" variant="ghost" size="sm" onClick={formatBold}>
                <Bold className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Bold</TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button type="button" variant="ghost" size="sm" onClick={formatItalic}>
                <Italic className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Italic</TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <Separator orientation="vertical" className="h-6" />

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button type="button" variant="ghost" size="sm" onClick={formatH1}>
                <Heading1 className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Heading 1</TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button type="button" variant="ghost" size="sm" onClick={formatH2}>
                <Heading2 className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Heading 2</TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button type="button" variant="ghost" size="sm" onClick={formatH3}>
                <Heading3 className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Heading 3</TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <Separator orientation="vertical" className="h-6" />

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button type="button" variant="ghost" size="sm" onClick={formatBulletList}>
                <List className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Bullet List</TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button type="button" variant="ghost" size="sm" onClick={formatNumberedList}>
                <ListOrdered className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Numbered List</TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <Separator orientation="vertical" className="h-6" />

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button type="button" variant="ghost" size="sm" onClick={formatQuote}>
                <Quote className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Quote</TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button type="button" variant="ghost" size="sm" onClick={formatLink}>
                <Link className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Link</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <Textarea
        ref={textareaRef}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onSelect={handleSelect}
        placeholder={placeholder}
        className="min-h-[300px] border-0 rounded-t-none focus-visible:ring-0 focus-visible:ring-offset-0"
      />

      <div className="bg-muted p-2 text-xs text-muted-foreground">
        <p>Use Markdown for formatting: **bold**, _italic_, # heading, etc.</p>
      </div>
    </div>
  )
}
