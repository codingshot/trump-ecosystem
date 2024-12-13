import * as React from "react"
import * as SelectPrimitive from "@radix-ui/react-select"

interface SelectProps {
  onValueChange?: (value: string) => void
  children: React.ReactNode
}

export function Select({ onValueChange, children }: SelectProps) {
  return (
    <SelectPrimitive.Root onValueChange={onValueChange}>
      {children}
    </SelectPrimitive.Root>
  )
}

export function SelectTrigger({ className, children }: { className?: string, children: React.ReactNode }) {
  return (
    <SelectPrimitive.Trigger className={className}>
      {children}
    </SelectPrimitive.Trigger>
  )
}

export function SelectValue({ placeholder }: { placeholder?: string }) {
  return <SelectPrimitive.Value placeholder={placeholder} />
}

export function SelectContent({ children }: { children: React.ReactNode }) {
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content className="bg-secondary rounded-md p-1 shadow-lg">
        <SelectPrimitive.Viewport>{children}</SelectPrimitive.Viewport>
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  )
}

export function SelectItem({ value, children }: { value: string, children: React.ReactNode }) {
  return (
    <SelectPrimitive.Item 
      value={value} 
      className="relative flex items-center px-8 py-2 text-sm text-white rounded-sm hover:bg-accent hover:text-primary cursor-pointer outline-none"
    >
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  )
} 