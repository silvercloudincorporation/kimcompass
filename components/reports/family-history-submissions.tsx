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

export function FamilyHistorySubmissions() {
  // Mock data for family history submissions
  const submissionTrendData = [
    { month: "Jan", submissions: 12 },
    { month: "Feb", submissions: 15 },
    { month: "Mar", submissions: 18 },
    { month: "Apr", submissions: 25 },
    { month: "May", submissions: 30 },
    { month: "Jun", submissions: 22 },
    { month: "Jul", submissions: 28 },
    { month: "Aug", submissions: 25 },
    { month: "Sep", submissions: 20 },
    { month: "Oct", submissions: 30 },
    { month: "Nov", submissions: 40 },
    { month: "Dec", submissions: 38 },
  ]

  const submissionStatusData = [
    { name: "Published", value: 180, color: "#4CAF50" },
    { name: "Draft", value: 35, color: "#FFC107" },
    { name: "Pending Review", value: 22, color: "#2196F3" },
    { name: "Rejected", value: 8, color: "#F44336" },
  ]

  const popularHistoriesData = [
    { name: "Kimani Family Legacy", views: 1250 },
    { name: "Wanjiku Clan Origins", views: 980 },
    { name: "Ochieng Family Journey", views: 850 },
    { name: "Mutua Generations", views: 720 },
    { name: "Auma Family Chronicles", views: 680 },
    { name: "Njoroge Heritage", views: 650 },
    { name: "Otieno Family Tree", views: 620 },
    { name: "Wambui Legacy", views: 580 },
    { name: "Kamau Family History", views: 550 },
    { name: "Adhiambo Ancestry", views: 520 },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Family History Submissions</CardTitle>
        <CardDescription>Analysis of family history submissions and engagement</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="trends" className="space-y-4">
          <TabsList className="grid grid-cols-3 h-9">
            <TabsTrigger value="trends">Submission Trends</TabsTrigger>
            <TabsTrigger value="status">Status</TabsTrigger>
            <TabsTrigger value="popular">Popular Histories</TabsTrigger>
          </TabsList>

          <TabsContent value="trends" className="space-y-4">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={submissionTrendData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorSubmissions" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#0A1931" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#0A1931" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <CartesianGrid strokeDasharray="3 3" />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="submissions"
                    stroke="#0A1931"
                    fillOpacity={1}
                    fill="url(#colorSubmissions)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>

          <TabsContent value="status">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={submissionStatusData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={120}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {submissionStatusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value} submissions`, "Count"]} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>

          <TabsContent value="popular">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={popularHistoriesData}
                  layout="vertical"
                  margin={{ top: 5, right: 30, left: 100, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="name" type="category" scale="band" tick={{ fontSize: 12 }} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="views" name="Views" fill="#185ADB" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
