import type { Metadata } from "next"
import NewsClientPage from "./NewsClientPage"

export const metadata: Metadata = {
  title: "News Management | KimCompass Admin",
  description: "Manage news articles for the KimCompass platform",
}

export default function NewsPage() {
  return <NewsClientPage />
}
