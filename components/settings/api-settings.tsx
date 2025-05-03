"use client"

import { Checkbox } from "@/components/ui/checkbox"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Copy, Eye, EyeOff, RefreshCw } from "lucide-react"
import { Separator } from "@/components/ui/separator"

export default function ApiSettings() {
  const [apiEnabled, setApiEnabled] = useState(true)
  const [rateLimitPerMinute, setRateLimitPerMinute] = useState("60")
  const [showApiKey, setShowApiKey] = useState(false)
  const [apiKey, setApiKey] = useState("sk_live_51KjdnLJHMVbfKQZnJHMVbfKQZn")
  const [webhookUrl, setWebhookUrl] = useState("")
  const [webhookSecret, setWebhookSecret] = useState("whsec_8KjdnLJHMVbfKQZnJHMVbfKQZn")
  const [showWebhookSecret, setShowWebhookSecret] = useState(false)

  const regenerateApiKey = () => {
    // In a real app, this would call an API to regenerate the key
    setApiKey(`sk_live_${Math.random().toString(36).substring(2, 15)}${Math.random().toString(36).substring(2, 15)}`)
  }

  const regenerateWebhookSecret = () => {
    // In a real app, this would call an API to regenerate the secret
    setWebhookSecret(`whsec_${Math.random().toString(36).substring(2, 15)}`)
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    // In a real app, you would show a toast notification here
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>API Access</CardTitle>
          <CardDescription>Configure API access and security settings.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="api-enabled">Enable API Access</Label>
              <p className="text-sm text-muted-foreground">
                Allow external applications to access the platform via API.
              </p>
            </div>
            <Switch id="api-enabled" checked={apiEnabled} onCheckedChange={setApiEnabled} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="rate-limit">Rate Limit (requests per minute)</Label>
            <Input
              id="rate-limit"
              type="number"
              value={rateLimitPerMinute}
              onChange={(e) => setRateLimitPerMinute(e.target.value)}
              min="10"
              max="1000"
              disabled={!apiEnabled}
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="api-key">API Key</Label>
              <Button variant="ghost" size="sm" onClick={() => setShowApiKey(!showApiKey)} disabled={!apiEnabled}>
                {showApiKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </Button>
            </div>
            <div className="flex">
              <Input
                id="api-key"
                type={showApiKey ? "text" : "password"}
                value={apiKey}
                readOnly
                disabled={!apiEnabled}
                className="rounded-r-none"
              />
              <Button
                variant="outline"
                className="rounded-l-none border-l-0"
                onClick={() => copyToClipboard(apiKey)}
                disabled={!apiEnabled}
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex justify-end">
              <Button
                variant="outline"
                size="sm"
                onClick={regenerateApiKey}
                disabled={!apiEnabled}
                className="flex items-center gap-2"
              >
                <RefreshCw className="h-3 w-3" />
                Regenerate
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Webhooks</CardTitle>
          <CardDescription>Configure webhooks to receive real-time event notifications.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="webhook-url">Webhook URL</Label>
            <Input
              id="webhook-url"
              type="url"
              value={webhookUrl}
              onChange={(e) => setWebhookUrl(e.target.value)}
              placeholder="https://your-app.com/webhooks/kimcompass"
              disabled={!apiEnabled}
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="webhook-secret">Webhook Secret</Label>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowWebhookSecret(!showWebhookSecret)}
                disabled={!apiEnabled}
              >
                {showWebhookSecret ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </Button>
            </div>
            <div className="flex">
              <Input
                id="webhook-secret"
                type={showWebhookSecret ? "text" : "password"}
                value={webhookSecret}
                readOnly
                disabled={!apiEnabled}
                className="rounded-r-none"
              />
              <Button
                variant="outline"
                className="rounded-l-none border-l-0"
                onClick={() => copyToClipboard(webhookSecret)}
                disabled={!apiEnabled}
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex justify-end">
              <Button
                variant="outline"
                size="sm"
                onClick={regenerateWebhookSecret}
                disabled={!apiEnabled}
                className="flex items-center gap-2"
              >
                <RefreshCw className="h-3 w-3" />
                Regenerate
              </Button>
            </div>
          </div>

          <Separator className="my-4" />

          <div className="space-y-2">
            <Label>Webhook Events</Label>
            <p className="text-sm text-muted-foreground mb-2">
              Select which events should trigger webhook notifications.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <div className="flex items-center space-x-2">
                <Checkbox id="event-user-created" />
                <Label htmlFor="event-user-created">User Created</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="event-user-updated" />
                <Label htmlFor="event-user-updated">User Updated</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="event-content-created" />
                <Label htmlFor="event-content-created">Content Created</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="event-content-updated" />
                <Label htmlFor="event-content-updated">Content Updated</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="event-family-linked" />
                <Label htmlFor="event-family-linked">Family Linked</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="event-verification-completed" />
                <Label htmlFor="event-verification-completed">Verification Completed</Label>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button disabled={!apiEnabled || !webhookUrl}>Save Webhook Configuration</Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>API Documentation</CardTitle>
          <CardDescription>Access and manage API documentation.</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="rest" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="rest">REST API</TabsTrigger>
              <TabsTrigger value="graphql">GraphQL API</TabsTrigger>
            </TabsList>
            <TabsContent value="rest" className="space-y-4 mt-4">
              <p className="text-sm">
                Our REST API provides a comprehensive set of endpoints for interacting with the KimCompass platform.
              </p>
              <Button variant="outline" className="w-full">
                View REST API Documentation
              </Button>
            </TabsContent>
            <TabsContent value="graphql" className="space-y-4 mt-4">
              <p className="text-sm">
                Our GraphQL API provides a flexible query language for interacting with the KimCompass platform.
              </p>
              <Button variant="outline" className="w-full">
                View GraphQL API Documentation
              </Button>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </>
  )
}
