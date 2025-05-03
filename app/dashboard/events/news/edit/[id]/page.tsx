import type { Metadata } from "next"
import EditNewsForm from "@/components/news/edit-news-form"

export const metadata: Metadata = {
  title: "Edit News | KimCompass Admin",
  description: "Edit news articles for the KimCompass platform",
}

interface Params{
    params: Promise<{id: string}>
}

export default async function EditNewsPage({ params }: Params) {
  const newsId = (await params).id
  return (
    <div className="">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Edit News Article</h1>
      </div>
      <EditNewsForm newsId={newsId} />
    </div>
  )
}
