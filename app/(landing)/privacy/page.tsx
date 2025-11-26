import { ComingSoon } from "@/components/shared"
import { Shield } from "lucide-react"

export default function PrivacyPage() {
  return (
    <ComingSoon
      title="Privacy Policy"
      description="Our privacy policy outlining how we handle and protect your data. Full policy coming soon."
      icon={<Shield className="w-16 h-16 text-primary" />}
      variant="development"
      eta="Q1 2026"
    />
  )
}
