"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Loader2 } from "lucide-react"

// Form schema
const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  parentClan: z.string().min(1, { message: "Please select a parent clan." }),
  description: z.string().min(10, { message: "Description must be at least 10 characters." }),
  status: z.boolean(),
})

type FormValues = z.infer<typeof formSchema>

interface AddSubClanModalProps {
  open: boolean
  onClose: () => void
  onAdd: (data: any) => void
  parentClans: { id: string; name: string; tribe: string }[]
  isLoading: boolean
}

export function AddSubClanModal({ open, onClose, onAdd, parentClans, isLoading }: AddSubClanModalProps) {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      parentClan: "",
      description: "",
      status: true,
    },
  })

  const selectedParentClan = form.watch("parentClan")
  const selectedTribe = parentClans.find((clan) => clan.name === selectedParentClan)?.tribe || ""

  const onSubmit = (data: FormValues) => {
    onAdd({
      name: data.name,
      parentClan: data.parentClan,
      tribe: selectedTribe,
      description: data.description,
      status: data.status ? "active" : "inactive",
      createdBy: "Admin User", // This would come from auth context in a real app
    })
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Sub-Clan</DialogTitle>
          <DialogDescription>Fill in the details below to create a new sub-clan.</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Sub-Clan Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter sub-clan name" {...field} />
                  </FormControl>
                  <FormDescription>The name of the sub-clan as it will appear in the system.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="parentClan"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Parent Clan</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a parent clan" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {parentClans.map((clan) => (
                        <SelectItem key={clan.id} value={clan.name}>
                          {clan.name} ({clan.tribe})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>The main clan this sub-clan belongs to.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {selectedParentClan && (
              <div className="rounded-lg border p-3 bg-muted/50">
                <p className="text-sm font-medium">Tribe</p>
                <p className="text-sm">{selectedTribe}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  The tribe is automatically set based on the parent clan.
                </p>
              </div>
            )}

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Enter a description of the sub-clan" className="min-h-[120px]" {...field} />
                  </FormControl>
                  <FormDescription>
                    Provide details about the sub-clan's history, location, or other relevant information.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Active Status</FormLabel>
                    <FormDescription>Set whether this sub-clan is active in the system.</FormDescription>
                  </div>
                  <FormControl>
                    <Switch checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating...
                  </>
                ) : (
                  "Create Sub-Clan"
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
