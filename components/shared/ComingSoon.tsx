/**
 * ComingSoon Component
 *
 * Elegant component for features/pages that are under development.
 * Provides a beautiful placeholder for upcoming features.
 *
 * @example
 * ```tsx
 * // Simple usage
 * <ComingSoon />
 *
 * // With custom content
 * <ComingSoon
 *   title="Analytics Dashboard"
 *   description="Advanced analytics and insights are coming soon!"
 *   icon={<TrendingUp className="w-16 h-16" />}
 * />
 *
 * // With ETA
 * <ComingSoon
 *   title="Advanced Features"
 *   eta="Q2 2026"
 * />
 * ```
 */

"use client"

import { useState } from "react"
import { Sparkles, Construction, Rocket } from "lucide-react"
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

export interface ComingSoonProps {
  /** Main title */
  title?: string
  /** Description text */
  description?: string
  /** Custom icon component */
  icon?: React.ReactNode
  /** Expected release timeframe */
  eta?: string
  /** Full page or inline */
  fullPage?: boolean
  /** Optional className */
  className?: string
  /** Variant style */
  variant?: "default" | "development" | "launching"
}

export function ComingSoon({
  title = "Coming Soon",
  description = "This feature is currently under development. Stay tuned for updates!",
  icon,
  eta,
  fullPage = true,
  className,
  variant = "default",
}: ComingSoonProps) {
  const [isHovered, setIsHovered] = useState(false)

  const variantConfig = {
    default: {
      badge: { variant: "shimmer" as const, text: "Coming Soon", icon: <Sparkles className="w-3 h-3" /> },
      icon: icon || <Rocket className="w-16 h-16 text-primary" />,
      gradient: "from-violet-500/20 via-purple-500/20 to-indigo-500/20",
    },
    development: {
      badge: { variant: "secondary" as const, text: "In Development", icon: <Construction className="w-3 h-3" /> },
      icon: icon || <Construction className="w-16 h-16 text-orange-500" />,
      gradient: "from-orange-500/20 via-amber-500/20 to-yellow-500/20",
    },
    launching: {
      badge: { variant: "gradient" as const, text: "Launching Soon", icon: <Rocket className="w-3 h-3" /> },
      icon: icon || <Rocket className="w-16 h-16 text-green-500" />,
      gradient: "from-green-500/20 via-emerald-500/20 to-teal-500/20",
    },
  }

  const config = variantConfig[variant]

  return (
    <div
      className={cn(
        "flex items-center justify-center p-4",
        fullPage && "min-h-screen",
        !fullPage && "py-24",
        className
      )}
    >
      <Card
        variant="glass"
        className={cn(
          "max-w-2xl w-full transition-all duration-300",
          isHovered && "scale-[1.02] shadow-2xl"
        )}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <CardHeader className="text-center space-y-6 py-12">
          {/* Badge */}
          <div className="flex justify-center">
            <Badge variant={config.badge.variant} className="px-4 py-1.5">
              {config.badge.icon}
              {config.badge.text}
            </Badge>
          </div>

          {/* Icon with animated glow */}
          <div className="flex justify-center">
            <div className="relative">
              {/* Glow effect */}
              <div
                className={cn(
                  "absolute inset-0 rounded-full blur-3xl opacity-50 animate-pulse",
                  `bg-gradient-to-r ${config.gradient}`
                )}
              />

              {/* Icon container */}
              <div
                className={cn(
                  "relative p-6 rounded-full border-2 border-border bg-background/50 backdrop-blur-sm",
                  "transition-transform duration-300",
                  isHovered && "rotate-12 scale-110"
                )}
              >
                {config.icon}
              </div>
            </div>
          </div>

          {/* Title and Description */}
          <div className="space-y-3">
            <CardTitle className="text-3xl font-bold">{title}</CardTitle>
            <CardDescription className="text-base max-w-md mx-auto">
              {description}
            </CardDescription>
          </div>

          {/* ETA if provided */}
          {eta && (
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <span className="font-medium">Expected:</span>
              <span className="text-foreground font-semibold">{eta}</span>
            </div>
          )}
        </CardHeader>
      </Card>
    </div>
  )
}

/**
 * Inline variant for smaller coming soon states
 */
export function InlineComingSoon({
  message = "Coming Soon",
  className,
}: {
  message?: string
  className?: string
}) {
  return (
    <div className={cn("flex flex-col items-center justify-center gap-4 p-12", className)}>
      <div className="relative">
        <div className="absolute inset-0 rounded-full blur-2xl opacity-30 bg-gradient-to-r from-violet-500 to-purple-500 animate-pulse" />
        <Sparkles className="w-12 h-12 text-primary relative z-10" />
      </div>
      <div className="text-center space-y-2">
        <Badge variant="shimmer" className="mb-2">
          <Sparkles className="w-3 h-3" />
          Coming Soon
        </Badge>
        <p className="text-sm text-muted-foreground max-w-xs">{message}</p>
      </div>
    </div>
  )
}
