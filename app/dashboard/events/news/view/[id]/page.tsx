import type { Metadata } from "next"
import NewsDetail from "@/components/news/news-detail"

export const metadata: Metadata = {
  title: "View News | KimCompass Admin",
  description: "View news article details on the KimCompass platform",
}

interface Params{
    params: Promise<{id: string}>
}

export default async function ViewNewsPage({ params }: Params) {
  const newsId = (await params).id
  return (
    <div className="">
      <NewsDetail newsId={newsId} />
    </div>
  )
}
