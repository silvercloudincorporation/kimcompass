"use client"

import type React from "react"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"
import { Plus } from "lucide-react"

export function AddFamilyModal() {
  const [open, setOpen] = useState(false)
  const [name, setName] = useState("")
  const [headOfFamily, setHeadOfFamily] = useState("")
  const [type, setType] = useState("")
  const [region, setRegion] = useState("")
  const [status, setStatus] = useState("active")
  const [description, setDescription] = useState("")
  const { toast } = useToast()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Validation
    if (!name || !headOfFamily || !type || !region) {
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
      description: `${name} has been created successfully.`,
    })

    // Reset form and close modal
    resetForm()
    setOpen(false)
  }

  const resetForm = () => {
    setName("")
    setHeadOfFamily("")
    setType("")
    setRegion("")
    setStatus("active")
    setDescription("")
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-[#0A1931] hover:bg-[#0A1931]/90">
          <Plus className="mr-2 h-4 w-4" /> Add Family
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Add New Family</DialogTitle>
          <DialogDescription>Create a new family unit in the system.</DialogDescription>
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
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" className="bg-[#0A1931] hover:bg-[#0A1931]/90">
              Create Family
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
