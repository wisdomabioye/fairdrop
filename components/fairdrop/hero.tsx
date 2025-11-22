"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, TrendingUp, Shield, Zap } from "lucide-react"

export function Hero() {
  const [isVisible, setIsVisible] = React.useState(false)

  React.useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-animated opacity-10 dark:opacity-20" />

      {/* Gradient Orbs */}
      <div className="absolute top-1/4 -left-48 w-96 h-96 bg-gradient-primary rounded-full blur-3xl opacity-20 animate-pulse" />
      <div className="absolute bottom-1/4 -right-48 w-96 h-96 bg-gradient-accent rounded-full blur-3xl opacity-20 animate-pulse delay-1000" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center space-y-8">
          {/* Badge */}
          <div
            className={`flex justify-center transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
            }`}
          >
            <Badge variant="gradient-soft" className="text-sm px-4 py-1.5 gap-2">
              <Zap className="size-4" />
              Decentralized Auctions, Powered by Blockchain
            </Badge>
          </div>

          {/* Main Heading */}
          <h1
            className={`text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight transition-all duration-1000 delay-200 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <span className="block">Fair Price Discovery</span>
            <span className="block text-gradient-primary mt-2">
              Through Market Consensus
            </span>
          </h1>

          {/* Description */}
          <p
            className={`text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed transition-all duration-1000 delay-400 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            Revolutionary Dutch-style auctions where everyone pays the same fair price.
            Transparent, automated, and powered by smart contracts. No early-bird advantages,
            just pure market-driven value discovery.
          </p>

          {/* Feature Stats */}
          <div
            className={`flex flex-wrap justify-center gap-8 py-6 transition-all duration-1000 delay-600 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <div className="flex items-center gap-2 text-sm sm:text-base">
              <div className="w-2 h-2 bg-gradient-primary rounded-full animate-pulse" />
              <span className="text-muted-foreground">Uniform Clearing Price</span>
            </div>
            <div className="flex items-center gap-2 text-sm sm:text-base">
              <div className="w-2 h-2 bg-gradient-accent rounded-full animate-pulse delay-300" />
              <span className="text-muted-foreground">100% Transparent</span>
            </div>
            <div className="flex items-center gap-2 text-sm sm:text-base">
              <div className="w-2 h-2 bg-gradient-secondary rounded-full animate-pulse delay-700" />
              <span className="text-muted-foreground">Automated & Secure</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div
            className={`flex flex-col sm:flex-row gap-4 justify-center items-center transition-all duration-1000 delay-800 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <Button variant="gradient-aurora" size="xl" className="group">
              Launch Auction
              <ArrowRight className="size-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button variant="outline-inverse" size="xl" className="glass">
              Explore Auctions
            </Button>
          </div>

          {/* Trust Indicators */}
          <div
            className={`flex flex-wrap justify-center gap-6 pt-12 transition-all duration-1000 delay-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <div className="flex items-center gap-3 glass-card px-6 py-3 rounded-full">
              <Shield className="size-5 text-primary" />
              <span className="text-sm font-medium">Audited Smart Contracts</span>
            </div>
            <div className="flex items-center gap-3 glass-card px-6 py-3 rounded-full">
              <TrendingUp className="size-5 text-primary" />
              <span className="text-sm font-medium">Real-time Price Discovery</span>
            </div>
          </div>
        </div>

        {/* Floating Cards Animation */}
        <div className="relative mt-20 hidden lg:block">
          <div className="grid grid-cols-3 gap-6 max-w-4xl mx-auto">
            {/* Card 1 */}
            <div className="glass-card p-6 rounded-xl animate-float">
              <div className="text-3xl font-bold text-gradient-primary mb-2">$0.12</div>
              <div className="text-sm text-muted-foreground">Clearing Price</div>
              <div className="mt-4 h-1 bg-gradient-primary rounded-full w-3/4" />
            </div>

            {/* Card 2 */}
            <div className="glass-card p-6 rounded-xl animate-float delay-300">
              <div className="text-3xl font-bold text-gradient-accent mb-2">1M+</div>
              <div className="text-sm text-muted-foreground">Tokens Sold</div>
              <div className="mt-4 h-1 bg-gradient-accent rounded-full w-2/3" />
            </div>

            {/* Card 3 */}
            <div className="glass-card p-6 rounded-xl animate-float delay-700">
              <div className="text-3xl font-bold text-gradient-secondary mb-2">100%</div>
              <div className="text-sm text-muted-foreground">Fair & Equal</div>
              <div className="mt-4 h-1 bg-gradient-secondary rounded-full w-full" />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  )
}
