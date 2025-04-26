"use client"

import { useState } from "react"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"

export default function EventsFilters() {
  const [searchTerm, setSearchTerm] = useState("")
  const [eventType, setEventType] = useState("")
  const [visibility, setVisibility] = useState("")

  const handleReset = () => {
    setSearchTerm("")
    setEventType("")
    setVisibility("")
  }

  return (
    <div className="flex flex-col sm:flex-row gap-3">
      <div className="relative">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search events..."
          className="w-full sm:w-[250px] pl-8"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <Select value={eventType} onValueChange={setEventType}>
        <SelectTrigger className="w-full sm:w-[180px]">
          <SelectValue placeholder="Event Type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Types</SelectItem>
          <SelectItem value="wedding">Wedding</SelectItem>
          <SelectItem value="funeral">Funeral</SelectItem>
          <SelectItem value="birthday">Birthday</SelectItem>
          <SelectItem value="anniversary">Anniversary</SelectItem>
          <SelectItem value="meeting">Meeting</SelectItem>
          <SelectItem value="other">Other</SelectItem>
        </SelectContent>
      </Select>
      <Select value={visibility} onValueChange={setVisibility}>
        <SelectTrigger className="w-full sm:w-[180px]">
          <SelectValue placeholder="Visibility" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Visibility</SelectItem>
          <SelectItem value="family">Family</SelectItem>
          <SelectItem value="community">Community</SelectItem>
          <SelectItem value="region">Region</SelectItem>
          <SelectItem value="clan">Clan</SelectItem>
          <SelectItem value="subclan">Sub-Clan</SelectItem>
          <SelectItem value="country">Country</SelectItem>
        </SelectContent>
      </Select>
      <Button variant="outline" onClick={handleReset}>
        Reset
      </Button>
    </div>
  )
}
