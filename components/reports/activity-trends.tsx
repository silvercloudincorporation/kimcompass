"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

export function ActivityTrends() {
  // Mock data for activity trends
  const loginActivityData = [
    { date: "01/12", logins: 120 },
    { date: "02/12", logins: 140 },
    { date: "03/12", logins: 135 },
    { date: "04/12", logins: 180 },
    { date: "05/12", logins: 190 },
    { date: "06/12", logins: 170 },
    { date: "07/12", logins: 160 },
    { date: "08/12", logins: 200 },
    { date: "09/12", logins: 220 },
    { date: "10/12", logins: 240 },
    { date: "11/12", logins: 280 },
    { date: "12/12", logins: 260 },
    { date: "13/12", logins: 250 },
    { date: "14/12", logins: 270 },
  ]

  const contentActivityData = [
    { date: "01/12", views: 520, likes: 120, comments: 45 },
    { date: "02/12", views: 540, likes: 140, comments: 55 },
    { date: "03/12", views: 535, likes: 135, comments: 50 },
    { date: "04/12", views: 580, likes: 180, comments: 70 },
    { date: "05/12", views: 590, likes: 190, comments: 75 },
    { date: "06/12", views: 570, likes: 170, comments: 65 },
    { date: "07/12", views: 560, likes: 160, comments: 60 },
    { date: "08/12", views: 600, likes: 200, comments: 80 },
    { date: "09/12", views: 620, likes: 220, comments: 85 },
    { date: "10/12", views: 640, likes: 240, comments: 90 },
    { date: "11/12", views: 680, likes: 280, comments: 100 },
    { date: "12/12", views: 660, likes: 260, comments: 95 },
    { date: "13/12", views: 650, likes: 250, comments: 90 },
    { date: "14/12", views: 670, likes: 270, comments: 95 },
  ]

  const hourlyActivityData = [
    { hour: "00:00", activity: 20 },
    { hour: "02:00", activity: 10 },
    { hour: "04:00", activity: 5 },
    { hour: "06:00", activity: 15 },
    { hour: "08:00", activity: 60 },
    { hour: "10:00", activity: 120 },
    { hour: "12:00", activity: 150 },
    { hour: "14:00", activity: 180 },
    { hour: "16:00", activity: 190 },
    { hour: "18:00", activity: 170 },
    { hour: "20:00", activity: 110 },
    { hour: "22:00", activity: 70 },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Activity Trends</CardTitle>
        <CardDescription>User activity patterns over time</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="logins" className="space-y-4">
          <TabsList className="grid grid-cols-3 h-9">
            <TabsTrigger value="logins">Logins</TabsTrigger>
            <TabsTrigger value="content">Content Engagement</TabsTrigger>
            <TabsTrigger value="hourly">Hourly Activity</TabsTrigger>
          </TabsList>

          <TabsContent value="logins" className="space-y-4">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={loginActivityData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorLogins" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#185ADB" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#185ADB" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="date" />
                  <YAxis />
                  <CartesianGrid strokeDasharray="3 3" />
                  <Tooltip />
                  <Area type="monotone" dataKey="logins" stroke="#185ADB" fillOpacity={1} fill="url(#colorLogins)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>

          <TabsContent value="content">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={contentActivityData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="views" stroke="#0A1931" activeDot={{ r: 8 }} />
                  <Line type="monotone" dataKey="likes" stroke="#185ADB" />
                  <Line type="monotone" dataKey="comments" stroke="#A2DBFA" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>

          <TabsContent value="hourly">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={hourlyActivityData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="hour" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="activity" name="User Activity" fill="#185ADB" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
