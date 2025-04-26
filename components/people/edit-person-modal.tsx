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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { families, clans, ethnicGroups, regions } from "@/components/people/mock-data"

interface EditPersonModalProps {
  open: boolean
  onClose: () => void
  person: any
}

export function EditPersonModal({ open, onClose, person }: EditPersonModalProps) {
  const [formData, setFormData] = useState({
    ...person,
  })
  const [isLoading, setIsLoading] = useState(false)
  const [activeTab, setActiveTab] = useState("personal")

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value })
  }

  const handleBirthRecordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      birthRecord: {
        ...formData.birthRecord,
        [name]: value,
      },
    })
  }

  const handleDeathRecordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      deathRecord: {
        ...(formData.deathRecord || {}),
        [name]: value,
      },
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      onClose()
      // Here you would typically update the person data in your state or database
    }, 1000)
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Person</DialogTitle>
          <DialogDescription>Update information for {person.name}</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <Tabs defaultValue="personal" className="w-full" onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-3 mb-4">
              <TabsTrigger value="personal">Personal</TabsTrigger>
              <TabsTrigger value="birth">Birth</TabsTrigger>
              <TabsTrigger value="death" disabled={formData.lifeStatus !== "deceased"}>
                Death
              </TabsTrigger>
            </TabsList>

            <TabsContent value="personal" className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" name="name" value={formData.name} onChange={handleInputChange} required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="gender">Gender</Label>
                  <Select value={formData.gender} onValueChange={(value) => handleSelectChange("gender", value)}>
                    <SelectTrigger id="gender">
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="family">Family</Label>
                  <Select value={formData.family} onValueChange={(value) => handleSelectChange("family", value)}>
                    <SelectTrigger id="family">
                      <SelectValue placeholder="Select family" />
                    </SelectTrigger>
                    <SelectContent>
                      {families.map((family) => (
                        <SelectItem key={family} value={family}>
                          {family}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="clan">Clan</Label>
                  <Select value={formData.clan} onValueChange={(value) => handleSelectChange("clan", value)}>
                    <SelectTrigger id="clan">
                      <SelectValue placeholder="Select clan" />
                    </SelectTrigger>
                    <SelectContent>
                      {clans.map((clan) => (
                        <SelectItem key={clan} value={clan}>
                          {clan}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="ethnicGroup">Ethnic Group</Label>
                  <Select
                    value={formData.ethnicGroup}
                    onValueChange={(value) => handleSelectChange("ethnicGroup", value)}
                  >
                    <SelectTrigger id="ethnicGroup">
                      <SelectValue placeholder="Select ethnic group" />
                    </SelectTrigger>
                    <SelectContent>
                      {ethnicGroups.map((group) => (
                        <SelectItem key={group} value={group}>
                          {group}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="region">Region</Label>
                  <Select value={formData.region} onValueChange={(value) => handleSelectChange("region", value)}>
                    <SelectTrigger id="region">
                      <SelectValue placeholder="Select region" />
                    </SelectTrigger>
                    <SelectContent>
                      {regions.map((region) => (
                        <SelectItem key={region} value={region}>
                          {region}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select value={formData.status} onValueChange={(value) => handleSelectChange("status", value)}>
                    <SelectTrigger id="status">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="lifeStatus">Life Status</Label>
                  <Select
                    value={formData.lifeStatus}
                    onValueChange={(value) => handleSelectChange("lifeStatus", value)}
                  >
                    <SelectTrigger id="lifeStatus">
                      <SelectValue placeholder="Select life status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="alive">Alive</SelectItem>
                      <SelectItem value="deceased">Deceased</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">Notes</Label>
                <Textarea id="notes" name="notes" value={formData.notes || ""} onChange={handleInputChange} rows={3} />
              </div>
            </TabsContent>

            <TabsContent value="birth" className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="birthDate">Date of Birth</Label>
                  <Input
                    id="birthDate"
                    name="date"
                    type="date"
                    value={formData.birthRecord?.date || ""}
                    onChange={handleBirthRecordChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="birthPlace">Place of Birth</Label>
                  <Input
                    id="birthPlace"
                    name="place"
                    value={formData.birthRecord?.place || ""}
                    onChange={handleBirthRecordChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="birthCertificate">Birth Certificate Number</Label>
                  <Input
                    id="birthCertificate"
                    name="certificateNumber"
                    value={formData.birthRecord?.certificateNumber || ""}
                    onChange={handleBirthRecordChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="birthRegisteredBy">Registered By</Label>
                  <Input
                    id="birthRegisteredBy"
                    name="registeredBy"
                    value={formData.birthRecord?.registeredBy || ""}
                    onChange={handleBirthRecordChange}
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="death" className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="deathDate">Date of Death</Label>
                  <Input
                    id="deathDate"
                    name="date"
                    type="date"
                    value={formData.deathRecord?.date || ""}
                    onChange={handleDeathRecordChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="deathPlace">Place of Death</Label>
                  <Input
                    id="deathPlace"
                    name="place"
                    value={formData.deathRecord?.place || ""}
                    onChange={handleDeathRecordChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="deathCause">Cause of Death</Label>
                  <Input
                    id="deathCause"
                    name="cause"
                    value={formData.deathRecord?.cause || ""}
                    onChange={handleDeathRecordChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="deathCertificate">Death Certificate Number</Label>
                  <Input
                    id="deathCertificate"
                    name="certificateNumber"
                    value={formData.deathRecord?.certificateNumber || ""}
                    onChange={handleDeathRecordChange}
                  />
                </div>
              </div>
            </TabsContent>
          </Tabs>

          <DialogFooter className="mt-6">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Saving..." : "Save Changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
