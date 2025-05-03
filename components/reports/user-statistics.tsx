"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

interface UserStatisticsProps {
  compact?: boolean
}

export function UserStatistics({ compact = false }: UserStatisticsProps) {
  // Mock data for user statistics
  const userGrowthData = [
    { month: "Jan", users: 400 },
    { month: "Feb", users: 600 },
    { month: "Mar", users: 800 },
    { month: "Apr", users: 1200 },
    { month: "May", users: 1600 },
    { month: "Jun", users: 1900 },
    { month: "Jul", users: 2200 },
    { month: "Aug", users: 2500 },
    { month: "Sep", users: 2800 },
    { month: "Oct", users: 3100 },
    { month: "Nov", users: 3400 },
    { month: "Dec", users: 3800 },
  ]

  const userTypeData = [
    { name: "Admin", value: 15, color: "#0A1931" },
    { name: "Member", value: 2500, color: "#185ADB" },
    { name: "Guest", value: 1200, color: "#A2DBFA" },
  ]

  const userActivityData = [
    { name: "Active", value: 2800, color: "#4CAF50" },
    { name: "Inactive", value: 700, color: "#FFC107" },
    { name: "Suspended", value: 215, color: "#F44336" },
  ]

  const userRegistrationData = [
    { month: "Jan", newUsers: 120, returningUsers: 280 },
    { month: "Feb", newUsers: 150, returningUsers: 450 },
    { month: "Mar", newUsers: 180, returningUsers: 620 },
    { month: "Apr", newUsers: 250, returningUsers: 950 },
    { month: "May", newUsers: 300, returningUsers: 1300 },
    { month: "Jun", newUsers: 220, returningUsers: 1680 },
    { month: "Jul", newUsers: 280, returningUsers: 1920 },
    { month: "Aug", newUsers: 250, returningUsers: 2250 },
    { month: "Sep", newUsers: 200, returningUsers: 2600 },
    { month: "Oct", newUsers: 300, returningUsers: 2800 },
    { month: "Nov", newUsers: 400, returningUsers: 3000 },
    { month: "Dec", newUsers: 380, returningUsers: 3420 },
  ]

  if (compact) {
    return (
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">User Statistics</CardTitle>
          <CardDescription>Total users: 3,715</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[120px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={userGrowthData} margin={{ top: 5, right: 5, left: 0, bottom: 5 }}>
                <defs>
                  <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#185ADB" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#185ADB" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" tick={{ fontSize: 10 }} tickLine={false} axisLine={false} />
                <YAxis
                  tick={{ fontSize: 10 }}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => `${value}`}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "white",
                    border: "1px solid #f0f0f0",
                    borderRadius: "6px",
                    fontSize: "12px",
                  }}
                  formatter={(value) => [`${value} users`, "Total"]}
                />
                <Area type="monotone" dataKey="users" stroke="#185ADB" fillOpacity={1} fill="url(#colorUsers)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="col-span-1">
      <CardHeader>
        <CardTitle>User Statistics</CardTitle>
        <CardDescription>Detailed analysis of user growth and demographics</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="growth" className="space-y-4">
          <TabsList className="grid grid-cols-4 h-9">
            <TabsTrigger value="growth">Growth</TabsTrigger>
            <TabsTrigger value="types">User Types</TabsTrigger>
            <TabsTrigger value="status">Status</TabsTrigger>
            <TabsTrigger value="registration">Registration</TabsTrigger>
          </TabsList>

          <TabsContent value="growth" className="space-y-4">
            <div className="h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={userGrowthData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#185ADB" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#185ADB" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <CartesianGrid strokeDasharray="3 3" />
                  <Tooltip />
                  <Area type="monotone" dataKey="users" stroke="#185ADB" fillOpacity={1} fill="url(#colorUsers)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-muted rounded-md p-3">
                <p className="text-sm text-muted-foreground">Total Users</p>
                <p className="text-2xl font-bold">3,715</p>
              </div>
              <div className="bg-muted rounded-md p-3">
                <p className="text-sm text-muted-foreground">Growth Rate</p>
                <p className="text-2xl font-bold">+12.4%</p>
              </div>
              <div className="bg-muted rounded-md p-3">
                <p className="text-sm text-muted-foreground">New This Month</p>
                <p className="text-2xl font-bold">380</p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="types">
            <div className="h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={userTypeData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={120}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {userTypeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value} users`, "Count"]} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>

          <TabsContent value="status">
            <div className="h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={userActivityData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={120}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {userActivityData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value} users`, "Count"]} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>

          <TabsContent value="registration">
            <div className="h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={userRegistrationData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="newUsers" name="New Users" fill="#185ADB" />
                  <Bar dataKey="returningUsers" name="Returning Users" fill="#A2DBFA" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
