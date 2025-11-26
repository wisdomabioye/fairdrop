import { ComingSoon } from "@/components/shared"
import { Code2 } from "lucide-react"

export default function APIPage() {
  return (
    <ComingSoon
      title="API Reference"
      description="Complete API reference for integrating Fairdrop auctions into your applications. Developer documentation coming soon!"
      icon={<Code2 className="w-16 h-16 text-primary" />}
      variant="development"
      eta="Q1 2026"
    />
  )
}
