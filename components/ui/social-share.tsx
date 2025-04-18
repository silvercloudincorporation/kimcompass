"use client"

import { useState } from "react"
import { Facebook, Twitter, Linkedin, Mail, LinkIcon, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { toast } from "@/components/ui/use-toast"

interface SocialShareProps {
  url: string
  title: string
  description?: string
  className?: string
  platforms?: ("facebook" | "twitter" | "linkedin" | "email" | "copy")[]
  size?: "sm" | "md" | "lg"
  variant?: "default" | "subtle"
}

export function SocialShare({
  url,
  title,
  description = "",
  className = "",
  platforms = ["facebook", "twitter", "linkedin", "email", "copy"],
  size = "md",
  variant = "default",
}: SocialShareProps) {
  const [copied, setCopied] = useState(false)

  const encodedUrl = encodeURIComponent(url)
  const encodedTitle = encodeURIComponent(title)
  const encodedDescription = description ? encodeURIComponent(description) : ""

  const copyToClipboard = () => {
    navigator.clipboard.writeText(url).then(
      () => {
        setCopied(true)
        toast({
          title: "Link copied",
          description: "The link has been copied to your clipboard.",
        })

        // Reset copied state after 2 seconds
        setTimeout(() => setCopied(false), 2000)
      },
      (err) => {
        console.error("Could not copy text: ", err)
        toast({
          title: "Failed to copy",
          description: "There was an error copying the link.",
          variant: "destructive",
        })
      },
    )
  }

  // Size classes for icons and buttons
  const sizeClasses = {
    sm: {
      icon: "h-3.5 w-3.5",
      button: "h-7 w-7",
      container: "gap-1",
      label: "text-xs",
    },
    md: {
      icon: "h-4 w-4",
      button: "h-8 w-8",
      container: "gap-2",
      label: "text-sm",
    },
    lg: {
      icon: "h-5 w-5",
      button: "h-9 w-9",
      container: "gap-3",
      label: "text-base",
    },
  }

  // Variant classes
  const variantClasses = {
    default: "bg-background border",
    subtle: "text-muted-foreground hover:text-foreground",
  }

  return (
    <TooltipProvider>
      <div className={`flex items-center ${sizeClasses[size].container} ${className}`}>
        <span className={`font-medium ${sizeClasses[size].label}`}>Share:</span>

        {platforms.includes("facebook") && (
          <Tooltip>
            <TooltipTrigger asChild>
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center justify-center rounded-full ${sizeClasses[size].button} ${variantClasses[variant]} transition-colors hover:bg-muted`}
                aria-label="Share on Facebook"
              >
                <Facebook className={sizeClasses[size].icon} />
              </a>
            </TooltipTrigger>
            <TooltipContent>
              <p>Share on Facebook</p>
            </TooltipContent>
          </Tooltip>
        )}

        {platforms.includes("twitter") && (
          <Tooltip>
            <TooltipTrigger asChild>
              <a
                href={`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center justify-center rounded-full ${sizeClasses[size].button} ${variantClasses[variant]} transition-colors hover:bg-muted`}
                aria-label="Share on Twitter"
              >
                <Twitter className={sizeClasses[size].icon} />
              </a>
            </TooltipTrigger>
            <TooltipContent>
              <p>Share on Twitter</p>
            </TooltipContent>
          </Tooltip>
        )}

        {platforms.includes("linkedin") && (
          <Tooltip>
            <TooltipTrigger asChild>
              <a
                href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodedTitle}&summary=${encodedDescription}`}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center justify-center rounded-full ${sizeClasses[size].button} ${variantClasses[variant]} transition-colors hover:bg-muted`}
                aria-label="Share on LinkedIn"
              >
                <Linkedin className={sizeClasses[size].icon} />
              </a>
            </TooltipTrigger>
            <TooltipContent>
              <p>Share on LinkedIn</p>
            </TooltipContent>
          </Tooltip>
        )}

        {platforms.includes("email") && (
          <Tooltip>
            <TooltipTrigger asChild>
              <a
                href={`mailto:?subject=${encodedTitle}&body=${encodedDescription}%0A%0A${encodedUrl}`}
                className={`flex items-center justify-center rounded-full ${sizeClasses[size].button} ${variantClasses[variant]} transition-colors hover:bg-muted`}
                aria-label="Share via Email"
              >
                <Mail className={sizeClasses[size].icon} />
              </a>
            </TooltipTrigger>
            <TooltipContent>
              <p>Share via Email</p>
            </TooltipContent>
          </Tooltip>
        )}

        {platforms.includes("copy") && (
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className={`flex items-center justify-center rounded-full ${sizeClasses[size].button} ${variantClasses[variant]} transition-colors hover:bg-muted`}
                onClick={copyToClipboard}
                aria-label="Copy link"
              >
                {copied ? (
                  <Check className={sizeClasses[size].icon} />
                ) : (
                  <LinkIcon className={sizeClasses[size].icon} />
                )}
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{copied ? "Copied!" : "Copy link"}</p>
            </TooltipContent>
          </Tooltip>
        )}
      </div>
    </TooltipProvider>
  )
}

