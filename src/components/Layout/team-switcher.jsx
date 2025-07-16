"use client"

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"

export function TeamSwitcher() {
  return (
    <div className="flex items-center gap-3 p-2 rounded-lg bg-white">
      {/* Avatar */}
      <Avatar className="size-9 ring-2 ring-white/90">
        <AvatarImage src="https://www.pexels.com/photo/man-in-brown-polo-shirt-614810/" alt="Vitaliy D." />
        <AvatarFallback>VD</AvatarFallback>
      </Avatar>

      {/* Text */}
      <div className="flex flex-col text-left leading-tight">
        <span className="text-xs text-muted-foreground flex items-center gap-1">
          Good Day <span role="img" aria-label="wave">👋</span>
        </span>
        <span className="truncate font-semibold">Vitaliy D.</span>
      </div>
    </div>
  )
}
