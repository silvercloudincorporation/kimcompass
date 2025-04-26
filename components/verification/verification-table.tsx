"use client"

import { useState } from "react"
import { format } from "date-fns"
import {
  ArrowUpDown,
  CheckCircle,
  Eye,
  MoreHorizontal,
  User,
  Users,
  Users2,
  Globe,
  Calendar,
  Home,
  Building2,
  BookOpen,
  X,
} from "lucide-react"
import type { VerificationItem } from "./mock-verification-data"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Badge } from "@/components/ui/badge"
import { ApproveVerificationDialog } from "./approve-verification-dialog"
import { RejectVerificationDialog } from "./reject-verification-dialog"
import { ViewVerificationDrawer } from "./view-verification-drawer"

interface VerificationTableProps {
  items: VerificationItem[]
  selectedItems: string[]
  onSelectedItemsChange: (values: string[]) => void
}

export default function VerificationTable({ items, selectedItems, onSelectedItemsChange }: VerificationTableProps) {
  const [itemToView, setItemToView] = useState<VerificationItem | null>(null)
  const [itemToApprove, setItemToApprove] = useState<VerificationItem | null>(null)
  const [itemToReject, setItemToReject] = useState<VerificationItem | null>(null)

  const toggleSelectAll = () => {
    if (selectedItems.length === items.length) {
      onSelectedItemsChange([])
    } else {
      onSelectedItemsChange(items.map((item) => item.id))
    }
  }

  const toggleSelectItem = (id: string) => {
    if (selectedItems.includes(id)) {
      onSelectedItemsChange(selectedItems.filter((item) => item !== id))
    } else {
      onSelectedItemsChange([...selectedItems, id])
    }
  }

  const getDataTypeIcon = (dataType: string) => {
    switch (dataType) {
      case "person":
        return <User className="h-4 w-4" />
      case "family":
        return <Home className="h-4 w-4" />
      case "main-clan":
      case "sub-clan":
        return <Users2 className="h-4 w-4" />
      case "ethnic-group":
        return <Users className="h-4 w-4" />
      case "event":
        return <Calendar className="h-4 w-4" />
      case "community":
        return <Building2 className="h-4 w-4" />
      case "family-history":
        return <BookOpen className="h-4 w-4" />
      default:
        return <Globe className="h-4 w-4" />
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return (
          <Badge variant="outline" className="bg-amber-100 text-amber-800 hover:bg-amber-100">
            Pending
          </Badge>
        )
      case "approved":
        return (
          <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-100">
            Approved
          </Badge>
        )
      case "rejected":
        return (
          <Badge variant="outline" className="bg-red-100 text-red-800 hover:bg-red-100">
            Rejected
          </Badge>
        )
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">
                <Checkbox
                  checked={selectedItems.length === items.length && items.length > 0}
                  onCheckedChange={toggleSelectAll}
                  aria-label="Select all"
                />
              </TableHead>
              <TableHead>
                <div className="flex items-center space-x-2">
                  <span>Name</span>
                  <Button variant="ghost" size="sm" className="h-8 p-0">
                    <ArrowUpDown className="h-4 w-4" />
                  </Button>
                </div>
              </TableHead>
              <TableHead>Data Type</TableHead>
              <TableHead>Submitted By</TableHead>
              <TableHead>Date Submitted</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map((item) => (
              <TableRow key={item.id}>
                <TableCell>
                  <Checkbox
                    checked={selectedItems.includes(item.id)}
                    onCheckedChange={() => toggleSelectItem(item.id)}
                    aria-label={`Select ${item.name}`}
                  />
                </TableCell>
                <TableCell className="font-medium">{item.name}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    {getDataTypeIcon(item.dataType)}
                    <span className="capitalize">{item.dataType.replace("-", " ")}</span>
                  </div>
                </TableCell>
                <TableCell>{item.submittedBy}</TableCell>
                <TableCell>{format(new Date(item.dateSubmitted), "MMM d, yyyy")}</TableCell>
                <TableCell>{getStatusBadge(item.status)}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="ghost" size="icon" onClick={() => setItemToView(item)}>
                            <Eye className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>View Details</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>

                    {item.status === "pending" && (
                      <>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="text-green-600 hover:text-green-700 hover:bg-green-50"
                                onClick={() => setItemToApprove(item)}
                              >
                                <CheckCircle className="h-4 w-4" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Approve</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>

                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="text-red-600 hover:text-red-700 hover:bg-red-50"
                                onClick={() => setItemToReject(item)}
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Reject</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </>
                    )}

                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => setItemToView(item)}>
                          <Eye className="mr-2 h-4 w-4" />
                          View details
                        </DropdownMenuItem>
                        {item.status === "pending" && (
                          <>
                            <DropdownMenuItem onClick={() => setItemToApprove(item)}>
                              <CheckCircle className="mr-2 h-4 w-4 text-green-600" />
                              Approve
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setItemToReject(item)}>
                              <X className="mr-2 h-4 w-4 text-red-600" />
                              Reject
                            </DropdownMenuItem>
                          </>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* View drawer */}
      <ViewVerificationDrawer
        open={!!itemToView}
        item={itemToView}
        onClose={() => setItemToView(null)}
        onApprove={() => {
          setItemToApprove(itemToView)
          setItemToView(null)
        }}
        onReject={() => {
          setItemToReject(itemToView)
          setItemToView(null)
        }}
      />

      {/* Approve dialog */}
      <ApproveVerificationDialog
        open={!!itemToApprove}
        item={itemToApprove}
        onClose={() => setItemToApprove(null)}
        onApprove={() => {
          // Handle approve action
          alert(`Approved: ${itemToApprove?.name}`)
          setItemToApprove(null)
        }}
      />

      {/* Reject dialog */}
      <RejectVerificationDialog
        open={!!itemToReject}
        item={itemToReject}
        onClose={() => setItemToReject(null)}
        onReject={(reason) => {
          // Handle reject action
          alert(`Rejected: ${itemToReject?.name} with reason: ${reason}`)
          setItemToReject(null)
        }}
      />
    </>
  )
}
