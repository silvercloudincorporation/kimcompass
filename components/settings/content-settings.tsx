"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"

export default function ContentSettings() {
  const [contentModeration, setContentModeration] = useState("post")
  const [allowComments, setAllowComments] = useState(true)
  const [allowRatings, setAllowRatings] = useState(true)
  const [maxUploadSize, setMaxUploadSize] = useState("10")
  const [allowedFileTypes, setAllowedFileTypes] = useState<string[]>(["image", "document", "audio"])

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Content Moderation</CardTitle>
          <CardDescription>Configure how content is moderated and published on the platform.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="content-moderation">Content Moderation</Label>
            <Select value={contentModeration} onValueChange={setContentModeration}>
              <SelectTrigger id="content-moderation">
                <SelectValue placeholder="Select moderation type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pre">Pre-moderation (approve before publishing)</SelectItem>
                <SelectItem value="post">Post-moderation (review after publishing)</SelectItem>
                <SelectItem value="none">No moderation</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="allow-comments">Allow Comments</Label>
              <p className="text-sm text-muted-foreground">Enable or disable commenting across the platform.</p>
            </div>
            <Switch id="allow-comments" checked={allowComments} onCheckedChange={setAllowComments} />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="allow-ratings">Allow Ratings</Label>
              <p className="text-sm text-muted-foreground">Enable or disable content rating across the platform.</p>
            </div>
            <Switch id="allow-ratings" checked={allowRatings} onCheckedChange={setAllowRatings} />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Upload Settings</CardTitle>
          <CardDescription>Configure file upload settings and restrictions.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="max-upload-size">Maximum Upload Size (MB)</Label>
            <Input
              id="max-upload-size"
              type="number"
              value={maxUploadSize}
              onChange={(e) => setMaxUploadSize(e.target.value)}
              min="1"
              max="100"
            />
          </div>

          <div className="space-y-2">
            <Label>Allowed File Types</Label>
            <div className="grid grid-cols-2 gap-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="file-type-image"
                  checked={allowedFileTypes.includes("image")}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setAllowedFileTypes([...allowedFileTypes, "image"])
                    } else {
                      setAllowedFileTypes(allowedFileTypes.filter((type) => type !== "image"))
                    }
                  }}
                />
                <Label htmlFor="file-type-image">Images (JPG, PNG, GIF)</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="file-type-document"
                  checked={allowedFileTypes.includes("document")}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setAllowedFileTypes([...allowedFileTypes, "document"])
                    } else {
                      setAllowedFileTypes(allowedFileTypes.filter((type) => type !== "document"))
                    }
                  }}
                />
                <Label htmlFor="file-type-document">Documents (PDF, DOC)</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="file-type-audio"
                  checked={allowedFileTypes.includes("audio")}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setAllowedFileTypes([...allowedFileTypes, "audio"])
                    } else {
                      setAllowedFileTypes(allowedFileTypes.filter((type) => type !== "audio"))
                    }
                  }}
                />
                <Label htmlFor="file-type-audio">Audio (MP3, WAV)</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="file-type-video"
                  checked={allowedFileTypes.includes("video")}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setAllowedFileTypes([...allowedFileTypes, "video"])
                    } else {
                      setAllowedFileTypes(allowedFileTypes.filter((type) => type !== "video"))
                    }
                  }}
                />
                <Label htmlFor="file-type-video">Video (MP4, MOV)</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="file-type-archive"
                  checked={allowedFileTypes.includes("archive")}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setAllowedFileTypes([...allowedFileTypes, "archive"])
                    } else {
                      setAllowedFileTypes(allowedFileTypes.filter((type) => type !== "archive"))
                    }
                  }}
                />
                <Label htmlFor="file-type-archive">Archives (ZIP, RAR)</Label>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  )
}
