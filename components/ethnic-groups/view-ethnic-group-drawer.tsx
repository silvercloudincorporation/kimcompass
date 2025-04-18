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
import { Calendar, User, MapPin } from "lucide-react"
import { useRouter } from "next/navigation"

interface ViewEthnicGroupDrawerProps {
  open: boolean
  onClose: () => void
  ethnicGroup: any
}

export function ViewEthnicGroupDrawer({ open, onClose, ethnicGroup }: ViewEthnicGroupDrawerProps) {
  const router = useRouter()

  return (
    <Drawer open={open} onOpenChange={onClose}>
      <DrawerContent className="max-h-[90vh]">
        <DrawerHeader className="text-left">
          <DrawerTitle className="text-2xl font-poppins">{ethnicGroup.name}</DrawerTitle>
          <DrawerDescription>Ethnic group details and information</DrawerDescription>
        </DrawerHeader>
        <div className="px-4 overflow-y-auto">
          <div className="space-y-6 pb-6">
            <div className="flex justify-between items-center">
              <Badge
                variant="outline"
                className={
                  ethnicGroup.status === "active" ? "border-green-500 text-green-600" : "border-red-500 text-red-600"
                }
              >
                {ethnicGroup.status === "active" ? "Active" : "Inactive"}
              </Badge>
              <div className="flex items-center text-sm text-muted-foreground">
                <Calendar className="mr-1 h-4 w-4" />
                Created on {ethnicGroup.createdAt}
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="font-medium">Location</h3>
              <div className="flex items-center">
                <MapPin className="mr-2 h-4 w-4" />
                <span>
                  {ethnicGroup.region}, {ethnicGroup.country}
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="font-medium">Description</h3>
              <p className="text-muted-foreground">{ethnicGroup.description}</p>
            </div>

            <div className="space-y-2">
              <h3 className="font-medium">Created By</h3>
              <div className="flex items-center">
                <User className="mr-2 h-4 w-4" />
                <span>{ethnicGroup.createdBy}</span>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="font-medium">Clans</h3>
              <p className="text-muted-foreground">
                This ethnic group has {ethnicGroup.clansCount} clan{ethnicGroup.clansCount !== 1 ? "s" : ""}.
              </p>
            </div>

            <div className="border-t pt-4">
              <h3 className="font-medium mb-2">Associated Data</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-lg border p-3">
                  <p className="text-sm font-medium">Main Clans</p>
                  <p className="text-2xl font-bold">{ethnicGroup.clansCount}</p>
                </div>
                <div className="rounded-lg border p-3">
                  <p className="text-sm font-medium">Sub-Clans</p>
                  <p className="text-2xl font-bold">32</p>
                </div>
                <div className="rounded-lg border p-3">
                  <p className="text-sm font-medium">Families</p>
                  <p className="text-2xl font-bold">124</p>
                </div>
                <div className="rounded-lg border p-3">
                  <p className="text-sm font-medium">People</p>
                  <p className="text-2xl font-bold">578</p>
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
