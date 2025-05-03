import type { Metadata } from "next"
import ReportsClientPage from "./ReportsClientPage"

export const metadata: Metadata = {
  title: "Reports | KimCompass Admin",
  description: "View and analyze data reports for KimCompass",
}

export default function ReportsPage() {
  return <ReportsClientPage />
}
