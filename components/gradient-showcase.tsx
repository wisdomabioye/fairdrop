"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

export function GradientShowcase() {
  const [progress, setProgress] = React.useState(65)

  return (
    <div className="min-h-screen p-8 space-y-12">
      {/* Hero Section with Animated Gradient */}
      <section className="bg-gradient-animated rounded-2xl p-12 text-white text-center">
        <h1 className="text-5xl font-bold mb-4">Fairdrop</h1>
        <p className="text-xl opacity-90 mb-8">
          Decentralized, Transparent, Market-Driven Auctions
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <Button size="xl" variant="glass">
            Start Bidding
          </Button>
          <Button size="xl" variant="outline" className="border-white/30 text-white hover:bg-white/10">
            Learn More
          </Button>
        </div>
      </section>

      {/* Gradient Buttons */}
      <section>
        <h2 className="text-3xl font-bold mb-6 text-gradient-primary">
          Gradient Buttons
        </h2>
        <div className="flex flex-wrap gap-4">
          <Button variant="gradient">Gradient Primary</Button>
          <Button variant="gradient-soft">Gradient Soft</Button>
          <Button variant="gradient-accent">Gradient Accent</Button>
          <Button variant="gradient-aurora">Aurora Effect</Button>
          <Button variant="gradient-ocean">Ocean Wave</Button>
          <Button variant="glass">Glass Button</Button>
          <Button variant="shimmer">Shimmer Effect</Button>
        </div>
        <div className="flex flex-wrap gap-4 mt-4">
          <Button variant="gradient" size="sm">Small</Button>
          <Button variant="gradient-soft" size="default">Default</Button>
          <Button variant="gradient-accent" size="lg">Large</Button>
          <Button variant="gradient-aurora" size="xl">Extra Large</Button>
        </div>
      </section>

      {/* Progress Bars */}
      <section>
        <h2 className="text-3xl font-bold mb-6 text-gradient-accent">
          Progress Bars
        </h2>
        <div className="space-y-6 max-w-2xl">
          <div>
            <p className="text-sm mb-2 text-muted-foreground">Default Progress</p>
            <Progress value={progress} showValue />
          </div>
          <div>
            <p className="text-sm mb-2 text-muted-foreground">Gradient Primary</p>
            <Progress value={progress} indicatorVariant="gradient" showValue />
          </div>
          <div>
            <p className="text-sm mb-2 text-muted-foreground">Gradient Aurora</p>
            <Progress value={progress} indicatorVariant="gradient-aurora" showValue size="lg" />
          </div>
          <div>
            <p className="text-sm mb-2 text-muted-foreground">Animated Gradient</p>
            <Progress value={progress} indicatorVariant="animated" showValue size="lg" />
          </div>
          <div>
            <p className="text-sm mb-2 text-muted-foreground">Shimmer Effect</p>
            <Progress value={progress} indicatorVariant="shimmer" showValue />
          </div>
        </div>
      </section>

      {/* Cards */}
      <section>
        <h2 className="text-3xl font-bold mb-6 text-gradient-primary">
          Card Variants
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Default Card</CardTitle>
              <CardDescription>Standard card styling</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Clean and simple card design for displaying content.
              </p>
            </CardContent>
          </Card>

          <Card variant="glass">
            <CardHeader>
              <CardTitle>Glass Card</CardTitle>
              <CardDescription>Glassmorphism effect</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Beautiful frosted glass effect with backdrop blur.
              </p>
            </CardContent>
          </Card>

          <Card variant="gradient">
            <CardHeader>
              <CardTitle>Gradient Card</CardTitle>
              <CardDescription>Subtle gradient background</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Elegant gradient surface with premium feel.
              </p>
            </CardContent>
          </Card>

          <Card variant="elevated">
            <CardHeader>
              <CardTitle>Elevated Card</CardTitle>
              <CardDescription>Enhanced shadow on hover</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Card with interactive shadow elevation.
              </p>
            </CardContent>
          </Card>

          <Card variant="shimmer">
            <CardHeader>
              <CardTitle>Shimmer Card</CardTitle>
              <CardDescription>Animated shimmer effect</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Eye-catching shimmer animation overlay.
              </p>
            </CardContent>
          </Card>

          <Card variant="outline">
            <CardHeader>
              <CardTitle>Outline Card</CardTitle>
              <CardDescription>Bordered design</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Minimalist outline-based card style.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Badges */}
      <section>
        <h2 className="text-3xl font-bold mb-6 text-gradient-accent">
          Badge Variants
        </h2>
        <div className="flex flex-wrap gap-3">
          <Badge>Default</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="outline">Outline</Badge>
          <Badge variant="gradient">Gradient</Badge>
          <Badge variant="gradient-soft">Gradient Soft</Badge>
          <Badge variant="gradient-accent">Gradient Accent</Badge>
          <Badge variant="glass">Glass</Badge>
          <Badge variant="shimmer">Shimmer</Badge>
          <Badge variant="destructive">Destructive</Badge>
        </div>
      </section>

      {/* Gradient Backgrounds */}
      <section>
        <h2 className="text-3xl font-bold mb-6 text-gradient-primary">
          Gradient Backgrounds
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div className="bg-gradient-primary rounded-xl p-8 text-white text-center">
            <p className="font-semibold">Primary</p>
          </div>
          <div className="bg-gradient-secondary rounded-xl p-8 text-white text-center">
            <p className="font-semibold">Secondary</p>
          </div>
          <div className="bg-gradient-accent rounded-xl p-8 text-primary text-center">
            <p className="font-semibold">Accent</p>
          </div>
          <div className="bg-gradient-aurora rounded-xl p-8 text-white text-center">
            <p className="font-semibold">Aurora</p>
          </div>
          <div className="bg-gradient-ocean rounded-xl p-8 text-white text-center">
            <p className="font-semibold">Ocean</p>
          </div>
          <div className="bg-gradient-animated rounded-xl p-8 text-white text-center">
            <p className="font-semibold">Animated</p>
          </div>
        </div>
      </section>

      {/* Glow Effects */}
      <section className="pb-12">
        <h2 className="text-3xl font-bold mb-6 text-gradient-accent">
          Glow Effects
        </h2>
        <div className="flex flex-wrap gap-8 justify-center bg-gradient-to-b from-background to-muted/20 rounded-2xl p-12">
          <Card className="glow-primary max-w-xs">
            <CardHeader>
              <CardTitle>Primary Glow</CardTitle>
              <CardDescription>Subtle glow effect</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="gradient" className="w-full">Action Button</Button>
            </CardContent>
          </Card>

          <Card className="glow-accent max-w-xs">
            <CardHeader>
              <CardTitle>Accent Glow</CardTitle>
              <CardDescription>Gold accent glow</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="gradient-accent" className="w-full">Action Button</Button>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}
