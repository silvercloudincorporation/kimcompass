"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function NotificationSettings() {
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [inAppNotifications, setInAppNotifications] = useState(true)
  const [digestEmails, setDigestEmails] = useState(true)
  const [welcomeEmailTemplate, setWelcomeEmailTemplate] = useState(
    "Welcome to KimCompass!\n\nThank you for joining our platform dedicated to preserving and sharing Kenyan family histories.\n\nBest regards,\nThe KimCompass Team",
  )
  const [verificationEmailTemplate, setVerificationEmailTemplate] = useState(
    "Please verify your email address by clicking the link below:\n\n{verification_link}\n\nThis link will expire in 24 hours.\n\nBest regards,\nThe KimCompass Team",
  )

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Notification Preferences</CardTitle>
          <CardDescription>Configure how and when notifications are sent to users.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="email-notifications">Email Notifications</Label>
              <p className="text-sm text-muted-foreground">Send email notifications for important events.</p>
            </div>
            <Switch id="email-notifications" checked={emailNotifications} onCheckedChange={setEmailNotifications} />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="in-app-notifications">In-App Notifications</Label>
              <p className="text-sm text-muted-foreground">Show notifications within the application.</p>
            </div>
            <Switch id="in-app-notifications" checked={inAppNotifications} onCheckedChange={setInAppNotifications} />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="digest-emails">Weekly Digest Emails</Label>
              <p className="text-sm text-muted-foreground">Send weekly summary emails of platform activity.</p>
            </div>
            <Switch id="digest-emails" checked={digestEmails} onCheckedChange={setDigestEmails} />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Email Templates</CardTitle>
          <CardDescription>Customize the email templates sent to users.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Tabs defaultValue="welcome" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="welcome">Welcome</TabsTrigger>
              <TabsTrigger value="verification">Verification</TabsTrigger>
              <TabsTrigger value="password-reset">Password Reset</TabsTrigger>
            </TabsList>
            <TabsContent value="welcome" className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="welcome-subject">Email Subject</Label>
                <Input id="welcome-subject" defaultValue="Welcome to KimCompass" placeholder="Enter email subject" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="welcome-template">Email Body</Label>
                <Textarea
                  id="welcome-template"
                  value={welcomeEmailTemplate}
                  onChange={(e) => setWelcomeEmailTemplate(e.target.value)}
                  placeholder="Enter email template"
                  rows={8}
                />
                <p className="text-sm text-muted-foreground">
                  Available variables: {"{name}"}, {"{email}"}, {"{login_link}"}
                </p>
              </div>
              <Button variant="outline" size="sm">
                Reset to Default
              </Button>
            </TabsContent>
            <TabsContent value="verification" className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="verification-subject">Email Subject</Label>
                <Input
                  id="verification-subject"
                  defaultValue="Verify Your Email Address"
                  placeholder="Enter email subject"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="verification-template">Email Body</Label>
                <Textarea
                  id="verification-template"
                  value={verificationEmailTemplate}
                  onChange={(e) => setVerificationEmailTemplate(e.target.value)}
                  placeholder="Enter email template"
                  rows={8}
                />
                <p className="text-sm text-muted-foreground">
                  Available variables: {"{name}"}, {"{email}"}, {"{verification_link}"}, {"{expiry_time}"}
                </p>
              </div>
              <Button variant="outline" size="sm">
                Reset to Default
              </Button>
            </TabsContent>
            <TabsContent value="password-reset" className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="reset-subject">Email Subject</Label>
                <Input id="reset-subject" defaultValue="Reset Your Password" placeholder="Enter email subject" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="reset-template">Email Body</Label>
                <Textarea
                  id="reset-template"
                  defaultValue="You have requested to reset your password. Please click the link below to set a new password:\n\n{reset_link}\n\nThis link will expire in 1 hour.\n\nIf you did not request this, please ignore this email.\n\nBest regards,\nThe KimCompass Team"
                  placeholder="Enter email template"
                  rows={8}
                />
                <p className="text-sm text-muted-foreground">
                  Available variables: {"{name}"}, {"{email}"}, {"{reset_link}"}, {"{expiry_time}"}
                </p>
              </div>
              <Button variant="outline" size="sm">
                Reset to Default
              </Button>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </>
  )
}
