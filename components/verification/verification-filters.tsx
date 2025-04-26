"use client"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { MultiSelect } from "@/components/ui/multi-select"

const dataTypeOptions = [
  { label: "Person", value: "person" },
  { label: "Family", value: "family" },
  { label: "Main Clan", value: "main-clan" },
  { label: "Sub Clan", value: "sub-clan" },
  { label: "Ethnic Group", value: "ethnic-group" },
  { label: "Event", value: "event" },
  { label: "Community", value: "community" },
  { label: "Family History", value: "family-history" },
]

interface VerificationFiltersProps {
  searchQuery: string
  onSearchChange: (value: string) => void
  selectedDataTypes: string[]
  onDataTypesChange: (value: string[]) => void
}

export default function VerificationFilters({
  searchQuery,
  onSearchChange,
  selectedDataTypes,
  onDataTypesChange,
}: VerificationFiltersProps) {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center mb-6">
      <div className="relative flex-1">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search by name or submitter..."
          className="pl-8"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
      <div className="w-full md:w-[250px]">
        <MultiSelect
          placeholder="Filter by data type"
          selected={selectedDataTypes}
          options={dataTypeOptions}
          onChange={onDataTypesChange}
        />
      </div>
    </div>
  )
}
