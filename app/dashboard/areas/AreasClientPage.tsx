"use client"

import { useState } from "react"
import { PlusCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DataTable } from "@/components/data-table/data-table"
import { columns } from "@/components/areas/columns"
import { mockAreasData } from "@/components/areas/mock-data"
import { AreasFilters } from "@/components/areas/areas-filters"
import { AddAreaModal } from "@/components/areas/add-area-modal"
import { EditAreaModal } from "@/components/areas/edit-area-modal"
import { ViewAreaDrawer } from "@/components/areas/view-area-drawer"
import { DeleteAreaDialog } from "@/components/areas/delete-area-dialog"

export default function AreasClientPage() {
  const [isAddAreaModalOpen, setIsAddAreaModalOpen] = useState(false)
  const [isEditAreaModalOpen, setIsEditAreaModalOpen] = useState(false)
  const [isViewAreaDrawerOpen, setIsViewAreaDrawerOpen] = useState(false)
  const [isDeleteAreaDialogOpen, setIsDeleteAreaDialogOpen] = useState(false)
  const [selectedArea, setSelectedArea] = useState<any>(null)

  const handleViewArea = (area: any) => {
    setSelectedArea(area)
    setIsViewAreaDrawerOpen(true)
  }

  const handleEditArea = (area: any) => {
    setSelectedArea(area)
    setIsEditAreaModalOpen(true)
  }

  const handleDeleteArea = (area: any) => {
    setSelectedArea(area)
    setIsDeleteAreaDialogOpen(true)
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Areas Management</h1>
        <Button onClick={() => setIsAddAreaModalOpen(true)}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Area
        </Button>
      </div>
      <AreasFilters />
      <DataTable
        columns={columns({
          onView: handleViewArea,
          onEdit: handleEditArea,
          onDelete: handleDeleteArea,
        })}
        data={mockAreasData}
      />

      <AddAreaModal open={isAddAreaModalOpen} onOpenChange={setIsAddAreaModalOpen} />

      {selectedArea && (
        <>
          <EditAreaModal open={isEditAreaModalOpen} onOpenChange={setIsEditAreaModalOpen} area={selectedArea} />
          <ViewAreaDrawer open={isViewAreaDrawerOpen} onOpenChange={setIsViewAreaDrawerOpen} area={selectedArea} />
          <DeleteAreaDialog
            open={isDeleteAreaDialogOpen}
            onOpenChange={setIsDeleteAreaDialogOpen}
            area={selectedArea}
          />
        </>
      )}
    </div>
  )
}
