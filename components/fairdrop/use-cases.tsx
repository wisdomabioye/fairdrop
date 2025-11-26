"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Coins, Image, Users, Building2, ShieldCheck, Sparkles, TrendingUp } from "lucide-react"

const useCases = [
  {
    icon: Coins,
    title: "Token Projects",
    description: "Perfect for token launches and ICOs with fair price discovery",
    features: [
      "No gas wars or front-running",
      "Uniform clearing price for all participants",
      "Automatic refunds for early bidders",
      "MEV-resistant descending price model"
    ],
    gradient: "from-purple-500 to-pink-500"
  },
  {
    icon: Image,
    title: "NFT Creators",
    description: "Launch NFT collections with transparent, market-driven pricing",
    features: [
      "Eliminate price guesswork",
      "Fair distribution to community",
      "Whitelist support for exclusive drops",
      "Pro-rata allocation for oversubscription"
    ],
    gradient: "from-blue-500 to-cyan-500"
  },
  {
    icon: Users,
    title: "DAOs & Communities",
    description: "Distribute tokens fairly to your community with built-in governance",
    features: [
      "Allocation limits prevent whale dominance",
      "Transparent on-chain process",
      "Dynamic floor price protection",
      "Real-time price discovery"
    ],
    gradient: "from-orange-500 to-red-500"
  },
  {
    icon: Building2,
    title: "Real World Assets",
    description: "Tokenize and auction real-world assets with regulatory compliance",
    features: [
      "Fractional real estate ownership",
      "Commodities and carbon credits trading",
      "KYC/AML compliance integration",
      "Legal wrapper for asset-backed tokens"
    ],
    gradient: "from-emerald-500 to-teal-500"
  },
]

const additionalFeatures = [
  { icon: ShieldCheck, label: "Audited & Secure" },
  { icon: Sparkles, label: "AI-Powered Analytics" },
  { icon: TrendingUp, label: "Multi-Chain Support" },
]

export function UseCases() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <Badge variant="glass" className="mb-4">
            Built For
          </Badge>
          <h2 className="text-4xl font-bold mb-4">
            Designed for <span className="text-gradient-primary">Everyone</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            From token launches to real-world assets, Fairdrop provides fair price discovery for all use cases.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {useCases.map((useCase, index) => {
            const Icon = useCase.icon
            return (
              <Card key={index} variant="glass" className="hover:scale-105 transition-all group">
                <CardContent className="pt-6">
                  <div className="mb-6">
                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${useCase.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                      <Icon className="size-7 text-white" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">{useCase.title}</h3>
                    <p className="text-sm text-muted-foreground">{useCase.description}</p>
                  </div>
                  <ul className="space-y-2">
                    {useCase.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm">
                        <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-br ${useCase.gradient} mt-1.5 shrink-0`} />
                        <span className="text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Additional Features */}
        <div className="flex flex-wrap justify-center gap-4">
          {additionalFeatures.map((feature, index) => {
            const Icon = feature.icon
            return (
              <Badge key={index} variant="gradient-soft" className="px-4 py-2 text-sm">
                <Icon className="size-4 mr-2" />
                {feature.label}
              </Badge>
            )
          })}
        </div>
      </div>
    </section>
  )
}
