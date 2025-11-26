import { Hero } from "@/components/fairdrop/hero"
import { Features } from "@/components/fairdrop/features"
import { HowItWorks } from "@/components/fairdrop/how-it-works"
import { AuctionCardLarge } from "@/components/fairdrop/auction-card-large"
import { Stats } from "@/components/fairdrop/stats"
import { UseCases } from "@/components/fairdrop/use-cases"
import { SupportedChains } from "@/components/fairdrop/supported-chains"
import { Roadmap } from "@/components/fairdrop/roadmap"
import { CTA } from "@/components/fairdrop/cta"

export default function LandingPage() {
  return (
    <div className="relative">
      <Hero />
      <AuctionCardLarge />
      <Features />
      <HowItWorks />
      <Stats />
      <UseCases />
      <SupportedChains />
      <Roadmap />
      <CTA />
    </div>
  )
}
