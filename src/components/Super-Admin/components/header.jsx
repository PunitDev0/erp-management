'use client'

import { Button } from "@/components/ui/button"
import { Bell, Search } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full flex flex-wrap items-center justify-between gap-4 px-4 sm:px-6 py-4 bg-white shadow-sm rounded-none sm:rounded-lg">
      <h2 className="text-lg sm:text-xl font-semibold text-black">Hi, Dilan!</h2>

      <div className="flex items-center gap-3 sm:gap-4 flex-wrap">
        <Button className="rounded-full bg-black text-white hover:bg-gray-800 text-sm px-4 sm:px-5">
          + Create
        </Button>

        <div className="flex items-center gap-2">
          <Button size="icon" variant="outline" className="rounded-full">
            <Search className="w-5 h-5" />
          </Button>

          <Button size="icon" variant="outline" className="rounded-full">
            <Bell className="w-5 h-5" />
          </Button>

          <Avatar className="w-9 h-9">
            <AvatarImage src="/avatar.jpg" alt="@dilan" />
            <AvatarFallback>D</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  )
}
