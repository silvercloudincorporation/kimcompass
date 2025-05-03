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

interface ContentMetricsProps {
  compact?: boolean
}

export function ContentMetrics({ compact = false }: ContentMetricsProps) {
  // Mock data for content metrics
  const contentTypeData = [
    { name: "Family Histories", value: 245, color: "#0A1931" },
    { name: "Events", value: 178, color: "#185ADB" },
    { name: "Communities", value: 86, color: "#A2DBFA" },
  ]

  const contentStatusData = [
    { name: "Published", value: 380, color: "#4CAF50" },
    { name: "Draft", value: 65, color: "#FFC107" },
    { name: "Pending Review", value: 42, color: "#2196F3" },
    { name: "Rejected", value: 22, color: "#F44336" },
  ]

  const contentCreationData = [
    { month: "Jan", histories: 12, events: 8, communities: 4 },
    { month: "Feb", histories: 15, events: 10, communities: 5 },
    { month: "Mar", histories: 18, events: 12, communities: 6 },
    { month: "Apr", histories: 25, events: 15, communities: 8 },
    { month: "May", histories: 30, events: 18, communities: 10 },
    { month: "Jun", histories: 22, events: 16, communities: 7 },
    { month: "Jul", histories: 28, events: 20, communities: 9 },
    { month: "Aug", histories: 25, events: 18, communities: 8 },
    { month: "Sep", histories: 20, events: 15, communities: 6 },
    { month: "Oct", histories: 30, events: 22, communities: 10 },
    { month: "Nov", histories: 40, events: 24, communities: 13 },
    { month: "Dec", histories: 38, events: 22, communities: 12 },
  ]

  if (compact) {
    return (
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Content Metrics</CardTitle>
          <CardDescription>Total content: 509 items</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[120px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={contentTypeData}
                  cx="50%"
                  cy="50%"
                  innerRadius={30}
                  outerRadius={50}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {contentTypeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`${value} items`, "Count"]} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="col-span-1">
      <CardHeader>
        <CardTitle>Content Metrics</CardTitle>
        <CardDescription>Analysis of content creation and distribution</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="types" className="space-y-4">
          <TabsList className="grid grid-cols-3 h-9">
            <TabsTrigger value="types">Content Types</TabsTrigger>
            <TabsTrigger value="status">Status</TabsTrigger>
            <TabsTrigger value="creation">Creation</TabsTrigger>
          </TabsList>

          <TabsContent value="types" className="space-y-4">
            <div className="h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={contentTypeData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={120}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {contentTypeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value} items`, "Count"]} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-muted rounded-md p-3">
                <p className="text-sm text-muted-foreground">Family Histories</p>
                <p className="text-2xl font-bold">245</p>
              </div>
              <div className="bg-muted rounded-md p-3">
                <p className="text-sm text-muted-foreground">Events</p>
                <p className="text-2xl font-bold">178</p>
              </div>
              <div className="bg-muted rounded-md p-3">
                <p className="text-sm text-muted-foreground">Communities</p>
                <p className="text-2xl font-bold">86</p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="status">
            <div className="h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={contentStatusData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={120}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {contentStatusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value} items`, "Count"]} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>

          <TabsContent value="creation">
            <div className="h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={contentCreationData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="histories" name="Family Histories" fill="#0A1931" />
                  <Bar dataKey="events" name="Events" fill="#185ADB" />
                  <Bar dataKey="communities" name="Communities" fill="#A2DBFA" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
