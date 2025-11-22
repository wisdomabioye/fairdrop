import { Hero } from "@/components/fairdrop/hero"
import { Features } from "@/components/fairdrop/features"
import { HowItWorks } from "@/components/fairdrop/how-it-works"
import { AuctionDemo } from "@/components/fairdrop/auction-demo"
import { Stats } from "@/components/fairdrop/stats"
import { Testimonials } from "@/components/fairdrop/testimonials"
import { CTA } from "@/components/fairdrop/cta"

export default function LandingPage() {
  return (
    <div className="relative">
      <Hero />
      <Features />
      <HowItWorks />
      <AuctionDemo />
      <Stats />
      <Testimonials />
      <CTA />
    </div>
  )
}
