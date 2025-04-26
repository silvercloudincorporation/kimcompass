"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle, CheckCircle, Info } from "lucide-react"
import VerificationFilters from "@/components/verification/verification-filters"
import VerificationTable from "@/components/verification/verification-table"
import VerificationHeader from "@/components/verification/verification-header"
import { mockVerificationItems } from "@/components/verification/mock-verification-data"

export type VerificationStatus = "pending" | "approved" | "rejected"

export default function VerificationClientPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedDataTypes, setSelectedDataTypes] = useState<string[]>([])
  const [selectedStatus, setSelectedStatus] = useState<VerificationStatus>("pending")
  const [selectedItems, setSelectedItems] = useState<string[]>([])

  // Filter the data based on the selected filters
  const filteredItems = mockVerificationItems.filter((item) => {
    const matchesSearch =
      !searchQuery ||
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.submittedBy.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesType = selectedDataTypes.length === 0 || selectedDataTypes.includes(item.dataType)

    const matchesStatus = selectedStatus === "pending" ? item.status === "pending" : item.status === selectedStatus

    return matchesSearch && matchesType && matchesStatus
  })

  const handleBulkApprove = () => {
    alert(`Approved ${selectedItems.length} items`)
    setSelectedItems([])
  }

  const handleBulkReject = () => {
    alert(`Rejected ${selectedItems.length} items`)
    setSelectedItems([])
  }

  const handleRefresh = () => {
    // In a real implementation, this would fetch fresh data
    alert("Refreshing verification queue")
  }

  return (
    <div className="py-6 space-y-6">
      <VerificationHeader
        selectedItems={selectedItems}
        onBulkApprove={handleBulkApprove}
        onBulkReject={handleBulkReject}
        onRefresh={handleRefresh}
      />

      <Tabs
        defaultValue="pending"
        className="w-full"
        onValueChange={(value) => setSelectedStatus(value as VerificationStatus)}
      >
        <TabsList className="grid w-full grid-cols-3 mb-6">
          <TabsTrigger value="pending" className="flex items-center gap-2">
            <Info className="h-4 w-4" />
            <span>Pending</span>
            <span className="ml-1 rounded-full bg-amber-100 text-amber-800 px-2 py-0.5 text-xs font-medium">
              {mockVerificationItems.filter((item) => item.status === "pending").length}
            </span>
          </TabsTrigger>
          <TabsTrigger value="approved" className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4" />
            <span>Approved</span>
            <span className="ml-1 rounded-full bg-green-100 text-green-800 px-2 py-0.5 text-xs font-medium">
              {mockVerificationItems.filter((item) => item.status === "approved").length}
            </span>
          </TabsTrigger>
          <TabsTrigger value="rejected" className="flex items-center gap-2">
            <AlertCircle className="h-4 w-4" />
            <span>Rejected</span>
            <span className="ml-1 rounded-full bg-red-100 text-red-800 px-2 py-0.5 text-xs font-medium">
              {mockVerificationItems.filter((item) => item.status === "rejected").length}
            </span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="pending">
          {filteredItems.length === 0 ? (
            <Alert>
              <Info className="h-4 w-4" />
              <AlertTitle>No pending items</AlertTitle>
              <AlertDescription>There are no pending items to verify at this time.</AlertDescription>
            </Alert>
          ) : (
            <>
              <VerificationFilters
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                selectedDataTypes={selectedDataTypes}
                onDataTypesChange={setSelectedDataTypes}
              />
              <VerificationTable
                items={filteredItems}
                selectedItems={selectedItems}
                onSelectedItemsChange={setSelectedItems}
              />
            </>
          )}
        </TabsContent>

        <TabsContent value="approved">
          {filteredItems.length === 0 ? (
            <Alert>
              <Info className="h-4 w-4" />
              <AlertTitle>No approved items</AlertTitle>
              <AlertDescription>There are no approved items to display.</AlertDescription>
            </Alert>
          ) : (
            <>
              <VerificationFilters
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                selectedDataTypes={selectedDataTypes}
                onDataTypesChange={setSelectedDataTypes}
              />
              <VerificationTable
                items={filteredItems}
                selectedItems={selectedItems}
                onSelectedItemsChange={setSelectedItems}
              />
            </>
          )}
        </TabsContent>

        <TabsContent value="rejected">
          {filteredItems.length === 0 ? (
            <Alert>
              <Info className="h-4 w-4" />
              <AlertTitle>No rejected items</AlertTitle>
              <AlertDescription>There are no rejected items to display.</AlertDescription>
            </Alert>
          ) : (
            <>
              <VerificationFilters
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                selectedDataTypes={selectedDataTypes}
                onDataTypesChange={setSelectedDataTypes}
              />
              <VerificationTable
                items={filteredItems}
                selectedItems={selectedItems}
                onSelectedItemsChange={setSelectedItems}
              />
            </>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
