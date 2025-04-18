"use client"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Loader2 } from "lucide-react"

// Form schema
const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  tribe: z.string().min(1, { message: "Please select a tribe." }),
  description: z.string().min(10, { message: "Description must be at least 10 characters." }),
  status: z.boolean(),
})

type FormValues = z.infer<typeof formSchema>

interface AddClanDrawerProps {
  open: boolean
  onClose: () => void
  onAdd: (data: any) => void
  tribes: { id: string; name: string }[]
  isLoading: boolean
}

export function AddClanDrawer({ open, onClose, onAdd, tribes, isLoading }: AddClanDrawerProps) {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      tribe: "",
      description: "",
      status: true,
    },
  })

  const onSubmit = (data: FormValues) => {
    onAdd({
      name: data.name,
      tribe: data.tribe,
      description: data.description,
      status: data.status ? "active" : "inactive",
      createdBy: "Admin User", // This would come from auth context in a real app
    })
  }

  return (
    <Drawer open={open} onOpenChange={onClose}>
      <DrawerContent className="max-h-[90vh]">
        <DrawerHeader className="text-left">
          <DrawerTitle>Add New Clan</DrawerTitle>
          <DrawerDescription>Fill in the details below to create a new clan.</DrawerDescription>
        </DrawerHeader>
        <div className="px-4 overflow-y-auto">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 pb-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Clan Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter clan name" {...field} />
                    </FormControl>
                    <FormDescription>The name of the clan as it will appear in the system.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="tribe"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tribe</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a tribe" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {tribes.map((tribe) => (
                          <SelectItem key={tribe.id} value={tribe.name}>
                            {tribe.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormDescription>The tribe this clan belongs to.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Enter a description of the clan" className="min-h-[120px]" {...field} />
                    </FormControl>
                    <FormDescription>
                      Provide details about the clan's history, location, or other relevant information.
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
                      <FormDescription>Set whether this clan is active in the system.</FormDescription>
                    </div>
                    <FormControl>
                      <Switch checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                  </FormItem>
                )}
              />

              <DrawerFooter className="px-0">
                <Button type="submit" disabled={isLoading} className="w-full">
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Creating...
                    </>
                  ) : (
                    "Create Clan"
                  )}
                </Button>
                <DrawerClose asChild>
                  <Button variant="outline" className="w-full">
                    Cancel
                  </Button>
                </DrawerClose>
              </DrawerFooter>
            </form>
          </Form>
        </div>
      </DrawerContent>
    </Drawer>
  )
}
