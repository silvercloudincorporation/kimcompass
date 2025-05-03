"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export default function UserSettings() {
  const [allowRegistration, setAllowRegistration] = useState(true)
  const [requireEmailVerification, setRequireEmailVerification] = useState(true)
  const [defaultUserRole, setDefaultUserRole] = useState("member")
  const [accountApproval, setAccountApproval] = useState("automatic")
  const [maxLoginAttempts, setMaxLoginAttempts] = useState("5")
  const [sessionTimeout, setSessionTimeout] = useState("60")

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Registration Settings</CardTitle>
          <CardDescription>Configure how users can register and join the platform.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="allow-registration">Allow Registration</Label>
              <p className="text-sm text-muted-foreground">When disabled, new users cannot register on the platform.</p>
            </div>
            <Switch id="allow-registration" checked={allowRegistration} onCheckedChange={setAllowRegistration} />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="email-verification">Require Email Verification</Label>
              <p className="text-sm text-muted-foreground">
                Users must verify their email address before accessing the platform.
              </p>
            </div>
            <Switch
              id="email-verification"
              checked={requireEmailVerification}
              onCheckedChange={setRequireEmailVerification}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="default-role">Default User Role</Label>
            <Select value={defaultUserRole} onValueChange={setDefaultUserRole}>
              <SelectTrigger id="default-role">
                <SelectValue placeholder="Select default role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="member">Member</SelectItem>
                <SelectItem value="contributor">Contributor</SelectItem>
                <SelectItem value="editor">Editor</SelectItem>
                <SelectItem value="moderator">Moderator</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Account Approval</Label>
            <RadioGroup value={accountApproval} onValueChange={setAccountApproval}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="automatic" id="automatic" />
                <Label htmlFor="automatic">Automatic</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="manual" id="manual" />
                <Label htmlFor="manual">Manual approval by admin</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="email" id="email" />
                <Label htmlFor="email">Email verification only</Label>
              </div>
            </RadioGroup>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Session Settings</CardTitle>
          <CardDescription>Configure user session behavior and security.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="max-login-attempts">Maximum Login Attempts</Label>
            <Input
              id="max-login-attempts"
              type="number"
              value={maxLoginAttempts}
              onChange={(e) => setMaxLoginAttempts(e.target.value)}
              min="1"
              max="10"
            />
            <p className="text-sm text-muted-foreground">
              Number of failed login attempts before account is temporarily locked.
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="session-timeout">Session Timeout (minutes)</Label>
            <Input
              id="session-timeout"
              type="number"
              value={sessionTimeout}
              onChange={(e) => setSessionTimeout(e.target.value)}
              min="5"
              max="1440"
            />
            <p className="text-sm text-muted-foreground">
              Time of inactivity before a user is automatically logged out.
            </p>
          </div>
        </CardContent>
      </Card>
    </>
  )
}
