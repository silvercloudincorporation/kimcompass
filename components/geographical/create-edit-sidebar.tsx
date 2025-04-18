"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Loader2 } from "lucide-react"
import { type ReactNode, useEffect } from "react"

interface Field {
  name: string
  label: string
  type: "text" | "textarea" | "select"
  placeholder?: string
  description?: string
  required?: boolean
  options?: { value: string; label: string }[]
  disabled?: boolean
  defaultValue?: string
}

interface CreateEditSidebarProps {
  open: boolean
  onClose: () => void
  onSave: (data: any) => void
  item: any
  fields: Field[]
  isLoading: boolean
  title: string
  description: string
  icon?: ReactNode
}

export function CreateEditSidebar({
  open,
  onClose,
  onSave,
  item,
  fields,
  isLoading,
  title,
  description,
  icon,
}: CreateEditSidebarProps) {
  // Dynamically build the form schema based on the fields
  const buildFormSchema = () => {
    const schema: Record<string, any> = {}

    fields.forEach((field) => {
      if (field.required) {
        schema[field.name] = z.string().min(1, { message: `${field.label} is required.` })
      } else {
        schema[field.name] = z.string().optional()
      }
    })

    return z.object(schema)
  }

  const formSchema = buildFormSchema()
  type FormValues = z.infer<typeof formSchema>

  // Build default values
  const buildDefaultValues = () => {
    const defaultValues: Record<string, any> = {}

    fields.forEach((field) => {
      if (item && item[field.name]) {
        defaultValues[field.name] = item[field.name]
      } else if (field.defaultValue) {
        defaultValues[field.name] = field.defaultValue
      } else {
        defaultValues[field.name] = ""
      }
    })

    return defaultValues
  }

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: buildDefaultValues(),
  })

  // Reset form when item changes
  useEffect(() => {
    if (open) {
      form.reset(buildDefaultValues())
    }
  }, [item, open])

  const onSubmit = (data: FormValues) => {
    onSave(data)
  }

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent className="sm:max-w-md overflow-y-auto">
        <SheetHeader className="pb-4">
          <div className="flex items-center gap-2">
            {icon}
            <SheetTitle>{title}</SheetTitle>
          </div>
          <SheetDescription>{description}</SheetDescription>
        </SheetHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 py-4">
            {fields.map((field) => (
              <FormField
                key={field.name}
                control={form.control}
                name={field.name}
                render={({ field: formField }) => (
                  <FormItem>
                    <FormLabel>{field.label}</FormLabel>
                    <FormControl>
                      {field.type === "textarea" ? (
                        <Textarea
                          placeholder={field.placeholder}
                          className="min-h-[120px]"
                          disabled={field.disabled || isLoading}
                          {...formField}
                        />
                      ) : field.type === "select" ? (
                        <Select
                          onValueChange={formField.onChange}
                          defaultValue={formField.value}
                          disabled={field.disabled || isLoading}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder={field.placeholder} />
                          </SelectTrigger>
                          <SelectContent>
                            {field.options?.map((option) => (
                              <SelectItem key={option.value} value={option.value}>
                                {option.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      ) : (
                        <Input placeholder={field.placeholder} disabled={field.disabled || isLoading} {...formField} />
                      )}
                    </FormControl>
                    {field.description && <FormDescription>{field.description}</FormDescription>}
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}
            <SheetFooter className="pt-4">
              <Button type="button" variant="outline" onClick={onClose} disabled={isLoading}>
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {item ? "Saving..." : "Creating..."}
                  </>
                ) : (
                  <>{item ? "Save Changes" : "Create"}</>
                )}
              </Button>
            </SheetFooter>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  )
}
