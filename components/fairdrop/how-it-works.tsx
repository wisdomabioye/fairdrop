import { Badge } from "@/components/ui/badge"
import {
  TrendingDown,
  BarChart3,
  CheckCircle2,
  DollarSign,
  LucideIcon,
} from "lucide-react"

const steps = [
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

export function HowItWorks() {
  return (
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
          {steps.map((item, index) => (
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
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-8 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-primary/50 to-transparent" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
