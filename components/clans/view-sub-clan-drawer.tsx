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
import { Calendar, User, ArrowUpRight } from "lucide-react"
import { useRouter } from "next/navigation"

interface ViewSubClanDrawerProps {
  open: boolean
  onClose: () => void
  subClan: any
}

export function ViewSubClanDrawer({ open, onClose, subClan }: ViewSubClanDrawerProps) {
  const router = useRouter()

  const navigateToParentClan = () => {
    onClose()
    // In a real app, you would navigate to the parent clan page
    // This is a simplified example
    router.push("/main-clans")
  }

  return (
    <Drawer open={open} onOpenChange={onClose}>
      <DrawerContent className="max-h-[90vh]">
        <DrawerHeader className="text-left">
          <DrawerTitle className="text-2xl font-poppins">{subClan.name}</DrawerTitle>
          <DrawerDescription>Sub-clan details and information</DrawerDescription>
        </DrawerHeader>
        <div className="px-4 overflow-y-auto">
          <div className="space-y-6 pb-6">
            <div className="flex justify-between items-center">
              <Badge
                variant="outline"
                className={
                  subClan.status === "active" ? "border-green-500 text-green-600" : "border-red-500 text-red-600"
                }
              >
                {subClan.status === "active" ? "Active" : "Inactive"}
              </Badge>
              <div className="flex items-center text-sm text-muted-foreground">
                <Calendar className="mr-1 h-4 w-4" />
                Created on {subClan.createdAt}
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="font-medium">Parent Clan</h3>
              <Button
                variant="link"
                className="p-0 h-auto text-[#185ADB] flex items-center"
                onClick={navigateToParentClan}
              >
                {subClan.parentClan}
                <ArrowUpRight className="ml-1 h-3 w-3" />
              </Button>
            </div>

            <div className="space-y-2">
              <h3 className="font-medium">Tribe</h3>
              <p>{subClan.tribe}</p>
            </div>

            <div className="space-y-2">
              <h3 className="font-medium">Description</h3>
              <p className="text-muted-foreground">{subClan.description}</p>
            </div>

            <div className="space-y-2">
              <h3 className="font-medium">Created By</h3>
              <div className="flex items-center">
                <User className="mr-2 h-4 w-4" />
                <span>{subClan.createdBy}</span>
              </div>
            </div>

            <div className="border-t pt-4">
              <h3 className="font-medium mb-2">Associated Data</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-lg border p-3">
                  <p className="text-sm font-medium">Families</p>
                  <p className="text-2xl font-bold">12</p>
                </div>
                <div className="rounded-lg border p-3">
                  <p className="text-sm font-medium">People</p>
                  <p className="text-2xl font-bold">78</p>
                </div>
                <div className="rounded-lg border p-3">
                  <p className="text-sm font-medium">Events</p>
                  <p className="text-2xl font-bold">5</p>
                </div>
                <div className="rounded-lg border p-3">
                  <p className="text-sm font-medium">Stories</p>
                  <p className="text-2xl font-bold">3</p>
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
