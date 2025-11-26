"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2, Circle, Sparkles, Network, Brain, Globe } from "lucide-react"

const roadmapPhases = [
  {
    phase: "Phase 1: MVP Launch",
    timeline: "Q1 2026",
    status: "in-progress",
    icon: Network,
    milestones: [
      "Smart contract deployment on Polygon",
      "Front-end launch with Web3 wallet integration",
      "First live auctions for tokens and NFTs",
      "Multi-chain support (Polygon, Ethereum testnets)",
      "Auction analytics dashboard",
      "Factory pattern for unlimited auctions"
    ],
    gradient: "from-green-500 to-emerald-600"
  },
  {
    phase: "Phase 2: Governance & Expansion",
    timeline: "Q2 2026",
    status: "planned",
    icon: Globe,
    milestones: [
      "DAO structure for protocol upgrades",
      "Community voting on platform parameters",
      "Linera microchain integration",
      "Additional EVM chains (Base, Arbitrum, Optimism)",
      "Real World Asset (RWA) auction templates",
      "KYC/AML compliance framework"
    ],
    gradient: "from-blue-500 to-indigo-600"
  },
  {
    phase: "Phase 3: AI & Analytics",
    timeline: "Q3 2026",
    status: "planned",
    icon: Brain,
    milestones: [
      "Smart Pricing Oracle for creators",
      "Demand prediction engine",
      "Personalized price alerts for bidders",
      "Bid strategy advisor AI",
      "Clearing price prediction models",
      "Fraud detection and sentiment analysis"
    ],
    gradient: "from-purple-500 to-pink-600"
  },
  {
    phase: "Phase 4: Global Adoption",
    timeline: "Q4 2026 & Beyond",
    status: "planned",
    icon: Sparkles,
    milestones: [
      "Fiat on/off ramp integration",
      "White-label solutions for enterprises",
      "Cross-chain bridge aggregation",
      "Mobile app with AI chat interface",
      "Advanced market microstructure analysis",
      "Institutional-grade compliance tools"
    ],
    gradient: "from-orange-500 to-red-600"
  }
]

export function Roadmap() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <Badge variant="glass" className="mb-4">
            Roadmap
          </Badge>
          <h2 className="text-4xl font-bold mb-4">
            Building the <span className="text-gradient-primary">Future</span> of Fair Auctions
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Our journey from MVP to the universal standard for transparent price discovery.
          </p>
        </div>

        <div className="relative">
          {/* Vertical timeline line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-primary/50 to-transparent hidden md:block" />

          <div className="space-y-8">
            {roadmapPhases.map((phase, index) => {
              const Icon = phase.icon
              const isActive = phase.status === "in-progress"
              const isCompleted = phase.status === "completed"

              return (
                <div key={index} className="relative">
                  {/* Timeline dot */}
                  <div className="absolute left-8 top-8 hidden md:block -translate-x-1/2 z-10">
                    <div className={`w-4 h-4 rounded-full ${isActive ? 'bg-primary animate-pulse' : isCompleted ? 'bg-green-500' : 'bg-muted-foreground/30'} border-4 border-background`} />
                  </div>

                  <div className="md:ml-20">
                    <Card variant={isActive ? "elevated" : "glass"} className="group hover:scale-[1.02] transition-all overflow-hidden relative">
                      {/* Gradient overlay */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${phase.gradient} opacity-0 group-hover:opacity-5 transition-opacity`} />

                      <CardContent className="pt-6 relative">
                        <div className="flex flex-col md:flex-row md:items-start gap-6">
                          {/* Icon */}
                          <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${phase.gradient} flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform`}>
                            <Icon className="size-7 text-white" />
                          </div>

                          {/* Content */}
                          <div className="flex-1">
                            <div className="flex flex-wrap items-center gap-3 mb-3">
                              <h3 className="text-xl font-bold">{phase.phase}</h3>
                              <Badge variant="outline" className="text-xs">
                                {phase.timeline}
                              </Badge>
                              {isActive && (
                                <Badge variant="gradient-soft" className="text-xs">
                                  <Circle className="size-2 mr-1 fill-current animate-pulse" />
                                  In Progress
                                </Badge>
                              )}
                              {isCompleted && (
                                <Badge variant="gradient-soft" className="text-xs">
                                  <CheckCircle2 className="size-3 mr-1" />
                                  Completed
                                </Badge>
                              )}
                            </div>

                            {/* Milestones */}
                            <div className="grid sm:grid-cols-2 gap-2">
                              {phase.milestones.map((milestone, idx) => (
                                <div key={idx} className="flex items-start gap-2">
                                  <CheckCircle2 className="size-4 text-primary mt-0.5 shrink-0" />
                                  <span className="text-sm text-muted-foreground">{milestone}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Footer note */}
        <div className="mt-12 text-center">
          <p className="text-sm text-muted-foreground">
            Timelines are subject to change based on development progress and community feedback.
          </p>
        </div>
      </div>
    </section>
  )
}
