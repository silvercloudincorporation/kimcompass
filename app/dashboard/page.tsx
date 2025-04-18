"use client"

import { useState } from "react"
import { Users, Calendar, Tent, Skull, CreditCard, PlusCircle, ChevronRight, CheckCircle, XCircle, GitBranch } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

export default function Dashboard() {
  const [stats] = useState([
    { title: "Total Families", value: "2,845", icon: Users, change: "+12.5%" },
    { title: "Total People", value: "14,392", icon: Users, change: "+8.2%" },
    { title: "Events Pending", value: "38", icon: Calendar, change: "-4.5%" },
    { title: "Clans Registered", value: "156", icon: Tent, change: "+5.3%" },
    { title: "Sub-Clans Registered", value: "245", icon: GitBranch, change: "+1.3%" },
    { title: "Death Updates", value: "24", icon: Skull, change: "+2.1%" },
  ])

  const [activities] = useState([
    {
      id: 1,
      action: "John Doe added to Ewe Clan",
      time: "2 minutes ago",
      status: "success",
      user: { name: "Admin User", avatar: "/placeholder-user.jpg" },
    },
    {
      id: 2,
      action: "Birth of Mercy Mensah registered",
      time: "1 hour ago",
      status: "success",
      user: { name: "Jane Smith", avatar: "/placeholder-user.jpg" },
    },
    {
      id: 3,
      action: "Payment of $25 received",
      time: "3 hours ago",
      status: "success",
      user: { name: "Admin User", avatar: "/placeholder-user.jpg" },
    },
    {
      id: 4,
      action: "Clan verification request rejected",
      time: "5 hours ago",
      status: "error",
      user: { name: "Admin User", avatar: "/placeholder-user.jpg" },
    },
    {
      id: 5,
      action: "New family story submitted",
      time: "1 day ago",
      status: "success",
      user: { name: "Mark Johnson", avatar: "/placeholder-user.jpg" },
    },
    {
      id: 6,
      action: "User account verified",
      time: "1 day ago",
      status: "success",
      user: { name: "Admin User", avatar: "/placeholder-user.jpg" },
    },
  ])

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-poppins font-medium text-[#0A1931]">Dashboard</h1>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="border-[#185ADB] text-[#185ADB] hover:bg-[#185ADB] hover:text-white">
            Export Report
          </Button>
          {/* <Button className="bg-[#0A1931] hover:bg-[#0A1931]/90">
            <PlusCircle className="mr-2 h-4 w-4" />
            New Action
          </Button> */}
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat, index) => (
          <Card key={index} className="overflow-hidden transition-all duration-200 hover:shadow-md">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className={cn("text-xs mt-1", stat.change.startsWith("+") ? "text-green-600" : "text-red-600")}>
                {stat.change} from last month
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="overflow-hidden transition-all duration-200 hover:shadow-md">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl font-poppins">Recent Activities</CardTitle>
            {/* <Button variant="ghost" className="text-[#185ADB]">
              View All
              <ChevronRight className="ml-1 h-4 w-4" />
            </Button> */}
          </div>
          <CardDescription>Recent actions taken in the system</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {activities.map((activity) => (
              <div
                key={activity.id}
                className="flex items-center justify-between p-3 rounded-lg transition-all duration-200 hover:bg-neutral-100"
              >
                <div className="flex items-center gap-3">
                  <Avatar className="h-9 w-9">
                    <AvatarImage src={activity.user.avatar || "/placeholder.svg"} alt={activity.user.name} />
                    <AvatarFallback>{activity.user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{activity.action}</p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
                <Badge
                  variant="outline"
                  className={cn(
                    "flex items-center gap-1",
                    activity.status === "success" ? "border-green-500 text-green-600" : "border-red-500 text-red-600",
                  )}
                >
                  {activity.status === "success" ? (
                    <CheckCircle className="h-3 w-3" />
                  ) : (
                    <XCircle className="h-3 w-3" />
                  )}
                  {activity.status === "success" ? "Completed" : "Failed"}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="col-span-3 overflow-hidden transition-all duration-200 hover:shadow-md">
          <CardHeader>
            <CardTitle className="text-xl font-poppins">Quick Actions</CardTitle>
            <CardDescription>Frequently used actions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-3">
              <Button className="bg-[#0A1931] hover:bg-[#0A1931]/90">
                <PlusCircle className="mr-2 h-4 w-4" />
                Add Family
              </Button>
              <Button className="bg-[#0A1931] hover:bg-[#0A1931]/90">
                <PlusCircle className="mr-2 h-4 w-4" />
                Add Person
              </Button>
              <Button className="bg-[#0A1931] hover:bg-[#0A1931]/90">
                <PlusCircle className="mr-2 h-4 w-4" />
                Add Event
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
