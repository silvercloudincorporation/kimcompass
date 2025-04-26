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
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"

interface RecordDeathModalProps {
  open: boolean
  onClose: () => void
  person: any
}

export function RecordDeathModal({ open, onClose, person }: RecordDeathModalProps) {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    date: "",
    place: "",
    cause: "",
    certificateNumber: "",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Validate required fields
    if (!formData.date || !formData.place) {
      toast({
        title: "Error",
        description: "Date and place of death are required",
        variant: "destructive",
      })
      setIsLoading(false)
      return
    }

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Success",
        description: `Death record for ${person.name} has been created successfully`,
      })
      onClose()
      // Here you would typically update the person's death record in your state or database
    }, 1000)
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Record Death</DialogTitle>
          <DialogDescription>Record death information for {person.name}</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="date">
              Date of Death <span className="text-red-500">*</span>
            </Label>
            <Input id="date" name="date" type="date" value={formData.date} onChange={handleInputChange} required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="place">
              Place of Death <span className="text-red-500">*</span>
            </Label>
            <Input id="place" name="place" value={formData.place} onChange={handleInputChange} required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="cause">Cause of Death</Label>
            <Input id="cause" name="cause" value={formData.cause} onChange={handleInputChange} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="certificateNumber">Death Certificate Number</Label>
            <Input
              id="certificateNumber"
              name="certificateNumber"
              value={formData.certificateNumber}
              onChange={handleInputChange}
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Saving..." : "Record Death"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
