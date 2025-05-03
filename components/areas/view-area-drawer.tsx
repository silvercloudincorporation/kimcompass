"use client"

import { MapPin, Calendar, User, Globe, Building2, Home } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"

export function ViewAreaDrawer({
  open,
  onOpenChange,
  area,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  area: any
}) {
  if (!area) return null

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="sm:max-w-[500px]">
        <SheetHeader>
          <SheetTitle className="text-xl font-bold">{area.name}</SheetTitle>
          <Badge variant={area.status === "Active" ? "success" : area.status === "Pending" ? "secondary" : "destructive"}>
            {area.status}
          </Badge>
        </SheetHeader>
        <ScrollArea className="h-[calc(100vh-180px)] pr-4">
          <div className="mt-6 space-y-6">
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Description</h3>
              <p className="mt-1">{area.description}</p>
            </div>
            <Separator />
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-muted-foreground">Area Details</h3>
              <div className="grid grid-cols-1 gap-4">
                <div className="flex items-center gap-2">
                  <Building2 className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Community</p>
                    <p className="text-sm">{area.community}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Region</p>
                    <p className="text-sm">{area.region}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Globe className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Country</p>
                    <p className="text-sm">{area.country}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Coordinates</p>
                    <p className="text-sm">{area.coordinates}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Population</p>
                    <p className="text-sm">{area.population}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Home className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Landmarks</p>
                    <p className="text-sm">{area.landmarks}</p>
                  </div>
                </div>
              </div>
            </div>
            <Separator />
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-muted-foreground">System Information</h3>
              <div className="grid grid-cols-1 gap-4">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Created</p>
                    <p className="text-sm">{area.createdAt}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Last Updated</p>
                    <p className="text-sm">{area.updatedAt}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ScrollArea>
        <div className="mt-6 flex justify-end">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  )
}
