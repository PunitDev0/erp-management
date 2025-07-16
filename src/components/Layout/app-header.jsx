"use client"

import { Button } from "@/components/ui/button"
import { Command, CommandInput } from "@/components/ui/command"
import { Separator } from "@/components/ui/separator"
import {
    Bell,
    CircleUser,
    Menu,
    Moon,
    Settings,
    Sun,
} from "lucide-react"
import { SidebarTrigger } from "@/components/ui/sidebar"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useEffect, useState } from "react"

function ModeToggle() {
    const [darkMode, setDarkMode] = useState(false)

    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add("dark")
        } else {
            document.documentElement.classList.remove("dark")
        }
    }, [darkMode])

    return (
        <Button variant="ghost" size="icon" onClick={() => setDarkMode(!darkMode)}>
            {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </Button>
    )
}

function UserNav() {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                    <CircleUser className="h-6 w-6" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel className="font-medium">Punit Kumar</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Billing</DropdownMenuItem>
                <DropdownMenuItem>Support</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-red-600">Logout</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default function AppHeader() {
    return (
        <header
            className="sticky top-0 z-30 flex h-16 w-full items-center justify-between 
      bg-white/80 backdrop-blur-md shadow-sm px-4"
        >
            {/* Left Section */}
            <div className="flex items-center gap-4">
                <SidebarTrigger asChild>
                    <Button variant="ghost" size="icon" className="lg:hidden">
                        <Menu className="h-5 w-5" />
                    </Button>
                </SidebarTrigger>

                <h1 className="text-lg font-semibold text-slate-800 hidden md:block">
                    Dashboard
                </h1>

                <Separator orientation="vertical" className="h-6 bg-slate-300/60 hidden md:block" />

                <Command className="w-56 sm:w-72 hidden md:block">
                    <CommandInput placeholder="Search…" />
                </Command>
            </div>

            {/* Right Section */}
            <div className="flex items-center gap-2">
                <ModeToggle />
                <Button variant="ghost" size="icon" className="relative">
                    <Bell className="h-5 w-5" />
                    <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
                        3
                    </span>
                </Button>
                <Button variant="ghost" size="icon">
                    <Settings className="h-5 w-5" />
                </Button>
                <UserNav />
            </div>
        </header>
    )
}
