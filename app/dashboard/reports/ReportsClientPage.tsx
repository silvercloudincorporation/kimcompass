"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ReportFilters } from "@/components/reports/report-filters"
import { UserStatistics } from "@/components/reports/user-statistics"
import { ContentMetrics } from "@/components/reports/content-metrics"
import { GeographicalDistribution } from "@/components/reports/geographical-distribution"
import { ActivityTrends } from "@/components/reports/activity-trends"
import { FamilyHistorySubmissions } from "@/components/reports/family-history-submissions"
import { Button } from "@/components/ui/button"
import { Download, FileText, Users, Map, Activity, BookOpen } from "lucide-react"
import { DateRangePicker } from "@/components/reports/date-range-picker"
import { BirthsByMonth } from "@/components/reports/births-by-month"
import { ClanSpreadByRegion } from "@/components/reports/clan-spread-by-region"
import { EventsBreakdown } from "@/components/reports/events-breakdown"

export default function ReportsClientPage() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Reports & Analytics</h1>
          <p className="text-muted-foreground">View and analyze data across the KimCompass platform</p>
        </div>
        <div className="flex items-center gap-2 self-end sm:self-auto">
          <DateRangePicker />
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid grid-cols-2 md:grid-cols-6 w-full md:w-auto">
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            <span className="hidden md:inline">Overview</span>
          </TabsTrigger>
          <TabsTrigger value="users" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            <span className="hidden md:inline">Users</span>
          </TabsTrigger>
          <TabsTrigger value="geography" className="flex items-center gap-2">
            <Map className="h-4 w-4" />
            <span className="hidden md:inline">Geography</span>
          </TabsTrigger>
          <TabsTrigger value="activity" className="flex items-center gap-2">
            <Activity className="h-4 w-4" />
            <span className="hidden md:inline">Activity</span>
          </TabsTrigger>
          <TabsTrigger value="content" className="flex items-center gap-2">
            <BookOpen className="h-4 w-4" />
            <span className="hidden md:inline">Content</span>
          </TabsTrigger>
          <TabsTrigger value="demographics" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            <span className="hidden md:inline">Demographics</span>
          </TabsTrigger>
        </TabsList>

        <ReportFilters activeTab={activeTab} />

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <UserStatistics compact />
            <ContentMetrics compact />
            <GeographicalDistribution compact />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ActivityTrends />
            <FamilyHistorySubmissions />
          </div>
        </TabsContent>

        <TabsContent value="users" className="space-y-6">
          <UserStatistics />
        </TabsContent>

        <TabsContent value="geography" className="space-y-6">
          <GeographicalDistribution />
        </TabsContent>

        <TabsContent value="activity" className="space-y-6">
          <ActivityTrends />
        </TabsContent>

        <TabsContent value="content" className="space-y-6">
          <ContentMetrics />
          <FamilyHistorySubmissions />
        </TabsContent>

        <TabsContent value="demographics" className="space-y-6">
          <BirthsByMonth />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ClanSpreadByRegion />
            <EventsBreakdown />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
