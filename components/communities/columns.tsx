"use client"

import { useState } from "react"
import type { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal, Eye, Edit, Trash } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header"
import ViewCommunityDrawer from "./view-community-drawer"
import EditCommunityModal from "./edit-community-modal"
import DeleteCommunityDialog from "./delete-community-dialog"

export const columns: ColumnDef<any>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Name" />,
    cell: ({ row }) => {
      return <div className="font-medium">{row.getValue("name")}</div>
    },
  },
  {
    accessorKey: "region",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Region" />,
    cell: ({ row }) => {
      return <div>{row.getValue("region")}</div>
    },
  },
  {
    accessorKey: "population",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Population" />,
    cell: ({ row }) => {
      const population = Number.parseInt(row.getValue("population"))
      return <div>{population.toLocaleString()}</div>
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Status" />,
    cell: ({ row }) => {
      const status = row.getValue("status") as string
      return (
        <Badge variant={status === "Active" ? "default" : status === "Inactive" ? "secondary" : "outline"}>
          {status}
        </Badge>
      )
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const community = row.original
      const [showViewDrawer, setShowViewDrawer] = useState(false)
      const [showEditModal, setShowEditModal] = useState(false)
      const [showDeleteDialog, setShowDeleteDialog] = useState(false)

      return (
        <>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setShowViewDrawer(true)}>
                <Eye className="mr-2 h-4 w-4" />
                View details
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setShowEditModal(true)}>
                <Edit className="mr-2 h-4 w-4" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setShowDeleteDialog(true)} className="text-destructive">
                <Trash className="mr-2 h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* View Drawer */}
          <ViewCommunityDrawer
            community={community}
            open={showViewDrawer}
            onClose={() => setShowViewDrawer(false)}
            onEdit={() => {
              setShowViewDrawer(false)
              setShowEditModal(true)
            }}
            onDelete={() => {
              setShowViewDrawer(false)
              setShowDeleteDialog(true)
            }}
          />

          {/* Edit Modal */}
          <EditCommunityModal community={community} open={showEditModal} onClose={() => setShowEditModal(false)} />

          {/* Delete Dialog */}
          <DeleteCommunityDialog
            community={community}
            open={showDeleteDialog}
            onClose={() => setShowDeleteDialog(false)}
          />
        </>
      )
    },
  },
]
