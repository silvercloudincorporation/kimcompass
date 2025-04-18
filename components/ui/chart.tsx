"use client"

import * as React from "react"
import { Tooltip as RechartsTooltip } from "recharts"

import { cn } from "@/lib/utils"

interface ChartConfig {
  [key: string]: {
    label: string
    color: string
  }
}

interface ChartContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  config: ChartConfig
}

const ChartContainer = React.forwardRef<HTMLDivElement, ChartContainerProps>(
  ({ config, className, children, ...props }, ref) => {
    const configKeys = Object.keys(config)
    const cssVariables = configKeys.reduce(
      (acc, key) => {
        acc[`--color-${key.replace(/\s+/g, "-").toLowerCase()}`] = config[key].color
        return acc
      },
      {} as Record<string, string>,
    )

    return (
      <div
        ref={ref}
        className={cn("w-full chart-container", className)}
        style={cssVariables as React.CSSProperties}
        {...props}
      >
        {children}
      </div>
    )
  },
)
ChartContainer.displayName = "ChartContainer"

const ChartTooltip = React.forwardRef<
  React.ElementRef<typeof RechartsTooltip>,
  React.ComponentPropsWithoutRef<typeof RechartsTooltip>
>(({ content, ...props }, ref) => (
  <RechartsTooltip
    ref={ref}
    content={content || <ChartTooltipContent />}
    cursor={{ fill: "hsl(var(--muted))", opacity: 0.3 }}
    wrapperStyle={{ outline: "none" }}
    {...props}
  />
))
ChartTooltip.displayName = "ChartTooltip"

interface ChartTooltipContentProps {
  active?: boolean
  payload?: Array<{
    name: string
    value: number
    payload: {
      [key: string]: any
    }
  }>
  label?: string
}

const ChartTooltipContent = ({ active, payload, label }: ChartTooltipContentProps) => {
  if (!active || !payload?.length) {
    return null
  }

  return (
    <div className="rounded-lg border bg-card p-3 shadow-md">
      <div className="mb-2 font-medium">{label}</div>
      <div className="flex flex-col gap-1.5">
        {payload.map((data, i) => {
          const dataName = data.name.replace(/\s+/g, "-").toLowerCase()
          const color = `var(--color-${dataName})`
          const formattedValue =
            typeof data.value === "number" && (dataName === "revenue" || data.name === "revenue")
              ? `$${data.value.toLocaleString()}`
              : data.value

          return (
            <div key={i} className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full" style={{ background: color }} />
                <span className="text-sm font-medium">{data.name}</span>
              </div>
              <span className="text-sm font-bold">{formattedValue}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export { ChartContainer, ChartTooltip, ChartTooltipContent }

