"use client"

import { useState, useEffect } from "react"
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
} from "@/components/ui/drawer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { mockFamilies, type Family } from "./mock-families-data"
import { Calendar, Clock, Home, MapPin, Users } from "lucide-react"

interface ViewFamilyDrawerProps {
  familyId: string
  open: boolean
  onClose: () => void
}

export function ViewFamilyDrawer({ familyId, open, onClose }: ViewFamilyDrawerProps) {
  const [family, setFamily] = useState<Family | null>(null)

  useEffect(() => {
    if (familyId) {
      const foundFamily = mockFamilies.find((f) => f.id === familyId)
      setFamily(foundFamily || null)
    }
  }, [familyId])

  if (!family) {
    return null
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Active</Badge>
      case "inactive":
        return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">Inactive</Badge>
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Pending</Badge>
      default:
        return <Badge>{status}</Badge>
    }
  }

  const getFamilyTypeLabel = (type: string) => {
    switch (type) {
      case "nuclear":
        return "Nuclear Family"
      case "extended":
        return "Extended Family"
      case "single-parent":
        return "Single Parent"
      case "blended":
        return "Blended Family"
      default:
        return type
    }
  }

  const getRegionLabel = (region: string) => {
    switch (region) {
      case "north":
        return "North Region"
      case "south":
        return "South Region"
      case "east":
        return "East Region"
      case "west":
        return "West Region"
      case "central":
        return "Central Region"
      default:
        return region
    }
  }

  return (
    <Drawer open={open} onOpenChange={onClose}>
      <DrawerContent className="max-h-[90vh]">
        <DrawerHeader>
          <DrawerTitle className="text-2xl">{family.name}</DrawerTitle>
          <DrawerDescription>
            Family ID: {family.id} • Created on {new Date(family.createdAt).toLocaleDateString()}
          </DrawerDescription>
        </DrawerHeader>

        <ScrollArea className="flex-1 px-4">
          <Tabs defaultValue="details">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="details">Family Details</TabsTrigger>
              <TabsTrigger value="members">Family Members</TabsTrigger>
            </TabsList>

            <TabsContent value="details" className="space-y-4 py-4">
              <Card>
                <CardHeader>
                  <CardTitle>Overview</CardTitle>
                  <CardDescription>Basic information about the family</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-start space-x-2">
                      <Users className="h-5 w-5 text-muted-foreground mt-0.5" />
                      <div>
                        <p className="font-medium">Head of Family</p>
                        <p className="text-sm text-muted-foreground">{family.headOfFamily}</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-2">
                      <Home className="h-5 w-5 text-muted-foreground mt-0.5" />
                      <div>
                        <p className="font-medium">Family Type</p>
                        <p className="text-sm text-muted-foreground">{getFamilyTypeLabel(family.type)}</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-2">
                      <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
                      <div>
                        <p className="font-medium">Region</p>
                        <p className="text-sm text-muted-foreground">{getRegionLabel(family.region)}</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-2">
                      <Clock className="h-5 w-5 text-muted-foreground mt-0.5" />
                      <div>
                        <p className="font-medium">Status</p>
                        <div className="mt-1">{getStatusBadge(family.status)}</div>
                      </div>
                    </div>

                    <div className="flex items-start space-x-2">
                      <Calendar className="h-5 w-5 text-muted-foreground mt-0.5" />
                      <div>
                        <p className="font-medium">Created On</p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(family.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-2">
                      <Users className="h-5 w-5 text-muted-foreground mt-0.5" />
                      <div>
                        <p className="font-medium">Total Members</p>
                        <p className="text-sm text-muted-foreground">{family.memberCount} people</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <p className="font-medium mb-1">Description</p>
                    <p className="text-sm text-muted-foreground">{family.description}</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="members" className="py-4">
              <Card>
                <CardHeader>
                  <CardTitle>Family Members</CardTitle>
                  <CardDescription>People belonging to this family</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Relationship</TableHead>
                        <TableHead>Age</TableHead>
                        <TableHead>Gender</TableHead>
                        <TableHead>Role</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {family.members.map((member) => (
                        <TableRow key={member.id}>
                          <TableCell className="font-medium">{member.name}</TableCell>
                          <TableCell>{member.relationship}</TableCell>
                          <TableCell>{member.age}</TableCell>
                          <TableCell>{member.gender}</TableCell>
                          <TableCell>
                            {member.isHead ? (
                              <Badge className="bg-[#0A1931] hover:bg-[#0A1931]/90">Head</Badge>
                            ) : (
                              <Badge variant="outline">Member</Badge>
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </ScrollArea>

        <DrawerFooter className="border-t pt-4">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
