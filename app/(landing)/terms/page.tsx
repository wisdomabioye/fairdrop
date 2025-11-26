import { ComingSoon } from "@/components/shared"
import { FileCheck } from "lucide-react"

export default function TermsPage() {
  return (
    <ComingSoon
      title="Terms of Service"
      description="Terms and conditions for using the Fairdrop platform. Full terms of service coming soon."
      icon={<FileCheck className="w-16 h-16 text-primary" />}
      variant="development"
      eta="Q1 2026"
    />
  )
}
