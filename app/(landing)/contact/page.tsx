import { ComingSoon } from "@/components/shared"
import { Mail } from "lucide-react"

export default function ContactPage() {
  return (
    <ComingSoon
      title="Contact Us"
      description="Get in touch with the Fairdrop team. Contact form and support system coming soon. For now, reach us at xpldevelopers@gmail.com"
      icon={<Mail className="w-16 h-16 text-primary" />}
      variant="development"
      eta="Q1 2026"
    />
  )
}
