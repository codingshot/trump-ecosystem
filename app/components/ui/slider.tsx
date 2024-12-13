import * as React from "react"
import * as SliderPrimitive from "@radix-ui/react-slider"

interface SliderProps {
  min?: number
  max?: number
  step?: number
  value?: number[]
  onValueChange?: (value: number[]) => void
  disabled?: boolean
  className?: string
}

export function Slider({
  min = 0,
  max = 100,
  step = 1,
  value,
  onValueChange,
  disabled = false,
  className
}: SliderProps) {
  return (
    <SliderPrimitive.Root
      min={min}
      max={max}
      step={step}
      value={value}
      onValueChange={onValueChange}
      disabled={disabled}
      className={`relative flex items-center w-full h-5 ${className}`}
    >
      <SliderPrimitive.Track className="relative h-1 grow rounded-full bg-secondary">
        <SliderPrimitive.Range className="absolute h-full rounded-full bg-accent" />
      </SliderPrimitive.Track>
      {value?.map((_, index) => (
        <SliderPrimitive.Thumb
          key={index}
          className="block w-4 h-4 bg-white rounded-full shadow-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-accent"
        />
      ))}
    </SliderPrimitive.Root>
  )
} 