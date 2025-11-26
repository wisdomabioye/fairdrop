/**
 * PageLoader Component
 *
 * Beautiful full-page loading state with animated spinner and optional message.
 * Features elegant animations and can be used for any page loading scenario.
 *
 * @example
 * ```tsx
 * // Simple usage
 * <PageLoader />
 *
 * // With custom message
 * <PageLoader message="Loading auction data..." />
 *
 * // Without message
 * <PageLoader showMessage={false} />
 * ```
 */

"use client"

import { Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"

export interface PageLoaderProps {
  /** Optional loading message */
  message?: string
  /** Show/hide the loading message */
  showMessage?: boolean
  /** Optional className for container */
  className?: string
  /** Size variant */
  size?: "sm" | "md" | "lg"
  /** Full screen or inline */
  fullScreen?: boolean
}

export function PageLoader({
  message = "Loading...",
  showMessage = true,
  className,
  size = "lg",
  fullScreen = true,
}: PageLoaderProps) {
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-12 h-12",
    lg: "w-16 h-16",
  }

  const textSizeClasses = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg",
  }

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-6",
        fullScreen && "min-h-screen w-full",
        !fullScreen && "py-24",
        className
      )}
    >
      {/* Animated spinner with gradient */}
      <div className="relative">
        {/* Outer glow effect */}
        <div
          className={cn(
            "absolute inset-0 rounded-full blur-xl opacity-50 animate-pulse",
            "bg-gradient-to-r from-violet-500 via-purple-500 to-indigo-500"
          )}
        />

        {/* Spinning loader */}
        <Loader2
          className={cn(
            sizeClasses[size],
            "animate-spin text-gradient-primary relative z-10"
          )}
          style={{
            animation: "spin 1s linear infinite",
          }}
        />

        {/* Inner pulse circle */}
        <div
          className={cn(
            "absolute inset-0 rounded-full border-2 border-primary/20 animate-ping",
            sizeClasses[size]
          )}
        />
      </div>

      {/* Loading message */}
      {showMessage && (
        <div className="text-center space-y-2 animate-fade-in">
          <p
            className={cn(
              "font-medium text-foreground",
              textSizeClasses[size]
            )}
          >
            {message}
          </p>
          <div className="flex items-center justify-center gap-1">
            <span
              className="w-2 h-2 rounded-full bg-primary animate-bounce"
              style={{ animationDelay: "0ms" }}
            />
            <span
              className="w-2 h-2 rounded-full bg-primary animate-bounce"
              style={{ animationDelay: "150ms" }}
            />
            <span
              className="w-2 h-2 rounded-full bg-primary animate-bounce"
              style={{ animationDelay: "300ms" }}
            />
          </div>
        </div>
      )}
    </div>
  )
}

/**
 * Inline variant for smaller loading states
 */
export function InlineLoader({
  message = "Loading...",
  className,
}: {
  message?: string
  className?: string
}) {
  return (
    <div className={cn("flex items-center justify-center gap-3 p-8", className)}>
      <Loader2 className="w-5 h-5 animate-spin text-primary" />
      <span className="text-sm text-muted-foreground">{message}</span>
    </div>
  )
}
