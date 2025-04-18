"use client"

import { useState } from "react"
import { Eye, EyeOff, Lock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input, type InputProps } from "@/components/ui/input"

interface PasswordInputProps extends Omit<InputProps, "type"> {
  icon?: boolean
}

export function PasswordInput({ icon = true, className, disabled, ...props }: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className="relative">
      {icon && <Lock className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />}
      <Input
        type={showPassword ? "text" : "password"}
        className={`${icon ? "pl-10" : ""} ${className}`}
        disabled={disabled}
        {...props}
      />
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="absolute right-0 top-0 h-full px-3 py-2 text-muted-foreground"
        onClick={() => setShowPassword(!showPassword)}
        disabled={disabled}
      >
        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
        <span className="sr-only">{showPassword ? "Hide password" : "Show password"}</span>
      </Button>
    </div>
  )
}
