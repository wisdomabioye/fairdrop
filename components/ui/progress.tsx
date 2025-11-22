import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils/index"

const progressVariants = cva(
  "relative h-2 w-full overflow-hidden rounded-full",
  {
    variants: {
      variant: {
        default: "bg-muted",
        glass: "glass",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

const progressIndicatorVariants = cva(
  "h-full w-full flex-1 transition-all duration-500 ease-out",
  {
    variants: {
      variant: {
        default: "bg-primary",
        gradient: "bg-gradient-primary",
        "gradient-soft": "bg-gradient-primary-soft",
        "gradient-accent": "bg-gradient-accent",
        "gradient-aurora": "bg-gradient-aurora",
        "gradient-ocean": "bg-gradient-ocean",
        secondary: "bg-secondary",
        shimmer: "bg-gradient-primary shimmer",
        animated: "bg-gradient-animated",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface ProgressProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof progressVariants> {
  value?: number
  max?: number
  indicatorVariant?: VariantProps<typeof progressIndicatorVariants>["variant"]
  showValue?: boolean
  size?: "sm" | "md" | "lg" | "xl"
}

function Progress({
  className,
  value = 0,
  max = 100,
  variant,
  indicatorVariant = "default",
  showValue = false,
  size = "md",
  ...props
}: ProgressProps) {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100)

  const sizeClasses = {
    sm: "h-1",
    md: "h-2",
    lg: "h-3",
    xl: "h-4",
  }

  return (
    <div className="w-full">
      <div
        data-slot="progress"
        className={cn(progressVariants({ variant }), sizeClasses[size], className)}
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={max}
        aria-valuenow={value}
        {...props}
      >
        <div
          className={cn(progressIndicatorVariants({ variant: indicatorVariant }))}
          style={{ transform: `translateX(-${100 - percentage}%)` }}
        />
      </div>
      {showValue && (
        <div className="mt-2 text-right text-xs text-muted-foreground">
          {Math.round(percentage)}%
        </div>
      )}
    </div>
  )
}

export { Progress, progressVariants, progressIndicatorVariants }
