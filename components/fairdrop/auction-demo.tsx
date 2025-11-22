"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Clock, ArrowRight } from "lucide-react"

export function AuctionDemo() {
  const auctionProgress = 67

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-surface">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <Badge variant="shimmer" className="mb-4">
            <Clock className="size-3" />
            Live Demo
          </Badge>
          <h2 className="text-4xl font-bold mb-4">
            See a <span className="text-gradient-primary">Live Auction</span> in Action
          </h2>
        </div>

        <Card variant="glass" className="overflow-hidden">
          <CardHeader className="border-b border-border/50">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-2xl">Token Sale Auction</CardTitle>
                <CardDescription className="text-base mt-2">
                  1,000,000 tokens • Current Price: $0.14
                </CardDescription>
              </div>
              <Badge variant="gradient" className="text-sm px-4 py-2">
                Active
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="p-8">
            <div className="space-y-8">
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center p-4 rounded-lg bg-muted/50">
                  <div className="text-3xl font-bold text-gradient-primary mb-2">$0.14</div>
                  <div className="text-sm text-muted-foreground">Current Price</div>
                </div>
                <div className="text-center p-4 rounded-lg bg-muted/50">
                  <div className="text-3xl font-bold text-gradient-accent mb-2">670K</div>
                  <div className="text-sm text-muted-foreground">Tokens Sold</div>
                </div>
                <div className="text-center p-4 rounded-lg bg-muted/50">
                  <div className="text-3xl font-bold text-gradient-secondary mb-2">2.5h</div>
                  <div className="text-sm text-muted-foreground">Time Remaining</div>
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-3">
                  <span className="text-sm font-medium">Auction Progress</span>
                  <span className="text-sm text-muted-foreground">{auctionProgress}% Complete</span>
                </div>
                <Progress value={auctionProgress} indicatorVariant="gradient-aurora" size="lg" />
              </div>

              <div className="flex gap-4">
                <Button variant="gradient-aurora" className="flex-1" size="lg">
                  Place Bid
                  <ArrowRight className="size-5" />
                </Button>
                <Button variant="outline" size="lg">
                  View Details
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
