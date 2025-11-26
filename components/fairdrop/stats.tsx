"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useAuctions } from "@/hooks/useAuctions"
import { SUPPORTED_CHAIN } from "@/types/blockchain"

export function Stats() {
  // Fetch total auctions from blockchain
  const { totalAuctions, isLoading } = useAuctions(SUPPORTED_CHAIN.POLYGON_AMOY, {
    pageSize: 1, // We only need the count, not the actual auctions
    autoLoad: true,
  })

  // Format total auctions for display
  const formatAuctionCount = (count: bigint | null) => {
    if (count === null) return "..."
    const num = Number(count)
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K+`
    return num.toString()
  }

  const stats = [
    {
      value: formatAuctionCount(totalAuctions),
      label: "Total Auctions",
      change: isLoading ? "Loading..." : "Live Data",
      isLive: true
    },
    {
      value: "0K+",
      label: "Active Participants",
      change: "Growing Daily",
      isLive: false
    },
    {
      value: "$0M+",
      label: "Total Volume Traded",
      change: "All Chains",
      isLive: false
    },
    {
      value: "99.9%",
      label: "Uptime Guarantee",
      change: "24/7 Available",
      isLive: false
    },
  ]

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <Card
              key={index}
              variant="elevated"
              className="text-center hover:scale-105 transition-transform"
            >
              <CardContent className="pt-8 pb-6">
                <div className="text-4xl font-bold text-gradient-primary mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground mb-3">{stat.label}</div>
                <Badge
                  variant={stat.isLive ? "gradient-soft" : "glass"}
                  className="text-xs"
                >
                  {stat.isLive && <span className="inline-block w-1.5 h-1.5 rounded-full bg-green-500 mr-1.5 animate-pulse" />}
                  {stat.change}
                </Badge>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
