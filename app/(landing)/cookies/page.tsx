import { ComingSoon } from "@/components/shared"
import { Cookie } from "lucide-react"

export default function CookiesPage() {
  return (
    <ComingSoon
      title="Cookie Policy"
      description="Information about how we use cookies and similar tracking technologies. Full cookie policy coming soon."
      icon={<Cookie className="w-16 h-16 text-primary" />}
      variant="development"
      eta="Q1 2026"
    />
  )
}
