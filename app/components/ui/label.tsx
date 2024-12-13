import * as React from "react"

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  htmlFor?: string
}

export function Label({ children, ...props }: LabelProps) {
  return <label {...props}>{children}</label>
} 