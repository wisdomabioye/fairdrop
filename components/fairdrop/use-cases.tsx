"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

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

export function Testimonials() {
  return (
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
  )
}
