"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Bar, BarChart, CartesianGrid, Cell, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

export function ClanSpreadByRegion() {
  // Mock data for clan spread by region
  const stackedBarData = [
    {
      region: "Nairobi",
      kimani: 350,
      wanjiku: 280,
      ochieng: 220,
      mutua: 180,
      auma: 150,
    },
    {
      region: "Mombasa",
      kimani: 180,
      wanjiku: 150,
      ochieng: 200,
      mutua: 120,
      auma: 90,
    },
    {
      region: "Kisumu",
      kimani: 120,
      wanjiku: 100,
      ochieng: 250,
      mutua: 80,
      auma: 70,
    },
    {
      region: "Nakuru",
      kimani: 200,
      wanjiku: 180,
      ochieng: 120,
      mutua: 150,
      auma: 100,
    },
    {
      region: "Eldoret",
      kimani: 150,
      wanjiku: 130,
      ochieng: 100,
      mutua: 170,
      auma: 80,
    },
  ]

  const percentageData = [
    {
      region: "Nairobi",
      kimani: 30,
      wanjiku: 24,
      ochieng: 19,
      mutua: 15,
      auma: 12,
    },
    {
      region: "Mombasa",
      kimani: 24,
      wanjiku: 20,
      ochieng: 27,
      mutua: 16,
      auma: 13,
    },
    {
      region: "Kisumu",
      kimani: 19,
      wanjiku: 16,
      ochieng: 40,
      mutua: 13,
      auma: 12,
    },
    {
      region: "Nakuru",
      kimani: 27,
      wanjiku: 24,
      ochieng: 16,
      mutua: 20,
      auma: 13,
    },
    {
      region: "Eldoret",
      kimani: 24,
      wanjiku: 21,
      ochieng: 16,
      mutua: 27,
      auma: 12,
    },
  ]

  const dominantClanData = [
    { region: "Nairobi", value: 350, clan: "Kimani", color: "#0A1931" },
    { region: "Mombasa", value: 200, clan: "Ochieng", color: "#185ADB" },
    { region: "Kisumu", value: 250, clan: "Ochieng", color: "#185ADB" },
    { region: "Nakuru", value: 200, clan: "Kimani", color: "#0A1931" },
    { region: "Eldoret", value: 170, clan: "Mutua", color: "#A2DBFA" },
    { region: "Nyeri", value: 180, clan: "Wanjiku", color: "#FFC107" },
    { region: "Kakamega", value: 160, clan: "Ochieng", color: "#185ADB" },
    { region: "Garissa", value: 120, clan: "Auma", color: "#4CAF50" },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Clan Spread by Region</CardTitle>
        <CardDescription>Distribution of clans across different regions</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="absolute" className="space-y-4">
          <TabsList className="grid grid-cols-3 h-9">
            <TabsTrigger value="absolute">Absolute Numbers</TabsTrigger>
            <TabsTrigger value="percentage">Percentage</TabsTrigger>
            <TabsTrigger value="dominant">Dominant Clans</TabsTrigger>
          </TabsList>

          <TabsContent value="absolute" className="space-y-4">
            <div className="h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={stackedBarData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="region" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="kimani" name="Kimani Clan" stackId="a" fill="#0A1931" />
                  <Bar dataKey="wanjiku" name="Wanjiku Clan" stackId="a" fill="#FFC107" />
                  <Bar dataKey="ochieng" name="Ochieng Clan" stackId="a" fill="#185ADB" />
                  <Bar dataKey="mutua" name="Mutua Clan" stackId="a" fill="#A2DBFA" />
                  <Bar dataKey="auma" name="Auma Clan" stackId="a" fill="#4CAF50" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>

          <TabsContent value="percentage">
            <div className="h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={percentageData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="region" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`${value}%`, "Percentage"]} />
                  <Legend />
                  <Bar dataKey="kimani" name="Kimani Clan" stackId="a" fill="#0A1931" />
                  <Bar dataKey="wanjiku" name="Wanjiku Clan" stackId="a" fill="#FFC107" />
                  <Bar dataKey="ochieng" name="Ochieng Clan" stackId="a" fill="#185ADB" />
                  <Bar dataKey="mutua" name="Mutua Clan" stackId="a" fill="#A2DBFA" />
                  <Bar dataKey="auma" name="Auma Clan" stackId="a" fill="#4CAF50" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>

          <TabsContent value="dominant">
            <div className="h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={dominantClanData} layout="vertical" margin={{ top: 5, right: 30, left: 60, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="region" type="category" scale="band" />
                  <Tooltip
                    formatter={(value, name, props) => [
                      `${value} members (${props.payload.clan} Clan)`,
                      "Dominant Clan",
                    ]}
                  />
                  <Legend />
                  <Bar dataKey="value" name="Population">
                    {dominantClanData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
