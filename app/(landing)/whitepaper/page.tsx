import { ComingSoon } from "@/components/shared"
import { FileText } from "lucide-react"

export default function WhitepaperPage() {
  return (
    <ComingSoon
      title="Whitepaper"
      description="Detailed technical whitepaper explaining Fairdrop's Dutch auction mechanism, tokenomics, and protocol architecture."
      icon={<FileText className="w-16 h-16 text-primary" />}
      variant="launching"
      eta="Q2 2026"
    />
  )
}
