"use client"

import { Hero } from "@/components/fairdrop/hero"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  TrendingDown,
  Users,
  Shield,
  Zap,
  BarChart3,
  Lock,
  ArrowRight,
  CheckCircle2,
  Clock,
  DollarSign,
} from "lucide-react"

const features = [
  {
    icon: TrendingDown,
    title: "Descending Price Model",
    description:
      "Prices automatically decrease at preset intervals until demand meets supply, ensuring fair market discovery.",
    gradient: "gradient",
  },
  {
    icon: Users,
    title: "Uniform Clearing Price",
    description:
      "Every participant pays the same final priceno early-bird advantages, just pure equality.",
    gradient: "gradient-soft",
  },
  {
    icon: Shield,
    title: "Smart Contract Powered",
    description:
      "Fully automated and secured by audited smart contracts. Transparent, trustless, and immutable.",
    gradient: "gradient-accent",
  },
  {
    icon: BarChart3,
    title: "Real-time Analytics",
    description:
      "Track price movements, participation rates, and market dynamics with live data visualization.",
    gradient: "gradient-aurora",
  },
  {
    icon: Lock,
    title: "Dynamic Floor Price",
    description:
      "Prevents undervaluation while maintaining market flexibility through adaptive pricing algorithms.",
    gradient: "gradient-ocean",
  },
  {
    icon: Zap,
    title: "Cross-Chain Compatible",
    description:
      "Launch auctions on Ethereum, Polygon, Base, and more. Multi-chain support out of the box.",
    gradient: "gradient-soft",
  },
]

const howItWorks = [
  {
    step: "01",
    title: "Set Starting Price",
    description: "Define your initial price point and the rate of decrease per block or time interval.",
    icon: DollarSign,
  },
  {
    step: "02",
    title: "Price Descends Automatically",
    description: "Smart contracts reduce the price incrementally until buyers begin participating.",
    icon: TrendingDown,
  },
  {
    step: "03",
    title: "Market Finds Equilibrium",
    description: "When total demand equals supply, the auction clears at the final market price.",
    icon: BarChart3,
  },
  {
    step: "04",
    title: "Everyone Pays Same Price",
    description: "All participants pay the uniform clearing price, ensuring fairness for everyone.",
    icon: CheckCircle2,
  },
]

const stats = [
  { value: "$50M+", label: "Total Volume Traded", change: "+125%" },
  { value: "10K+", label: "Successful Auctions", change: "+89%" },
  { value: "45K+", label: "Active Participants", change: "+156%" },
  { value: "99.9%", label: "Uptime Guarantee", change: "100%" },
]

const testimonials = [
  {
    quote:
      "Fairdrop revolutionized how we launch tokens. The uniform pricing ensures everyone gets a fair deal.",
    author: "Alex Chen",
    role: "Founder, DeFi Protocol",
    avatar: "AC",
  },
  {
    quote:
      "The transparency and automation of Dutch auctions on Fairdrop gave our community confidence.",
    author: "Sarah Martinez",
    role: "Project Lead, NFT Marketplace",
    avatar: "SM",
  },
  {
    quote:
      "Finally, a platform that eliminates the chaos of traditional token sales. Pure market discovery.",
    author: "David Kim",
    role: "DAO Treasury Manager",
    avatar: "DK",
  },
]

export default function LandingPage() {
  const auctionProgress = 67

  return (
    <div className="relative">
      {/* Hero Section */}
      <Hero />

      {/* Features Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <Badge variant="gradient-soft" className="mb-4">
              Core Features
            </Badge>
            <h2 className="text-4xl font-bold mb-4">
              Why Choose <span className="text-gradient-primary">Fairdrop?</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Built for fairness, powered by blockchain. Experience the next generation of
              decentralized auctions.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <Card
                key={index}
                variant="glass"
                className="group hover:scale-[1.02] transition-transform duration-300"
              >
                <CardHeader>
                  <div className={`w-12 h-12 rounded-lg bg-${feature.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <feature.icon className="size-6 text-white" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <Badge variant="gradient-accent" className="mb-4">
              Simple Process
            </Badge>
            <h2 className="text-4xl font-bold mb-4">
              How <span className="text-gradient-accent">Fairdrop</span> Works
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Four simple steps to transparent, fair price discovery through Dutch auctions.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {howItWorks.map((item, index) => (
              <div key={index} className="relative">
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="relative">
                    <div className="w-16 h-16 rounded-full bg-gradient-primary flex items-center justify-center shadow-lg glow-primary">
                      <item.icon className="size-8 text-white" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-gradient-accent flex items-center justify-center text-xs font-bold">
                      {item.step}
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold">{item.title}</h3>
                  <p className="text-muted-foreground text-sm">{item.description}</p>
                </div>
                {index < howItWorks.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-primary/50 to-transparent" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Live Auction Demo Section */}
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
                    1,000,000 tokens " Current Price: $0.14
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

      {/* Stats Section */}
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
                  <Badge variant="gradient-soft" className="text-xs">
                    {stat.change} this month
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <Badge variant="glass" className="mb-4">
              Testimonials
            </Badge>
            <h2 className="text-4xl font-bold mb-4">
              Trusted by <span className="text-gradient-primary">Innovators</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              See what builders and communities are saying about Fairdrop.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} variant="glass" className="hover:scale-105 transition-transform">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-primary flex items-center justify-center text-white font-bold shrink-0">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <div className="font-semibold">{testimonial.author}</div>
                      <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                    </div>
                  </div>
                  <p className="text-muted-foreground italic">"{testimonial.quote}"</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-animated opacity-10" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-5xl font-bold mb-6">
            Ready to Launch Your <span className="text-gradient-aurora">Fair Auction?</span>
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of projects using Fairdrop for transparent, automated price discovery.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="gradient-aurora" size="xl" className="group">
              Create Your Auction
              <ArrowRight className="size-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button variant="outline" size="xl">
              Read Documentation
            </Button>
          </div>
          <div className="mt-12 flex justify-center gap-8 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="size-5 text-primary" />
              No Setup Fees
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="size-5 text-primary" />
              Audited Contracts
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="size-5 text-primary" />
              24/7 Support
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
