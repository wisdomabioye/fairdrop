import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const stats = [
  { value: "$50M+", label: "Total Volume Traded", change: "+125%" },
  { value: "10K+", label: "Successful Auctions", change: "+89%" },
  { value: "45K+", label: "Active Participants", change: "+156%" },
  { value: "99.9%", label: "Uptime Guarantee", change: "100%" },
]

export function Stats() {
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
                <Badge variant="gradient-soft" className="text-xs">
                  {stat.change} this month
                </Badge>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
