"use client"

import { useState } from "react"
import Image from "next/image"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Eye, Calendar, User, PlusCircle } from "lucide-react"
import { format } from "date-fns"
import { mockFamilyHistories } from "./mock-family-histories-data"
import FamilyHistoryDetailModal from "./family-history-detail-modal"
import CreateFamilyHistoryModal from "./create-family-history-modal"
import EditFamilyHistoryModal from "./edit-family-history-modal"
import DeleteFamilyHistoryDialog from "./delete-family-history-dialog"
import FamilyHistoriesFilters from "./family-histories-filters"

export default function FamilyHistoriesGrid() {
  const [familyHistories, setFamilyHistories] = useState(mockFamilyHistories)
  const [selectedHistory, setSelectedHistory] = useState<any | null>(null)
  const [showDetailModal, setShowDetailModal] = useState(false)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)

  const handleViewDetails = (history: any) => {
    setSelectedHistory(history)
    setShowDetailModal(true)
  }

  const handleEdit = (history: any) => {
    setSelectedHistory(history)
    setShowEditModal(true)
  }

  const handleDelete = (history: any) => {
    setSelectedHistory(history)
    setShowDeleteDialog(true)
  }

  return (
    <>
     <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <div className="flex justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Family Histories</h1>
          <Button onClick={() => setShowCreateModal(true)}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Family History
          </Button>
        </div>
        <p className="text-muted-foreground">Manage and curate family histories submitted by community members.</p>
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <FamilyHistoriesFilters onSearch={setFamilyHistories} familyHistories={mockFamilyHistories} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {familyHistories.map((history) => (
            <Card key={history.id} className="overflow-hidden hover:shadow-md transition-shadow">
              <div className="relative h-48 w-full">
                <Image
                  src={history.coverImage || "/placeholder.svg"}
                  alt={history.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute top-2 right-2">
                  <Badge
                    variant={
                      history.status === "Published"
                        ? "default"
                        : history.status === "Approved"
                          ? "success"
                          : history.status === "Pending"
                            ? "outline"
                            : "secondary"
                    }
                  >
                    {history.status}
                  </Badge>
                </div>
              </div>
              <CardHeader className="pb-2">
                <CardTitle className="line-clamp-1">{history.title}</CardTitle>
              </CardHeader>
              <CardContent className="pb-2">
                <div className="flex flex-col space-y-1 text-sm text-muted-foreground">
                  <div className="flex items-center">
                    <User className="mr-2 h-4 w-4" />
                    <span>Family: {history.family}</span>
                  </div>
                  <div className="flex items-center">
                    <User className="mr-2 h-4 w-4" />
                    <span>Submitted by: {history.submittedBy}</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="mr-2 h-4 w-4" />
                    <span>Date: {format(new Date(history.submittedDate), "PPP")}</span>
                  </div>
                </div>
                <p className="mt-2 line-clamp-2 text-sm">{history.summary}</p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm" className="w-full" onClick={() => handleViewDetails(history)}>
                  <Eye className="mr-2 h-4 w-4" />
                  View Details
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>

      {/* Detail Modal */}
      <FamilyHistoryDetailModal
        history={selectedHistory}
        open={showDetailModal}
        onClose={() => setShowDetailModal(false)}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {/* Create Modal */}
      <CreateFamilyHistoryModal open={showCreateModal} onClose={() => setShowCreateModal(false)} />

      {/* Edit Modal */}
      <EditFamilyHistoryModal history={selectedHistory} open={showEditModal} onClose={() => setShowEditModal(false)} />

      {/* Delete Dialog */}
      <DeleteFamilyHistoryDialog
        history={selectedHistory}
        open={showDeleteDialog}
        onClose={() => setShowDeleteDialog(false)}
      />
    </>
  )
}
