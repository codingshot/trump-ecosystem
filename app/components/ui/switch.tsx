import * as React from "react"

interface SwitchProps {
  id?: string
  checked?: boolean
  onCheckedChange?: (checked: boolean) => void
}

export function Switch({ id, checked, onCheckedChange }: SwitchProps) {
  return (
    <input
      type="checkbox"
      id={id}
      checked={checked}
      onChange={(e) => onCheckedChange?.(e.target.checked)}
      className="relative h-6 w-11 cursor-pointer appearance-none rounded-full bg-gray-300 transition-colors checked:bg-[#1FD978]"
    />
  )
} 