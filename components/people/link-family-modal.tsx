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
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { mockPeopleData } from "@/components/people/mock-data"
import { useToast } from "@/components/ui/use-toast"

interface LinkFamilyModalProps {
  open: boolean
  onClose: () => void
  initialPerson?: any
}

export function LinkFamilyModal({ open, onClose, initialPerson }: LinkFamilyModalProps) {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [formData, setFormData] = useState({
    personA: initialPerson?.id || "",
    personB: "",
    relationshipType: "",
  })

  // Filter people for selection
  const filteredPeople = mockPeopleData.filter(
    (person) =>
      person.id !== formData.personA &&
      (person.name.toLowerCase().includes(searchTerm.toLowerCase()) || searchTerm === ""),
  )

  const handleSelectChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Validate form data
    if (!formData.personA || !formData.personB || !formData.relationshipType) {
      toast({
        title: "Error",
        description: "All fields are required",
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
        description: "Family relationship created successfully",
      })
      onClose()
      // Here you would typically update the family relationships in your state or database
    }, 1000)
  }

  const personA = mockPeopleData.find((person) => person.id === formData.personA)
  const personB = mockPeopleData.find((person) => person.id === formData.personB)

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Link Family Members</DialogTitle>
          <DialogDescription>Create a relationship between two people.</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="personA">Person A</Label>
            <Select
              value={formData.personA}
              onValueChange={(value) => handleSelectChange("personA", value)}
              disabled={!!initialPerson}
            >
              <SelectTrigger id="personA">
                <SelectValue placeholder="Select person A" />
              </SelectTrigger>
              <SelectContent>
                {mockPeopleData.map((person) => (
                  <SelectItem key={person.id} value={person.id}>
                    {person.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="relationshipType">Relationship Type</Label>
            <Select
              value={formData.relationshipType}
              onValueChange={(value) => handleSelectChange("relationshipType", value)}
            >
              <SelectTrigger id="relationshipType">
                <SelectValue placeholder="Select relationship type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="parent">Parent of Person B</SelectItem>
                <SelectItem value="child">Child of Person B</SelectItem>
                <SelectItem value="spouse">Spouse of Person B</SelectItem>
                <SelectItem value="sibling">Sibling of Person B</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="searchPerson">Search Person B</Label>
            <Input
              id="searchPerson"
              placeholder="Search by name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="personB">Person B</Label>
            <Select value={formData.personB} onValueChange={(value) => handleSelectChange("personB", value)}>
              <SelectTrigger id="personB">
                <SelectValue placeholder="Select person B" />
              </SelectTrigger>
              <SelectContent>
                {filteredPeople.map((person) => (
                  <SelectItem key={person.id} value={person.id}>
                    {person.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {personA && personB && formData.relationshipType && (
            <div className="bg-muted p-3 rounded-md">
              <p className="text-sm font-medium">Relationship Summary:</p>
              <p className="text-sm">
                {personA.name} will be{" "}
                {formData.relationshipType === "parent"
                  ? "parent of"
                  : formData.relationshipType === "child"
                    ? "child of"
                    : formData.relationshipType === "spouse"
                      ? "spouse of"
                      : "sibling of"}{" "}
                {personB.name}
              </p>
            </div>
          )}

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Saving..." : "Save Relationship"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
