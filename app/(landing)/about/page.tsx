import { ComingSoon } from "@/components/shared"
import { Users } from "lucide-react"

export default function AboutPage() {
  return (
    <ComingSoon
      title="About Fairdrop"
      description="Learn about our mission to revolutionize price discovery through decentralized Dutch auctions. Meet the team and our vision."
      icon={<Users className="w-16 h-16 text-primary" />}
      variant="development"
      eta="Q1 2026"
    />
  )
}
