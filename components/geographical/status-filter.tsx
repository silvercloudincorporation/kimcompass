"use client"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface StatusFilterProps {
  value: string | null
  onChange: (value: string | null) => void
}

export function StatusFilter({ value, onChange }: StatusFilterProps) {
  const handleChange = (newValue: string) => {
    if (newValue === "all") {
      onChange(null)
    } else {
      onChange(newValue)
    }
  }

  return (
    <Select value={value || "all"} onValueChange={handleChange}>
      <SelectTrigger className="w-full sm:w-[150px]">
        <SelectValue placeholder="Filter by status" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">All Statuses</SelectItem>
        <SelectItem value="approved">Approved</SelectItem>
        <SelectItem value="pending">Pending</SelectItem>
      </SelectContent>
    </Select>
  )
}
