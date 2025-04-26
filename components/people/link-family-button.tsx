"use client"

import { Button } from "@/components/ui/button"
import { Link } from "lucide-react"
import { useState } from "react"
import { LinkFamilyModal } from "@/components/people/link-family-modal"

export function LinkFamilyButton() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      <Button onClick={() => setIsModalOpen(true)} variant="outline" className="border-primary text-primary">
        <Link className="mr-2 h-4 w-4" /> Link Family
      </Button>
      <LinkFamilyModal open={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  )
}
