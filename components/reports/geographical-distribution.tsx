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

interface GeographicalDistributionProps {
  compact?: boolean
}

export function GeographicalDistribution({ compact = false }: GeographicalDistributionProps) {
  // Mock data for geographical distribution
  const continentData = [
    { name: "Africa", value: 2800, color: "#0A1931" },
    { name: "Europe", value: 450, color: "#185ADB" },
    { name: "North America", value: 320, color: "#A2DBFA" },
    { name: "Asia", value: 120, color: "#FFC107" },
    { name: "Australia", value: 25, color: "#4CAF50" },
  ]

  const countryData = [
    { name: "Kenya", users: 1800 },
    { name: "Uganda", users: 450 },
    { name: "Tanzania", users: 380 },
    { name: "Ethiopia", users: 170 },
    { name: "Somalia", users: 120 },
    { name: "USA", users: 220 },
    { name: "UK", users: 180 },
    { name: "Canada", users: 100 },
    { name: "Germany", users: 90 },
    { name: "Australia", users: 25 },
  ]

  const regionData = [
    { name: "Nairobi", users: 850 },
    { name: "Mombasa", users: 420 },
    { name: "Kisumu", users: 320 },
    { name: "Nakuru", users: 210 },
    { name: "Eldoret", users: 180 },
    { name: "Kampala", users: 250 },
    { name: "Dar es Salaam", users: 220 },
    { name: "Arusha", users: 160 },
    { name: "Addis Ababa", users: 170 },
    { name: "Mogadishu", users: 120 },
  ]

  if (compact) {
    return (
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Geographical Distribution</CardTitle>
          <CardDescription>Users across 28 countries</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[120px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={continentData}
                  cx="50%"
                  cy="50%"
                  innerRadius={30}
                  outerRadius={50}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {continentData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`${value} users`, "Count"]} />
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
        <CardTitle>Geographical Distribution</CardTitle>
        <CardDescription>User distribution across continents, countries, and regions</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="continents" className="space-y-4">
          <TabsList className="grid grid-cols-3 h-9">
            <TabsTrigger value="continents">Continents</TabsTrigger>
            <TabsTrigger value="countries">Countries</TabsTrigger>
            <TabsTrigger value="regions">Regions</TabsTrigger>
          </TabsList>

          <TabsContent value="continents" className="space-y-4">
            <div className="h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={continentData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={120}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {continentData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value} users`, "Count"]} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>

          <TabsContent value="countries">
            <div className="h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={countryData} layout="vertical" margin={{ top: 5, right: 30, left: 60, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="name" type="category" scale="band" />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="users" name="Users" fill="#185ADB" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>

          <TabsContent value="regions">
            <div className="h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={regionData} layout="vertical" margin={{ top: 5, right: 30, left: 60, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="name" type="category" scale="band" />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="users" name="Users" fill="#0A1931" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
