"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Upload } from "lucide-react"

export default function GeneralSettings() {
  const [siteName, setSiteName] = useState("KimCompass")
  const [siteDescription, setSiteDescription] = useState(
    "A comprehensive platform for managing Kenyan family histories and genealogy.",
  )
  const [siteLanguage, setSiteLanguage] = useState("en")
  const [timezone, setTimezone] = useState("Africa/Nairobi")
  const [maintenanceMode, setMaintenanceMode] = useState(false)
  const [analyticsEnabled, setAnalyticsEnabled] = useState(true)

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Site Information</CardTitle>
          <CardDescription>Basic information about your site that appears across the platform.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="site-name">Site Name</Label>
            <Input
              id="site-name"
              value={siteName}
              onChange={(e) => setSiteName(e.target.value)}
              placeholder="Enter site name"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="site-description">Site Description</Label>
            <Textarea
              id="site-description"
              value={siteDescription}
              onChange={(e) => setSiteDescription(e.target.value)}
              placeholder="Enter site description"
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="site-logo">Site Logo</Label>
            <div className="flex items-center gap-4">
              <div className="h-16 w-16 rounded-md bg-muted flex items-center justify-center">
                <img src="/placeholder.svg?height=64&width=64" alt="Site logo" className="h-12 w-12 object-contain" />
              </div>
              <Button variant="outline" size="sm" className="flex items-center gap-2">
                <Upload className="h-4 w-4" />
                Upload New Logo
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Regional Settings</CardTitle>
          <CardDescription>Configure language, timezone, and other regional preferences.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="language">Default Language</Label>
            <Select value={siteLanguage} onValueChange={setSiteLanguage}>
              <SelectTrigger id="language">
                <SelectValue placeholder="Select language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="sw">Swahili</SelectItem>
                <SelectItem value="luo">Luo</SelectItem>
                <SelectItem value="kikuyu">Kikuyu</SelectItem>
                <SelectItem value="kamba">Kamba</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="timezone">Timezone</Label>
            <Select value={timezone} onValueChange={setTimezone}>
              <SelectTrigger id="timezone">
                <SelectValue placeholder="Select timezone" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Africa/Nairobi">East Africa Time (EAT)</SelectItem>
                <SelectItem value="UTC">Coordinated Universal Time (UTC)</SelectItem>
                <SelectItem value="Europe/London">Greenwich Mean Time (GMT)</SelectItem>
                <SelectItem value="America/New_York">Eastern Time (ET)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>System Settings</CardTitle>
          <CardDescription>Configure system-wide settings and features.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="maintenance-mode">Maintenance Mode</Label>
              <p className="text-sm text-muted-foreground">
                When enabled, the site will display a maintenance message to all users.
              </p>
            </div>
            <Switch id="maintenance-mode" checked={maintenanceMode} onCheckedChange={setMaintenanceMode} />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="analytics">Analytics</Label>
              <p className="text-sm text-muted-foreground">Enable or disable analytics tracking across the platform.</p>
            </div>
            <Switch id="analytics" checked={analyticsEnabled} onCheckedChange={setAnalyticsEnabled} />
          </div>
        </CardContent>
      </Card>
    </>
  )
}
