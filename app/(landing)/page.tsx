import { Hero } from "@/components/fairdrop/hero"
import { Features } from "@/components/fairdrop/features"
import { HowItWorks } from "@/components/fairdrop/how-it-works"
import { AuctionCardLarge } from "@/components/fairdrop/auction-card-large"
import { Stats } from "@/components/fairdrop/stats"
import { Testimonials } from "@/components/fairdrop/testimonials"
import { CTA } from "@/components/fairdrop/cta"

export default function LandingPage() {
  return (
    <div className="relative">
      <Hero />
      <Features />
      <HowItWorks />
      <AuctionCardLarge />
      <Stats />
      <Testimonials />
      <CTA />
    </div>
  )
}
