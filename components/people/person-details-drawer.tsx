"use client"

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { X, Edit, Trash2, Link, UserMinus, Eye } from "lucide-react"
import { Separator } from "@/components/ui/separator"

interface PersonDetailsDrawerProps {
  open: boolean
  onClose: () => void
  person: any
}

export function PersonDetailsDrawer({ open, onClose, person }: PersonDetailsDrawerProps) {
  return (
    <Drawer open={open} onOpenChange={onClose}>
      <DrawerContent className="max-h-[90vh]">
        <DrawerHeader>
          <DrawerTitle className="text-xl flex items-center justify-between">
            <span>Person Details</span>
            <DrawerClose asChild>
              <Button variant="ghost" size="icon">
                <X className="h-4 w-4" />
              </Button>
            </DrawerClose>
          </DrawerTitle>
          <DrawerDescription>View detailed information about {person.name}</DrawerDescription>
        </DrawerHeader>
        <ScrollArea className="px-4 h-[calc(90vh-10rem)]">
          <Tabs defaultValue="personal" className="w-full">
            <TabsList className="grid grid-cols-3 mb-4">
              <TabsTrigger value="personal">Personal</TabsTrigger>
              <TabsTrigger value="family">Family</TabsTrigger>
              <TabsTrigger value="records">Records</TabsTrigger>
            </TabsList>

            <TabsContent value="personal" className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium">{person.name}</h3>
                <div className="flex space-x-2">
                  <Badge
                    variant="outline"
                    className={
                      person.status === "active" ? "border-green-500 text-green-600" : "border-red-500 text-red-600"
                    }
                  >
                    {person.status === "active" ? "Active" : "Inactive"}
                  </Badge>
                  <Badge
                    variant="outline"
                    className={
                      person.lifeStatus === "alive"
                        ? "border-green-500 text-green-600"
                        : "border-gray-500 text-gray-600"
                    }
                  >
                    {person.lifeStatus === "alive" ? "Alive" : "Deceased"}
                  </Badge>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Gender</p>
                  <p>{person.gender}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Family</p>
                  <p>{person.family}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Clan</p>
                  <p>{person.clan}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Ethnic Group</p>
                  <p>{person.ethnicGroup}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Region</p>
                  <p>{person.region}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">ID Number</p>
                  <p>{person.idNumber || "Not provided"}</p>
                </div>
              </div>

              {person.notes && (
                <div>
                  <p className="text-sm text-muted-foreground">Notes</p>
                  <p className="mt-1">{person.notes}</p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="family" className="space-y-4">
              <h3 className="text-lg font-medium">Family Relationships</h3>

              {person.familyLinks && person.familyLinks.length > 0 ? (
                <div className="space-y-4">
                  {person.familyLinks.map((link: any, index: number) => (
                    <div key={index} className="border rounded-md p-3">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-medium">{link.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {link.relationshipType} of {person.name}
                          </p>
                        </div>
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4 mr-2" />
                          View
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground">No family relationships recorded.</p>
              )}
            </TabsContent>

            <TabsContent value="records" className="space-y-4">
              <div>
                <h3 className="text-lg font-medium">Birth Record</h3>
                {person.birthRecord ? (
                  <div className="mt-2 space-y-2">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Date of Birth</p>
                        <p>{person.birthRecord.date}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Place of Birth</p>
                        <p>{person.birthRecord.place}</p>
                      </div>
                      {person.birthRecord.certificateNumber && (
                        <div>
                          <p className="text-sm text-muted-foreground">Certificate Number</p>
                          <p>{person.birthRecord.certificateNumber}</p>
                        </div>
                      )}
                      {person.birthRecord.registeredBy && (
                        <div>
                          <p className="text-sm text-muted-foreground">Registered By</p>
                          <p>{person.birthRecord.registeredBy}</p>
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  <p className="text-muted-foreground mt-2">No birth record available.</p>
                )}
              </div>

              <Separator />

              <div>
                <h3 className="text-lg font-medium">Death Record</h3>
                {person.deathRecord ? (
                  <div className="mt-2 space-y-2">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Date of Death</p>
                        <p>{person.deathRecord.date}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Place of Death</p>
                        <p>{person.deathRecord.place}</p>
                      </div>
                      {person.deathRecord.cause && (
                        <div>
                          <p className="text-sm text-muted-foreground">Cause of Death</p>
                          <p>{person.deathRecord.cause}</p>
                        </div>
                      )}
                      {person.deathRecord.certificateNumber && (
                        <div>
                          <p className="text-sm text-muted-foreground">Certificate Number</p>
                          <p>{person.deathRecord.certificateNumber}</p>
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  <p className="text-muted-foreground mt-2">No death record available.</p>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </ScrollArea>
        <DrawerFooter className="flex flex-row justify-between">
          <div className="flex space-x-2">
            <Button variant="outline" size="sm">
              <Edit className="h-4 w-4 mr-2" />
              Edit
            </Button>
            <Button variant="outline" size="sm">
              <Link className="h-4 w-4 mr-2" />
              Link Family
            </Button>
            {person.lifeStatus === "alive" && (
              <Button variant="outline" size="sm">
                <UserMinus className="h-4 w-4 mr-2" />
                Record Death
              </Button>
            )}
          </div>
          <Button variant="destructive" size="sm">
            <Trash2 className="h-4 w-4 mr-2" />
            Delete
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
