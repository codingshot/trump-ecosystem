import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

interface AndOrToggleProps {
  isAnd: boolean
  onToggle: (value: boolean) => void
}

export function AndOrToggle({ isAnd, onToggle }: AndOrToggleProps) {
  return (
    <div className="flex items-center space-x-2">
      <Switch
        id="and-or-toggle"
        checked={isAnd}
        onCheckedChange={onToggle}
      />
      <Label htmlFor="and-or-toggle" className="text-sm font-medium text-gray-300">
        {isAnd ? 'AND' : 'OR'}
      </Label>
    </div>
  )
}

