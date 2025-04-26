"use client"

import { format } from "date-fns"
import { MapPin, Users, Calendar, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer"
import { ScrollArea } from "@/components/ui/scroll-area"

interface ViewCommunityDrawerProps {
  community: any
  open: boolean
  onClose: () => void
  onEdit: (community: any) => void
  onDelete: (community: any) => void
}

export default function ViewCommunityDrawer({ community, open, onClose, onEdit, onDelete }: ViewCommunityDrawerProps) {
  if (!community) return null

  return (
    <Drawer open={open} onOpenChange={onClose}>
      <DrawerContent className="h-[85vh]">
        <DrawerHeader>
          <DrawerTitle className="text-2xl">{community.name}</DrawerTitle>
          <DrawerDescription>
            <div className="flex items-center gap-2 mt-1">
              <Badge
                variant={
                  community.status === "Active" ? "default" : community.status === "Inactive" ? "secondary" : "outline"
                }
              >
                {community.status}
              </Badge>
              <Badge variant="outline">{community.region}</Badge>
            </div>
          </DrawerDescription>
        </DrawerHeader>
        <ScrollArea className="px-4 h-full pb-8">
          <div className="space-y-6">
            {community.image && (
              <div className="relative h-48 w-full rounded-md overflow-hidden">
                <img
                  src={community.image || "/placeholder.svg"}
                  alt={community.name}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            <div>
              <h3 className="text-lg font-semibold mb-2">Description</h3>
              <p className="text-muted-foreground">{community.description}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="flex items-start gap-2">
                  <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <h4 className="font-medium">Region</h4>
                    <p className="text-sm text-muted-foreground">{community.region}</p>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <Users className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <h4 className="font-medium">Population</h4>
                    <p className="text-sm text-muted-foreground">{community.population.toLocaleString()}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-2">
                  <Info className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <h4 className="font-medium">Status</h4>
                    <p className="text-sm text-muted-foreground">{community.status}</p>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <Calendar className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <h4 className="font-medium">Created</h4>
                    <p className="text-sm text-muted-foreground">{format(new Date(community.createdAt), "PPP")}</p>
                  </div>
                </div>
              </div>
            </div>

            <Separator />

            <div>
              <h3 className="text-lg font-semibold mb-2">Statistics</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-muted p-3 rounded-md">
                  <h4 className="text-sm font-medium">Families</h4>
                  <p className="text-2xl font-bold">{community.stats?.families || 0}</p>
                </div>
                <div className="bg-muted p-3 rounded-md">
                  <h4 className="text-sm font-medium">Members</h4>
                  <p className="text-2xl font-bold">{community.stats?.members || 0}</p>
                </div>
                <div className="bg-muted p-3 rounded-md">
                  <h4 className="text-sm font-medium">Events</h4>
                  <p className="text-2xl font-bold">{community.stats?.events || 0}</p>
                </div>
                <div className="bg-muted p-3 rounded-md">
                  <h4 className="text-sm font-medium">Projects</h4>
                  <p className="text-2xl font-bold">{community.stats?.projects || 0}</p>
                </div>
              </div>
            </div>
          </div>
        </ScrollArea>
        <DrawerFooter className="pt-2">
          <div className="flex gap-2 w-full">
            <Button variant="outline" className="flex-1" onClick={() => onDelete(community)}>
              Delete
            </Button>
            <Button className="flex-1" onClick={() => onEdit(community)}>
              Edit
            </Button>
          </div>
          <DrawerClose asChild>
            <Button variant="outline">Close</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
