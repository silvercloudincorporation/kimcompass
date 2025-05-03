"use client"

import { MoreHorizontal, Eye, Pencil, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header"

export const columns = ({
  onView,
  onEdit,
  onDelete,
}: {
  onView: (area: any) => void
  onEdit: (area: any) => void
  onDelete: (area: any) => void
}) => [
  {
    accessorKey: "name",
    header: ({ column }: any) => <DataTableColumnHeader column={column} title="Area Name" />,
    cell: ({ row }: any) => <div className="font-medium">{row.getValue("name")}</div>,
  },
  {
    accessorKey: "community",
    header: ({ column }: any) => <DataTableColumnHeader column={column} title="Community" />,
    cell: ({ row }: any) => <div>{row.getValue("community")}</div>,
  },
  {
    accessorKey: "region",
    header: ({ column }: any) => <DataTableColumnHeader column={column} title="Region" />,
    cell: ({ row }: any) => <div>{row.getValue("region")}</div>,
  },
  {
    accessorKey: "country",
    header: ({ column }: any) => <DataTableColumnHeader column={column} title="Country" />,
    cell: ({ row }: any) => <div>{row.getValue("country")}</div>,
  },
  {
    accessorKey: "landmarks",
    header: ({ column }: any) => <DataTableColumnHeader column={column} title="Landmarks" />,
    cell: ({ row }: any) => <div>{row.getValue("landmarks")}</div>,
  },
  {
    accessorKey: "status",
    header: ({ column }: any) => <DataTableColumnHeader column={column} title="Status" />,
    cell: ({ row }: any) => {
      const status = row.getValue("status")
      return (
        <Badge variant={status === "Active" ? "success" : status === "Pending" ? "secondary" : "destructive"}>
          {status}
        </Badge>
      )
    },
    filterFn: (row: any, id: any, value: any) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    id: "actions",
    cell: ({ row }: any) => {
      const area = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => onView(area)}>
              <Eye className="mr-2 h-4 w-4" />
              View details
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onEdit(area)}>
              <Pencil className="mr-2 h-4 w-4" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => onDelete(area)} className="text-destructive focus:text-destructive">
              <Trash2 className="mr-2 h-4 w-4" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
