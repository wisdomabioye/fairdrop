"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2, Rocket } from "lucide-react"

const chains = [
  {
    name: "Polygon",
    description: "Lightning-fast EVM-compatible chain with low fees",
    logo: "https://cryptologos.cc/logos/polygon-matic-logo.svg",
    status: "live",
    features: [
      "Sub-second finality",
      "Low gas costs",
      "Full EVM compatibility",
      "Robust ecosystem"
    ],
    gradient: "from-purple-600 to-indigo-600",
    testnet: "Polygon Amoy"
  },
  {
    name: "Linera",
    description: "Next-gen microchain architecture for infinite scalability",
    logo: "https://avatars.githubusercontent.com/u/107513858?s=48&v=4",
    status: "development",
    features: [
      "Microchain architecture",
      "Linear scalability",
      "Predictable performance",
      "Future of Web3"
    ],
    gradient: "from-cyan-500 to-blue-600",
    eta: "Q2 2026"
  },
  {
    name: "More Chains",
    description: "Ethereum, Base, Arbitrum, Optimism, and other EVM chains coming soon",
    status: "planned",
    features: [
      "Ethereum mainnet",
      "Base (Coinbase L2)",
      "Arbitrum & Optimism",
      "Multi-chain expansion"
    ],
    gradient: "from-slate-600 to-gray-700",
    eta: "Q1 2026"
  }
]

export function SupportedChains() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <Badge variant="glass" className="mb-4">
            Multi-Chain Support
          </Badge>
          <h2 className="text-4xl font-bold mb-4">
            Deploy Anywhere, <span className="text-gradient-primary">Trade Everywhere</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Fairdrop is built for a multi-chain future. Launch your auctions on the chains that matter to your community.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {chains.map((chain, index) => (
            <Card
              key={index}
              variant="glass"
              className="hover:scale-105 transition-all group overflow-hidden relative"
            >
              {/* Gradient overlay */}
              <div className={`absolute inset-0 bg-gradient-to-br ${chain.gradient} opacity-0 group-hover:opacity-5 transition-opacity`} />

              <CardContent className="pt-8 relative">
                {/* Status Badge */}
                <div className="absolute top-4 right-4">
                  {chain.status === "live" && (
                    <Badge variant="gradient-soft" className="text-xs">
                      <CheckCircle2 className="size-3 mr-1" />
                      Live
                    </Badge>
                  )}
                  {chain.status === "development" && (
                    <Badge variant="outline" className="text-xs border-cyan-500/50 text-cyan-500">
                      <Rocket className="size-3 mr-1" />
                      In Development
                    </Badge>
                  )}
                  {chain.status === "planned" && (
                    <Badge variant="outline" className="text-xs">
                      Coming Soon
                    </Badge>
                  )}
                </div>

                {/* Chain Logo/Icon */}
                <div className="mb-6">
                  {chain.logo ? (
                    <div className="w-16 h-16 rounded-xl bg-muted/50 flex items-center justify-center p-3 group-hover:scale-110 transition-transform">
                      <img src={chain.logo} alt={chain.name} className="w-full h-full object-contain" />
                    </div>
                  ) : (
                    <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${chain.gradient} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                      <span className="text-2xl font-bold text-white">{chain.name[0]}</span>
                    </div>
                  )}
                </div>

                {/* Chain Info */}
                <div className="mb-6">
                  <h3 className="text-2xl font-bold mb-2">{chain.name}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{chain.description}</p>
                  {chain.testnet && (
                    <p className="text-xs text-muted-foreground">
                      <span className="text-primary font-medium">Testnet:</span> {chain.testnet}
                    </p>
                  )}
                  {chain.eta && (
                    <p className="text-xs text-muted-foreground">
                      <span className="text-primary font-medium">ETA:</span> {chain.eta}
                    </p>
                  )}
                </div>

                {/* Features */}
                <ul className="space-y-2">
                  {chain.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm">
                      <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-br ${chain.gradient} mt-1.5 shrink-0`} />
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Additional Info */}
        <div className="mt-12 text-center">
          <p className="text-sm text-muted-foreground">
            Want to see Fairdrop on your favorite chain?{" "}
            <a href="/contact" className="text-primary hover:underline font-medium">
              Let us know
            </a>
          </p>
        </div>
      </div>
    </section>
  )
}
