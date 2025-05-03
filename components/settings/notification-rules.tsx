"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Plus, Trash2, Copy, Bell, Clock, Users, Calendar } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

interface NotificationRule {
  id: string
  name: string
  event: string
  conditions: string[]
  actions: string[]
  schedule: string
  enabled: boolean
}

export default function NotificationRules() {
  const [rules, setRules] = useState<NotificationRule[]>([
    {
      id: "rule-1",
      name: "New User Registration",
      event: "user.created",
      conditions: ["User role is Member", "Registration source is Website"],
      actions: ["Send welcome email", "Create in-app notification"],
      schedule: "Immediately",
      enabled: true,
    },
    {
      id: "rule-2",
      name: "Content Approval Required",
      event: "content.submitted",
      conditions: ["Content type is Family History", "User verification level < 2"],
      actions: ["Notify admin team", "Add to moderation queue"],
      schedule: "Immediately",
      enabled: true,
    },
    {
      id: "rule-3",
      name: "Weekly Activity Digest",
      event: "schedule.weekly",
      conditions: ["User has activity in last 7 days", "User preference allows digest emails"],
      actions: ["Generate activity report", "Send digest email"],
      schedule: "Every Monday at 9:00 AM",
      enabled: false,
    },
  ])

  const [activeTab, setActiveTab] = useState("all-rules")

  const toggleRuleStatus = (id: string) => {
    setRules(rules.map((rule) => (rule.id === id ? { ...rule, enabled: !rule.enabled } : rule)))
  }

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Notification Rules</CardTitle>
              <CardDescription>Configure automated notification rules based on events and conditions.</CardDescription>
            </div>
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Create Rule
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="all-rules">All Rules</TabsTrigger>
              <TabsTrigger value="active-rules">Active</TabsTrigger>
              <TabsTrigger value="inactive-rules">Inactive</TabsTrigger>
            </TabsList>
            <TabsContent value="all-rules" className="space-y-4 mt-4">
              <div className="space-y-2">
                {rules.map((rule) => (
                  <Card key={rule.id} className={!rule.enabled ? "opacity-70" : ""}>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <CardTitle className="text-base">{rule.name}</CardTitle>
                          {!rule.enabled && <Badge variant="outline">Inactive</Badge>}
                        </div>
                        <Switch checked={rule.enabled} onCheckedChange={() => toggleRuleStatus(rule.id)} />
                      </div>
                      <CardDescription>Triggered by: {rule.event}</CardDescription>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <h4 className="text-sm font-semibold mb-1">Conditions</h4>
                          <ul className="text-sm space-y-1">
                            {rule.conditions.map((condition, i) => (
                              <li key={i} className="flex items-start gap-2">
                                <span className="text-muted-foreground">•</span>
                                <span>{condition}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className="text-sm font-semibold mb-1">Actions</h4>
                          <ul className="text-sm space-y-1">
                            {rule.actions.map((action, i) => (
                              <li key={i} className="flex items-start gap-2">
                                <span className="text-muted-foreground">•</span>
                                <span>{action}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className="text-sm font-semibold mb-1">Schedule</h4>
                          <p className="text-sm">{rule.schedule}</p>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-end gap-2 pt-0">
                      <Button variant="ghost" size="sm" className="h-8">
                        <Copy className="h-4 w-4 mr-2" />
                        Duplicate
                      </Button>
                      <Button variant="ghost" size="sm" className="h-8">
                        Edit
                      </Button>
                      <Button variant="ghost" size="sm" className="h-8 text-destructive hover:text-destructive">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="active-rules" className="space-y-4 mt-4">
              <div className="space-y-2">
                {rules
                  .filter((rule) => rule.enabled)
                  .map((rule) => (
                    <Card key={rule.id}>
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-center">
                          <CardTitle className="text-base">{rule.name}</CardTitle>
                          <Switch checked={rule.enabled} onCheckedChange={() => toggleRuleStatus(rule.id)} />
                        </div>
                        <CardDescription>Triggered by: {rule.event}</CardDescription>
                      </CardHeader>
                      <CardContent className="pb-2">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div>
                            <h4 className="text-sm font-semibold mb-1">Conditions</h4>
                            <ul className="text-sm space-y-1">
                              {rule.conditions.map((condition, i) => (
                                <li key={i} className="flex items-start gap-2">
                                  <span className="text-muted-foreground">•</span>
                                  <span>{condition}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <h4 className="text-sm font-semibold mb-1">Actions</h4>
                            <ul className="text-sm space-y-1">
                              {rule.actions.map((action, i) => (
                                <li key={i} className="flex items-start gap-2">
                                  <span className="text-muted-foreground">•</span>
                                  <span>{action}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <h4 className="text-sm font-semibold mb-1">Schedule</h4>
                            <p className="text-sm">{rule.schedule}</p>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="flex justify-end gap-2 pt-0">
                        <Button variant="ghost" size="sm" className="h-8">
                          <Copy className="h-4 w-4 mr-2" />
                          Duplicate
                        </Button>
                        <Button variant="ghost" size="sm" className="h-8">
                          Edit
                        </Button>
                        <Button variant="ghost" size="sm" className="h-8 text-destructive hover:text-destructive">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
              </div>
            </TabsContent>
            <TabsContent value="inactive-rules" className="space-y-4 mt-4">
              <div className="space-y-2">
                {rules
                  .filter((rule) => !rule.enabled)
                  .map((rule) => (
                    <Card key={rule.id} className="opacity-70">
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-2">
                            <CardTitle className="text-base">{rule.name}</CardTitle>
                            <Badge variant="outline">Inactive</Badge>
                          </div>
                          <Switch checked={rule.enabled} onCheckedChange={() => toggleRuleStatus(rule.id)} />
                        </div>
                        <CardDescription>Triggered by: {rule.event}</CardDescription>
                      </CardHeader>
                      <CardContent className="pb-2">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div>
                            <h4 className="text-sm font-semibold mb-1">Conditions</h4>
                            <ul className="text-sm space-y-1">
                              {rule.conditions.map((condition, i) => (
                                <li key={i} className="flex items-start gap-2">
                                  <span className="text-muted-foreground">•</span>
                                  <span>{condition}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <h4 className="text-sm font-semibold mb-1">Actions</h4>
                            <ul className="text-sm space-y-1">
                              {rule.actions.map((action, i) => (
                                <li key={i} className="flex items-start gap-2">
                                  <span className="text-muted-foreground">•</span>
                                  <span>{action}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <h4 className="text-sm font-semibold mb-1">Schedule</h4>
                            <p className="text-sm">{rule.schedule}</p>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="flex justify-end gap-2 pt-0">
                        <Button variant="ghost" size="sm" className="h-8">
                          <Copy className="h-4 w-4 mr-2" />
                          Duplicate
                        </Button>
                        <Button variant="ghost" size="sm" className="h-8">
                          Edit
                        </Button>
                        <Button variant="ghost" size="sm" className="h-8 text-destructive hover:text-destructive">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Rule Builder</CardTitle>
          <CardDescription>Create or edit notification rules with the rule builder.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="rule-name">Rule Name</Label>
            <Input id="rule-name" placeholder="Enter rule name" defaultValue="New User Welcome" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="trigger-event">Trigger Event</Label>
            <Select defaultValue="user.created">
              <SelectTrigger id="trigger-event">
                <SelectValue placeholder="Select event" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="user.created">User Created</SelectItem>
                <SelectItem value="user.updated">User Updated</SelectItem>
                <SelectItem value="content.submitted">Content Submitted</SelectItem>
                <SelectItem value="content.approved">Content Approved</SelectItem>
                <SelectItem value="family.linked">Family Linked</SelectItem>
                <SelectItem value="verification.completed">Verification Completed</SelectItem>
                <SelectItem value="schedule.daily">Daily Schedule</SelectItem>
                <SelectItem value="schedule.weekly">Weekly Schedule</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Separator />

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label>Conditions</Label>
              <Button variant="outline" size="sm" className="h-8 flex items-center gap-2">
                <Plus className="h-3 w-3" />
                Add Condition
              </Button>
            </div>

            <div className="space-y-2">
              <Card className="border-dashed">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Select defaultValue="user.role">
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Select field" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="user.role">User Role</SelectItem>
                          <SelectItem value="user.verificationLevel">Verification Level</SelectItem>
                          <SelectItem value="user.registrationSource">Registration Source</SelectItem>
                          <SelectItem value="content.type">Content Type</SelectItem>
                        </SelectContent>
                      </Select>

                      <Select defaultValue="equals">
                        <SelectTrigger className="w-[120px]">
                          <SelectValue placeholder="Operator" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="equals">Equals</SelectItem>
                          <SelectItem value="not_equals">Not Equals</SelectItem>
                          <SelectItem value="contains">Contains</SelectItem>
                          <SelectItem value="greater_than">Greater Than</SelectItem>
                          <SelectItem value="less_than">Less Than</SelectItem>
                        </SelectContent>
                      </Select>

                      <Select defaultValue="member">
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Select value" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="member">Member</SelectItem>
                          <SelectItem value="contributor">Contributor</SelectItem>
                          <SelectItem value="editor">Editor</SelectItem>
                          <SelectItem value="admin">Admin</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <Button variant="ghost" size="sm" className="h-8 text-destructive hover:text-destructive">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-dashed">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Select defaultValue="user.registrationSource">
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Select field" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="user.role">User Role</SelectItem>
                          <SelectItem value="user.verificationLevel">Verification Level</SelectItem>
                          <SelectItem value="user.registrationSource">Registration Source</SelectItem>
                          <SelectItem value="content.type">Content Type</SelectItem>
                        </SelectContent>
                      </Select>

                      <Select defaultValue="equals">
                        <SelectTrigger className="w-[120px]">
                          <SelectValue placeholder="Operator" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="equals">Equals</SelectItem>
                          <SelectItem value="not_equals">Not Equals</SelectItem>
                          <SelectItem value="contains">Contains</SelectItem>
                          <SelectItem value="greater_than">Greater Than</SelectItem>
                          <SelectItem value="less_than">Less Than</SelectItem>
                        </SelectContent>
                      </Select>

                      <Select defaultValue="website">
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Select value" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="website">Website</SelectItem>
                          <SelectItem value="mobile_app">Mobile App</SelectItem>
                          <SelectItem value="api">API</SelectItem>
                          <SelectItem value="admin">Admin</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <Button variant="ghost" size="sm" className="h-8 text-destructive hover:text-destructive">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label>Actions</Label>
              <Button variant="outline" size="sm" className="h-8 flex items-center gap-2">
                <Plus className="h-3 w-3" />
                Add Action
              </Button>
            </div>

            <div className="space-y-2">
              <Card className="border-dashed">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Select defaultValue="email">
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Select action" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="email">Send Email</SelectItem>
                          <SelectItem value="notification">Create Notification</SelectItem>
                          <SelectItem value="webhook">Trigger Webhook</SelectItem>
                          <SelectItem value="sms">Send SMS</SelectItem>
                        </SelectContent>
                      </Select>

                      <Select defaultValue="welcome_email">
                        <SelectTrigger className="w-[220px]">
                          <SelectValue placeholder="Select template" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="welcome_email">Welcome Email</SelectItem>
                          <SelectItem value="verification_email">Verification Email</SelectItem>
                          <SelectItem value="password_reset">Password Reset</SelectItem>
                          <SelectItem value="custom_template">Custom Template</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <Button variant="ghost" size="sm" className="h-8 text-destructive hover:text-destructive">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-dashed">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Select defaultValue="notification">
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Select action" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="email">Send Email</SelectItem>
                          <SelectItem value="notification">Create Notification</SelectItem>
                          <SelectItem value="webhook">Trigger Webhook</SelectItem>
                          <SelectItem value="sms">Send SMS</SelectItem>
                        </SelectContent>
                      </Select>

                      <Input
                        className="w-[220px]"
                        defaultValue="Welcome to KimCompass!"
                        placeholder="Notification message"
                      />
                    </div>
                    <Button variant="ghost" size="sm" className="h-8 text-destructive hover:text-destructive">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <Separator />

          <div className="space-y-2">
            <Label>Schedule</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Select defaultValue="immediately">
                  <SelectTrigger>
                    <SelectValue placeholder="Select timing" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="immediately">Immediately</SelectItem>
                    <SelectItem value="delayed">Delayed</SelectItem>
                    <SelectItem value="scheduled">Scheduled</SelectItem>
                    <SelectItem value="recurring">Recurring</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Switch id="active-status" defaultChecked />
                  <Label htmlFor="active-status">Rule Active</Label>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end gap-2">
          <Button variant="outline">Cancel</Button>
          <Button>Save Rule</Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Event Types</CardTitle>
          <CardDescription>Configure which events can trigger notifications.</CardDescription>
        </CardHeader>
        <CardContent>
          <Accordion type="multiple" defaultValue={["user-events", "content-events"]}>
            <AccordionItem value="user-events">
              <AccordionTrigger className="hover:no-underline">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  <span>User Events</span>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-2 pl-6">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="event-user-created" defaultChecked />
                    <Label htmlFor="event-user-created">User Created</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="event-user-updated" defaultChecked />
                    <Label htmlFor="event-user-updated">User Updated</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="event-user-deleted" defaultChecked />
                    <Label htmlFor="event-user-deleted">User Deleted</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="event-user-login" defaultChecked />
                    <Label htmlFor="event-user-login">User Login</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="event-user-password-reset" defaultChecked />
                    <Label htmlFor="event-user-password-reset">Password Reset</Label>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="content-events">
              <AccordionTrigger className="hover:no-underline">
                <div className="flex items-center gap-2">
                  <Bell className="h-4 w-4" />
                  <span>Content Events</span>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-2 pl-6">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="event-content-created" defaultChecked />
                    <Label htmlFor="event-content-created">Content Created</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="event-content-updated" defaultChecked />
                    <Label htmlFor="event-content-updated">Content Updated</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="event-content-deleted" defaultChecked />
                    <Label htmlFor="event-content-deleted">Content Deleted</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="event-content-approved" defaultChecked />
                    <Label htmlFor="event-content-approved">Content Approved</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="event-content-rejected" defaultChecked />
                    <Label htmlFor="event-content-rejected">Content Rejected</Label>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="schedule-events">
              <AccordionTrigger className="hover:no-underline">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>Schedule Events</span>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-2 pl-6">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="event-schedule-daily" defaultChecked />
                    <Label htmlFor="event-schedule-daily">Daily Schedule</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="event-schedule-weekly" defaultChecked />
                    <Label htmlFor="event-schedule-weekly">Weekly Schedule</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="event-schedule-monthly" defaultChecked />
                    <Label htmlFor="event-schedule-monthly">Monthly Schedule</Label>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="event-events">
              <AccordionTrigger className="hover:no-underline">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>Event Management</span>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-2 pl-6">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="event-created" defaultChecked />
                    <Label htmlFor="event-created">Event Created</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="event-updated" defaultChecked />
                    <Label htmlFor="event-updated">Event Updated</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="event-cancelled" defaultChecked />
                    <Label htmlFor="event-cancelled">Event Cancelled</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="event-reminder" defaultChecked />
                    <Label htmlFor="event-reminder">Event Reminder</Label>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>
    </>
  )
}
