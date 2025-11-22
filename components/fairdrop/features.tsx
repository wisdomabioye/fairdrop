import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  TrendingDown,
  Users,
  Shield,
  BarChart3,
  Lock,
  Zap,
  LucideIcon,
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
      "Every participant pays the same final price—no early-bird advantages, just pure equality.",
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
] as const

export function Features() {
  return (
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
  )
}
