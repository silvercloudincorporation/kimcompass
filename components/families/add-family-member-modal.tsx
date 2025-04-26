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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { mockFamilies, type Family } from "./mock-families-data"
import { useToast } from "@/components/ui/use-toast"

interface AddFamilyMemberModalProps {
  familyId: string
  open: boolean
  onClose: () => void
}

export function AddFamilyMemberModal({ familyId, open, onClose }: AddFamilyMemberModalProps) {
  const [family, setFamily] = useState<Family | null>(null)
  const [name, setName] = useState("")
  const [relationship, setRelationship] = useState("")
  const [age, setAge] = useState("")
  const [gender, setGender] = useState("")
  const { toast } = useToast()

  useEffect(() => {
    if (familyId) {
      const foundFamily = mockFamilies.find((f) => f.id === familyId)
      setFamily(foundFamily || null)
    }
  }, [familyId])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Validation
    if (!name || !relationship || !age || !gender) {
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
      description: `${name} has been added to the ${family?.name}.`,
    })

    // Reset form and close modal
    resetForm()
    onClose()
  }

  const resetForm = () => {
    setName("")
    setRelationship("")
    setAge("")
    setGender("")
  }

  if (!family) {
    return null
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add Family Member</DialogTitle>
          <DialogDescription>Add a new member to the {family.name}.</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter full name" />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="relationship">Relationship to Head</Label>
              <Select value={relationship} onValueChange={setRelationship}>
                <SelectTrigger id="relationship">
                  <SelectValue placeholder="Select relationship" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="spouse">Spouse</SelectItem>
                  <SelectItem value="son">Son</SelectItem>
                  <SelectItem value="daughter">Daughter</SelectItem>
                  <SelectItem value="father">Father</SelectItem>
                  <SelectItem value="mother">Mother</SelectItem>
                  <SelectItem value="brother">Brother</SelectItem>
                  <SelectItem value="sister">Sister</SelectItem>
                  <SelectItem value="grandfather">Grandfather</SelectItem>
                  <SelectItem value="grandmother">Grandmother</SelectItem>
                  <SelectItem value="grandson">Grandson</SelectItem>
                  <SelectItem value="granddaughter">Granddaughter</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="age">Age</Label>
                <Input
                  id="age"
                  type="number"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  placeholder="Enter age"
                  min="0"
                  max="120"
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="gender">Gender</Label>
                <Select value={gender} onValueChange={setGender}>
                  <SelectTrigger id="gender">
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" className="bg-[#0A1931] hover:bg-[#0A1931]/90">
              Add Member
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
