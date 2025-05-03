"use client"

import { Textarea } from "@/components/ui/textarea"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Shield, RefreshCw } from "lucide-react"

export default function SecuritySettings() {
  const [twoFactorRequired, setTwoFactorRequired] = useState(false)
  const [passwordExpiry, setPasswordExpiry] = useState("90")
  const [passwordComplexity, setPasswordComplexity] = useState(3)
  const [minPasswordLength, setMinPasswordLength] = useState("8")
  const [ipRestriction, setIpRestriction] = useState(false)
  const [allowedIps, setAllowedIps] = useState("")

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Authentication Settings</CardTitle>
          <CardDescription>Configure authentication and security policies.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="two-factor">Require Two-Factor Authentication</Label>
              <p className="text-sm text-muted-foreground">Require all users to set up two-factor authentication.</p>
            </div>
            <Switch id="two-factor" checked={twoFactorRequired} onCheckedChange={setTwoFactorRequired} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password-expiry">Password Expiry (days)</Label>
            <Input
              id="password-expiry"
              type="number"
              value={passwordExpiry}
              onChange={(e) => setPasswordExpiry(e.target.value)}
              min="0"
              max="365"
            />
            <p className="text-sm text-muted-foreground">
              Number of days before passwords expire. Set to 0 for no expiry.
            </p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password-complexity">Password Complexity</Label>
              <span className="text-sm font-medium">
                {passwordComplexity === 1 && "Low"}
                {passwordComplexity === 2 && "Medium"}
                {passwordComplexity === 3 && "High"}
                {passwordComplexity === 4 && "Very High"}
              </span>
            </div>
            <Slider
              id="password-complexity"
              defaultValue={[passwordComplexity]}
              max={4}
              step={1}
              onValueChange={(value) => setPasswordComplexity(value[0])}
              className="w-full"
            />
            <p className="text-sm text-muted-foreground">
              {passwordComplexity === 1 && "Requires lowercase letters only"}
              {passwordComplexity === 2 && "Requires lowercase and uppercase letters"}
              {passwordComplexity === 3 && "Requires lowercase, uppercase, and numbers"}
              {passwordComplexity === 4 && "Requires lowercase, uppercase, numbers, and special characters"}
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="min-password-length">Minimum Password Length</Label>
            <Input
              id="min-password-length"
              type="number"
              value={minPasswordLength}
              onChange={(e) => setMinPasswordLength(e.target.value)}
              min="6"
              max="32"
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Access Restrictions</CardTitle>
          <CardDescription>Configure IP-based access restrictions for admin users.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="ip-restriction">Enable IP Restrictions</Label>
              <p className="text-sm text-muted-foreground">Restrict admin access to specific IP addresses.</p>
            </div>
            <Switch id="ip-restriction" checked={ipRestriction} onCheckedChange={setIpRestriction} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="allowed-ips">Allowed IP Addresses</Label>
            <Textarea
              id="allowed-ips"
              value={allowedIps}
              onChange={(e) => setAllowedIps(e.target.value)}
              placeholder="Enter IP addresses, one per line"
              rows={4}
              disabled={!ipRestriction}
            />
            <p className="text-sm text-muted-foreground">
              Enter one IP address or CIDR range per line (e.g., 192.168.1.1 or 192.168.1.0/24)
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Security Tools</CardTitle>
          <CardDescription>Additional security tools and actions.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button variant="outline" className="h-auto py-4 px-4 flex flex-col items-center justify-center gap-2">
              <Shield className="h-6 w-6 text-primary" />
              <div className="text-center">
                <h3 className="font-medium">Security Audit</h3>
                <p className="text-sm text-muted-foreground">Run a security audit on your platform</p>
              </div>
            </Button>

            <Button variant="outline" className="h-auto py-4 px-4 flex flex-col items-center justify-center gap-2">
              <RefreshCw className="h-6 w-6 text-primary" />
              <div className="text-center">
                <h3 className="font-medium">Regenerate Security Keys</h3>
                <p className="text-sm text-muted-foreground">Regenerate all security keys and tokens</p>
              </div>
            </Button>
          </div>
        </CardContent>
      </Card>
    </>
  )
}
