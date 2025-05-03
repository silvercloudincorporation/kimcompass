"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
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

export function EventsBreakdown() {
  // Mock data for events breakdown
  const eventTypeData = [
    { name: "Cultural Celebrations", value: 45, color: "#0A1931" },
    { name: "Family Reunions", value: 32, color: "#185ADB" },
    { name: "Educational Workshops", value: 28, color: "#A2DBFA" },
    { name: "Community Outreach", value: 22, color: "#FFC107" },
    { name: "Heritage Tours", value: 18, color: "#4CAF50" },
    { name: "Other", value: 12, color: "#9E9E9E" },
  ]

  const eventsByRegionData = [
    { region: "Nairobi", events: 38 },
    { region: "Mombasa", events: 25 },
    { region: "Kisumu", events: 22 },
    { region: "Nakuru", events: 18 },
    { region: "Eldoret", events: 15 },
    { region: "Nyeri", events: 12 },
    { region: "Kakamega", events: 10 },
    { region: "Garissa", events: 8 },
    { region: "Machakos", events: 7 },
    { region: "Kitale", events: 6 },
  ]

  const eventsByMonthData = [
    { month: "Jan", events: 12 },
    { month: "Feb", events: 10 },
    { month: "Mar", events: 14 },
    { month: "Apr", events: 16 },
    { month: "May", events: 18 },
    { month: "Jun", events: 22 },
    { month: "Jul", events: 20 },
    { month: "Aug", events: 24 },
    { month: "Sep", events: 18 },
    { month: "Oct", events: 15 },
    { month: "Nov", events: 12 },
    { month: "Dec", events: 20 },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Events Breakdown</CardTitle>
        <CardDescription>Analysis of events by type, region, and time</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="type" className="space-y-4">
          <TabsList className="grid grid-cols-3 h-9">
            <TabsTrigger value="type">By Type</TabsTrigger>
            <TabsTrigger value="region">By Region</TabsTrigger>
            <TabsTrigger value="month">By Month</TabsTrigger>
          </TabsList>

          <TabsContent value="type" className="space-y-4">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={eventTypeData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={120}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {eventTypeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value} events`, "Count"]} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-muted rounded-md p-3">
                <p className="text-sm text-muted-foreground">Total Events</p>
                <p className="text-2xl font-bold">157</p>
              </div>
              <div className="bg-muted rounded-md p-3">
                <p className="text-sm text-muted-foreground">Most Common</p>
                <p className="text-2xl font-bold">Cultural</p>
              </div>
              <div className="bg-muted rounded-md p-3">
                <p className="text-sm text-muted-foreground">Avg. Attendance</p>
                <p className="text-2xl font-bold">85</p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="region">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={eventsByRegionData}
                  layout="vertical"
                  margin={{ top: 5, right: 30, left: 80, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="region" type="category" scale="band" />
                  <Tooltip formatter={(value) => [`${value} events`, "Count"]} />
                  <Legend />
                  <Bar dataKey="events" name="Number of Events" fill="#185ADB" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>

          <TabsContent value="month">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={eventsByMonthData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`${value} events`, "Count"]} />
                  <Legend />
                  <Bar dataKey="events" name="Number of Events" fill="#0A1931" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
