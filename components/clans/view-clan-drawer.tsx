"use client"

import { Button } from "@/components/ui/button"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer"
import { Badge } from "@/components/ui/badge"
import { Calendar, User } from "lucide-react"

interface ViewClanDrawerProps {
  open: boolean
  onClose: () => void
  clan: any
}

export function ViewClanDrawer({ open, onClose, clan }: ViewClanDrawerProps) {
  return (
    <Drawer open={open} onOpenChange={onClose}>
      <DrawerContent className="max-h-[90vh]">
        <DrawerHeader className="text-left">
          <DrawerTitle className="text-2xl font-poppins">{clan.name}</DrawerTitle>
          <DrawerDescription>Clan details and information</DrawerDescription>
        </DrawerHeader>
        <div className="px-4 overflow-y-auto">
          <div className="space-y-6 pb-6">
            <div className="flex justify-between items-center">
              <Badge
                variant="outline"
                className={clan.status === "active" ? "border-green-500 text-green-600" : "border-red-500 text-red-600"}
              >
                {clan.status === "active" ? "Active" : "Inactive"}
              </Badge>
              <div className="flex items-center text-sm text-muted-foreground">
                <Calendar className="mr-1 h-4 w-4" />
                Created on {clan.createdAt}
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="font-medium">Tribe</h3>
              <p>{clan.tribe}</p>
            </div>

            <div className="space-y-2">
              <h3 className="font-medium">Description</h3>
              <p className="text-muted-foreground">{clan.description}</p>
            </div>

            <div className="space-y-2">
              <h3 className="font-medium">Created By</h3>
              <div className="flex items-center">
                <User className="mr-2 h-4 w-4" />
                <span>{clan.createdBy}</span>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="font-medium">Sub-Clans</h3>
              <p className="text-muted-foreground">
                This clan has {clan.subClansCount} sub-clan{clan.subClansCount !== 1 ? "s" : ""}.
              </p>
            </div>

            <div className="border-t pt-4">
              <h3 className="font-medium mb-2">Associated Data</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-lg border p-3">
                  <p className="text-sm font-medium">Families</p>
                  <p className="text-2xl font-bold">24</p>
                </div>
                <div className="rounded-lg border p-3">
                  <p className="text-sm font-medium">People</p>
                  <p className="text-2xl font-bold">156</p>
                </div>
                <div className="rounded-lg border p-3">
                  <p className="text-sm font-medium">Events</p>
                  <p className="text-2xl font-bold">12</p>
                </div>
                <div className="rounded-lg border p-3">
                  <p className="text-sm font-medium">Stories</p>
                  <p className="text-2xl font-bold">8</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <DrawerFooter>
          <DrawerClose asChild>
            <Button variant="outline">Close</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
