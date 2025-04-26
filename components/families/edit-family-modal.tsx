"use client"

import type React from "react"

import { useState, useEffect } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { mockFamilies, type Family } from "./mock-families-data"
import { useToast } from "@/components/ui/use-toast"

interface EditFamilyModalProps {
  familyId: string
  open: boolean
  onClose: () => void
}

export function EditFamilyModal({ familyId, open, onClose }: EditFamilyModalProps) {
  const [family, setFamily] = useState<Family | null>(null)
  const [name, setName] = useState("")
  const [headOfFamily, setHeadOfFamily] = useState("")
  const [type, setType] = useState("")
  const [region, setRegion] = useState("")
  const [status, setStatus] = useState("")
  const [description, setDescription] = useState("")
  const { toast } = useToast()

  useEffect(() => {
    if (familyId) {
      const foundFamily = mockFamilies.find((f) => f.id === familyId)
      if (foundFamily) {
        setFamily(foundFamily)
        setName(foundFamily.name)
        setHeadOfFamily(foundFamily.headOfFamily)
        setType(foundFamily.type)
        setRegion(foundFamily.region)
        setStatus(foundFamily.status)
        setDescription(foundFamily.description)
      }
    }
  }, [familyId])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Validation
    if (!name || !headOfFamily || !type || !region || !status) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      })
      return
    }

    // In a real app, this would be an API call
    toast({
      title: "Success",
      description: `${name} has been updated successfully.`,
    })

    onClose()
  }

  if (!family) {
    return null
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Edit Family</DialogTitle>
          <DialogDescription>Update the details for {family.name}.</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Family Name</Label>
              <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter family name" />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="headOfFamily">Head of Family</Label>
              <Input
                id="headOfFamily"
                value={headOfFamily}
                onChange={(e) => setHeadOfFamily(e.target.value)}
                placeholder="Enter head of family"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="type">Family Type</Label>
                <Select value={type} onValueChange={setType}>
                  <SelectTrigger id="type">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="nuclear">Nuclear Family</SelectItem>
                    <SelectItem value="extended">Extended Family</SelectItem>
                    <SelectItem value="single-parent">Single Parent</SelectItem>
                    <SelectItem value="blended">Blended Family</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="region">Region</Label>
                <Select value={region} onValueChange={setRegion}>
                  <SelectTrigger id="region">
                    <SelectValue placeholder="Select region" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="north">North Region</SelectItem>
                    <SelectItem value="south">South Region</SelectItem>
                    <SelectItem value="east">East Region</SelectItem>
                    <SelectItem value="west">West Region</SelectItem>
                    <SelectItem value="central">Central Region</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="status">Status</Label>
                <Select value={status} onValueChange={setStatus}>
                  <SelectTrigger id="status">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                    <SelectItem value="pending">Pending Verification</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter family description"
                rows={3}
              />
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" className="bg-[#0A1931] hover:bg-[#0A1931]/90">
              Save Changes
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
