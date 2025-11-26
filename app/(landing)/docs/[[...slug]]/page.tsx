import { ComingSoon } from "@/components/shared"
import { BookOpen } from "lucide-react"

export default function DocsPage() {
  return (
    <ComingSoon
      title="Documentation"
      description="Comprehensive guides, tutorials, and API documentation for building with Fairdrop. Coming soon!"
      icon={<BookOpen className="w-16 h-16 text-primary" />}
      variant="development"
      eta="Q1 2026"
    />
  )
}
