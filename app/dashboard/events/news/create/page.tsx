import type { Metadata } from "next"
import CreateNewsForm from "@/components/news/create-news-form"

export const metadata: Metadata = {
  title: "Create News | KimCompass Admin",
  description: "Create and publish news articles for the KimCompass platform",
}

export default function CreateNewsPage() {
  return (
    <div className="">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Create News Article</h1>
      </div>
      <CreateNewsForm />
    </div>
  )
}
