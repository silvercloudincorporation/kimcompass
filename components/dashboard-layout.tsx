"use client"

import type React from "react"

import { useState } from "react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from "@/components/ui/sidebar"
import { Header } from "@/components/header"
import {
  BarChart3,
  Users,
  Shield,
  Map,
  Globe,
  MapPin,
  Tent,
  Users2,
  Baby,
  Skull,
  Link,
  Eye,
  PlusCircle,
  CheckCircle,
  CreditCard,
  BookOpen,
  BadgeCheck,
  FileBarChart,
  Settings,
  ChevronDown,
  LogOut,
  GitBranch,
  Home,
  Building2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { usePathname, useRouter } from "next/navigation"
import { Toaster } from "@/components/ui/toaster"

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()

  const [openGroups, setOpenGroups] = useState({
    management: true,
    landmarks: true,
    people: true,
    events: true,
  })

  const toggleGroup = (group: string) => {
    setOpenGroups((prev: any) => ({
      ...prev,
      [group]: !prev[group],
    }))
  }

  const navigateTo = (path: string) => {
    router.push(path)
  }

  const isActive = (path: string) => {
    return pathname === path
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen flex-1">
        <Sidebar className="border-r border-neutral-200">
          <SidebarHeader className="border-b border-neutral-200 py-5">
            <div className="flex items-center px-4">
              <div className="h-8 w-8 rounded-md bg-[#0A1931] flex items-center justify-center mr-2">
                <span className="text-white font-poppins font-bold text-lg">K</span>
              </div>
              <h1 className="font-poppins font-medium text-xl">KimCompass</h1>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    className="font-medium"
                    tooltip="Dashboard"
                    isActive={isActive("/dashboard")}
                    onClick={() => navigateTo("/dashboard")}
                  >
                    <BarChart3 className="h-5 w-5 text-[#0A1931]" />
                    <span>Dashboard</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroup>

            {/* Management Section */}
            <Collapsible
              open={openGroups.management}
              onOpenChange={() => toggleGroup("management")}
              className="group/collapsible"
            >
              <SidebarGroup>
                <SidebarGroupLabel asChild>
                  <CollapsibleTrigger className="w-full flex items-center">
                    Management
                    <ChevronDown className="ml-auto h-4 w-4 transition-transform group-data-[state=open]/collapsible:rotate-180" />
                  </CollapsibleTrigger>
                </SidebarGroupLabel>
                <CollapsibleContent>
                  <SidebarGroupContent>
                    <SidebarMenu>
                      <SidebarMenuItem>
                        <SidebarMenuButton tooltip="Admin Users" isActive={isActive("/dashboard/admin-users")} onClick={() => navigateTo("/dashboard/admin-users")}>
                          <Users className="h-4 w-4" />
                          <span>Admin Users</span>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                      <SidebarMenuItem>
                        <SidebarMenuButton tooltip="User Roles" isActive={isActive("/dashboard/user-roles")} onClick={() => navigateTo("/dashboard/user-roles")}>
                          <Shield className="h-4 w-4" />
                          <span>User Roles</span>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    </SidebarMenu>
                  </SidebarGroupContent>
                </CollapsibleContent>
              </SidebarGroup>
            </Collapsible>

            {/* Landmarks Section */}
            <Collapsible
              open={openGroups.landmarks}
              onOpenChange={() => toggleGroup("landmarks")}
              className="group/collapsible"
            >
              <SidebarGroup>
                <SidebarGroupLabel asChild>
                  <CollapsibleTrigger className="w-full flex items-center">
                    Landmarks
                    <ChevronDown className="ml-auto h-4 w-4 transition-transform group-data-[state=open]/collapsible:rotate-180" />
                  </CollapsibleTrigger>
                </SidebarGroupLabel>
                <CollapsibleContent>
                  <SidebarGroupContent>
                    <SidebarMenu>
                      <SidebarMenuItem>
                        <SidebarMenuButton tooltip="Continents" isActive={isActive("/dashboard/continents")} onClick={() => navigateTo("/dashboard/continents")}>
                          <Globe className="h-4 w-4" />
                          <span>Continents</span>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                      <SidebarMenuItem>
                        <SidebarMenuButton tooltip="Countries" isActive={isActive("/dashboard/countries")} onClick={() => navigateTo("/dashboard/countries")}>
                          <Map className="h-4 w-4" />
                          <span>Countries</span>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                      <SidebarMenuItem>
                        <SidebarMenuButton tooltip="Regions" isActive={isActive("/dashboard/regions")} onClick={() => navigateTo("/dashboard/regions")}>
                          <MapPin className="h-4 w-4" />
                          <span>Regions</span>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                      <SidebarMenuItem>
                        <SidebarMenuButton tooltip="Regions" isActive={isActive("/dashboard/communities")} onClick={() => navigateTo("/dashboard/communities")}>
                          <Building2 className="h-4 w-4" />
                          <span>Communities</span>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                      <SidebarMenuItem>
                        <SidebarMenuButton tooltip="Regions" isActive={isActive("/dashboard/areas")} onClick={() => navigateTo("/dashboard/areas")}>
                          <MapPin className="h-4 w-4" />
                          <span>Areas</span>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    </SidebarMenu>
                  </SidebarGroupContent>
                </CollapsibleContent>
              </SidebarGroup>
            </Collapsible>

            {/* Tribes & Clans Section */}
            <Collapsible
              open={openGroups.management}
              onOpenChange={() => toggleGroup("management")}
              className="group/collapsible"
            >
              <SidebarGroup>
                <SidebarGroupLabel asChild>
                  <CollapsibleTrigger className="w-full flex items-center">
                     Tribes & Clans
                    <ChevronDown className="ml-auto h-4 w-4 transition-transform group-data-[state=open]/collapsible:rotate-180" />
                  </CollapsibleTrigger>
                </SidebarGroupLabel>
                <CollapsibleContent>
                  <SidebarGroupContent>
                    <SidebarMenu>
                      <SidebarMenuItem>
                        <SidebarMenuButton
                          tooltip="Ethnic Groups"
                          isActive={isActive("/dashboard/ethnic-groups")}
                          onClick={() => navigateTo("/dashboard/ethnic-groups")}
                        >
                          <Users2 className="h-4 w-4" />
                          <span>Ethnic Groups</span>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                      <SidebarMenuItem>
                        <SidebarMenuButton
                          tooltip="Main Clans"
                          isActive={isActive("/dashboard/main-clans")}
                          onClick={() => navigateTo("/dashboard/main-clans")}
                        >
                          <Tent className="h-4 w-4" />
                          <span>Main Clans</span>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                      <SidebarMenuItem>
                        <SidebarMenuButton
                          tooltip="Sub-Clans"
                          isActive={isActive("/dashboard/sub-clans")}
                          onClick={() => navigateTo("/dashboard/sub-clans")}
                        >
                          <GitBranch className="h-4 w-4" />
                          <span>Sub-Clans</span>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    </SidebarMenu>
                  </SidebarGroupContent>
                </CollapsibleContent>
              </SidebarGroup>
            </Collapsible>

            {/* People Section */}
            <Collapsible
              open={openGroups.people}
              onOpenChange={() => toggleGroup("people")}
              className="group/collapsible"
            >
              <SidebarGroup>
                <SidebarGroupLabel asChild>
                  <CollapsibleTrigger className="w-full flex items-center">
                    People
                    <ChevronDown className="ml-auto h-4 w-4 transition-transform group-data-[state=open]/collapsible:rotate-180" />
                  </CollapsibleTrigger>
                </SidebarGroupLabel>
                <CollapsibleContent>
                  <SidebarGroupContent>
                    <SidebarMenu>
                      <SidebarMenuItem>
                        <SidebarMenuButton
                          tooltip="Families"
                          isActive={isActive("/dashboard/people/families")}
                          onClick={() => navigateTo("/dashboard/people/families")}
                        >
                          <Home className="h-4 w-4" />
                          <span>Families</span>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                      <SidebarMenuItem>
                        <SidebarMenuButton tooltip="Accounts" isActive={isActive("/dashboard/people/accounts")} onClick={() => navigateTo("/dashboard/people/accounts")}>
                          <Users className="h-4 w-4" />
                          <span>Accounts</span>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                      <SidebarMenuItem>
                        <SidebarMenuButton tooltip="Linkages" isActive={isActive("/dashboard/people/linkages")} onClick={() => navigateTo("/dashboard/people/linkages")}>
                          <Link className="h-4 w-4" />
                          <span>Linkages</span>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                      <SidebarMenuItem>
                        <SidebarMenuButton tooltip="Births" isActive={isActive("/dashboard/people/births")} onClick={() => navigateTo("/dashboard/people/births")}>
                          <Baby className="h-4 w-4" />
                          <span>Births</span>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                      <SidebarMenuItem>
                        <SidebarMenuButton tooltip="Deaths" isActive={isActive("/dashboard/people/deaths")} onClick={() => navigateTo("/dashboard/people/deaths")}>
                          <Skull className="h-4 w-4" />
                          <span>Deaths</span>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    </SidebarMenu>
                  </SidebarGroupContent>
                </CollapsibleContent>
              </SidebarGroup>
            </Collapsible>

            {/* Events Section */}
            <Collapsible
              open={openGroups.events}
              onOpenChange={() => toggleGroup("events")}
              className="group/collapsible"
            >
              <SidebarGroup>
                <SidebarGroupLabel asChild>
                  <CollapsibleTrigger className="w-full flex items-center">
                    Events
                    <ChevronDown className="ml-auto h-4 w-4 transition-transform group-data-[state=open]/collapsible:rotate-180" />
                  </CollapsibleTrigger>
                </SidebarGroupLabel>
                <CollapsibleContent>
                  <SidebarGroupContent>
                    <SidebarMenu>
                      <SidebarMenuItem>
                        <SidebarMenuButton tooltip="View All" isActive={isActive("/dashboard/events")} onClick={() => navigateTo("/dashboard/events")}>
                          <Eye className="h-4 w-4" />
                          <span>View All</span>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                      <SidebarMenuItem>
                        <SidebarMenuButton tooltip="Create Event" isActive={isActive("/dashboard/events/create")} onClick={() => navigateTo("/dashboard/events/create")}>
                          <PlusCircle className="h-4 w-4" />
                          <span>Create Event / Program</span>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                      <SidebarMenuItem>
                        <SidebarMenuButton tooltip="Create Event" isActive={isActive("/dashboard/events/news")} onClick={() => navigateTo("/dashboard/events/news")}>
                          <PlusCircle className="h-4 w-4" />
                          <span>Create News</span>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                      {/* <SidebarMenuItem>
                        <SidebarMenuButton tooltip="Approvals" isActive={isActive("/dashboard/events/approvals")} onClick={() => navigateTo("/dashboard/events/approvals")}>
                          <CheckCircle className="h-4 w-4" />
                          <span>Approvals</span>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                      <SidebarMenuItem>
                        <SidebarMenuButton tooltip="Payments" isActive={isActive("/dashboard/events/payments")} onClick={() => navigateTo("/dashboard/events/payments")}>
                          <CreditCard className="h-4 w-4" />
                          <span>Payments</span>
                        </SidebarMenuButton>
                      </SidebarMenuItem> */}
                    </SidebarMenu>
                  </SidebarGroupContent>
                </CollapsibleContent>
              </SidebarGroup>
            </Collapsible>
           
            {/* Family History Section */}
            <Collapsible
              open={openGroups.events}
              onOpenChange={() => toggleGroup("events")}
              className="group/collapsible"
            >
              <SidebarGroup>
                <SidebarGroupLabel asChild>
                  <CollapsibleTrigger className="w-full flex items-center">
                    Histories and Stories
                    <ChevronDown className="ml-auto h-4 w-4 transition-transform group-data-[state=open]/collapsible:rotate-180" />
                  </CollapsibleTrigger>
                </SidebarGroupLabel>
                <CollapsibleContent>
                  <SidebarGroupContent>
                    <SidebarMenu>
                      <SidebarMenuItem>
                        <SidebarMenuButton tooltip="Histories" isActive={isActive("/dashboard/family-histories")} onClick={() => navigateTo("/dashboard/family-histories")}>
                          <BookOpen className="h-4 w-4" />
                          <span>View All</span>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                      <SidebarMenuItem>
                        <SidebarMenuButton tooltip="Histories" isActive={isActive("/dashboard/family-histories/create")} onClick={() => navigateTo("/dashboard/family-histories/create")}>
                          <BookOpen className="h-4 w-4" />
                          <span>Create History</span>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    </SidebarMenu>
                  </SidebarGroupContent>
                </CollapsibleContent>
              </SidebarGroup>
            </Collapsible>

            <SidebarGroup>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton tooltip="Verification Center" isActive={isActive("/dashboard/verification-center")} onClick={() => navigateTo("/dashboard/verification-center")}>
                    <BadgeCheck className="h-4 w-4" />
                    <span>Verification Center</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton tooltip="Reports" isActive={isActive("/dashboard/reports")} onClick={() => navigateTo("/dashboard/reports")}>
                    <FileBarChart className="h-4 w-4" />
                    <span>Reports</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton tooltip="Settings" isActive={isActive("/dashboard/settings")} onClick={() => navigateTo("/dashboard/settings")}>
                    <Settings className="h-4 w-4" />
                    <span>Settings</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroup>
          </SidebarContent>
          <SidebarFooter className="border-t border-neutral-200 p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Avatar className="h-8 w-8 mr-2">
                  <AvatarImage src="/placeholder-user.jpg" alt="Admin" />
                  <AvatarFallback>AD</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">Admin User</p>
                  <p className="text-xs text-muted-foreground">Super Admin</p>
                </div>
              </div>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          </SidebarFooter>
        </Sidebar>
        
        <div className="flex flex-col flex-1">
          <Header />
          <main className="flex-1 p-6 bg-[#F5F5F5] overflow-auto">{children}</main>
        </div>
      </div>
      <Toaster />
    </SidebarProvider>
  )
}
