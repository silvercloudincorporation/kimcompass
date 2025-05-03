"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
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

export function BirthsByMonth() {
  // Mock data for births by month
  const currentYearData = [
    { month: "Jan", births: 42 },
    { month: "Feb", births: 38 },
    { month: "Mar", births: 45 },
    { month: "Apr", births: 53 },
    { month: "May", births: 58 },
    { month: "Jun", births: 62 },
    { month: "Jul", births: 68 },
    { month: "Aug", births: 72 },
    { month: "Sep", births: 65 },
    { month: "Oct", births: 60 },
    { month: "Nov", births: 55 },
    { month: "Dec", births: 50 },
  ]

  const comparisonData = [
    { month: "Jan", current: 42, previous: 38, average: 40 },
    { month: "Feb", current: 38, previous: 35, average: 37 },
    { month: "Mar", current: 45, previous: 40, average: 42 },
    { month: "Apr", current: 53, previous: 48, average: 50 },
    { month: "May", current: 58, previous: 52, average: 55 },
    { month: "Jun", current: 62, previous: 58, average: 60 },
    { month: "Jul", current: 68, previous: 63, average: 65 },
    { month: "Aug", current: 72, previous: 68, average: 70 },
    { month: "Sep", current: 65, previous: 60, average: 62 },
    { month: "Oct", current: 60, previous: 55, average: 57 },
    { month: "Nov", current: 55, previous: 50, average: 52 },
    { month: "Dec", current: 50, previous: 45, average: 48 },
  ]

  const genderData = [
    { month: "Jan", male: 22, female: 20 },
    { month: "Feb", male: 20, female: 18 },
    { month: "Mar", male: 23, female: 22 },
    { month: "Apr", male: 27, female: 26 },
    { month: "May", male: 30, female: 28 },
    { month: "Jun", male: 32, female: 30 },
    { month: "Jul", male: 35, female: 33 },
    { month: "Aug", male: 37, female: 35 },
    { month: "Sep", male: 33, female: 32 },
    { month: "Oct", male: 31, female: 29 },
    { month: "Nov", male: 28, female: 27 },
    { month: "Dec", male: 26, female: 24 },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Births by Month</CardTitle>
        <CardDescription>Monthly birth records and trends</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="current" className="space-y-4">
          <TabsList className="grid grid-cols-3 h-9">
            <TabsTrigger value="current">Current Year</TabsTrigger>
            <TabsTrigger value="comparison">Year Comparison</TabsTrigger>
            <TabsTrigger value="gender">Gender Distribution</TabsTrigger>
          </TabsList>

          <TabsContent value="current" className="space-y-4">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={currentYearData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`${value} births`, "Total"]} />
                  <Legend />
                  <Bar dataKey="births" name="Births" fill="#4CAF50" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-muted rounded-md p-3">
                <p className="text-sm text-muted-foreground">Total Births</p>
                <p className="text-2xl font-bold">668</p>
              </div>
              <div className="bg-muted rounded-md p-3">
                <p className="text-sm text-muted-foreground">Monthly Average</p>
                <p className="text-2xl font-bold">55.7</p>
              </div>
              <div className="bg-muted rounded-md p-3">
                <p className="text-sm text-muted-foreground">Peak Month</p>
                <p className="text-2xl font-bold">August</p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="comparison">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={comparisonData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="current" name="Current Year" stroke="#4CAF50" activeDot={{ r: 8 }} />
                  <Line type="monotone" dataKey="previous" name="Previous Year" stroke="#2196F3" />
                  <Line
                    type="monotone"
                    dataKey="average"
                    name="5-Year Average"
                    stroke="#FFC107"
                    strokeDasharray="5 5"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>

          <TabsContent value="gender">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={genderData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="male" name="Male" stackId="a" fill="#185ADB" />
                  <Bar dataKey="female" name="Female" stackId="a" fill="#A2DBFA" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
