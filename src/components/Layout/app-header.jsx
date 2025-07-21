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
import { usePathname } from "next/navigation";

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
                {/* <Button variant="ghost" size="icon" className="rounded-full"> */}
                    <CircleUser className="" size={40}/>
                {/* </Button> */}
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
    const pathname = usePathname(); // e.g., "/admission/staff"
    const segments = pathname.split("/").filter(Boolean); // ["admission", "staff"]
    return (
        <header
            className="sticky top-0 z-30 flex h-16 w-full items-center justify-between 
      bg-gray-200 backdrop-blur-md px-4"
        >
            {/* Left Section */}
            <div className="flex items-center gap-4">
                {/* <SidebarTrigger>
                    <Button variant="ghost" size="icon" className="lg:hidden">
                        <Menu className="h-5 w-5" />
                    </Button>
                </SidebarTrigger> */}

                <h1 className="text-3xl font-semibold text-slate-800 hidden md:block">
                    {segments[0] ? segments[0].toUpperCase() : 'DASHBOARD'}
                </h1>

                <Separator orientation="vertical" className="h-6 bg-slate-300/60 hidden md:block" />

            </div>

            {/* Right Section */}
            <div className="flex items-center gap-2">
                {/* <ModeToggle /> */}
                <Command className="w-56 sm:w-72 hidden md:block">
                    <CommandInput placeholder="Search…" />
                </Command>
                <div className="p-1 rounded-full bg-gray-300">
                <Button variant="ghost" size="icon" className="relative hover:bg-transparent">
                    <Bell className="h-8 w-8" />
                    <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
                        3
                    </span>
                </Button>
                </div>
                {/* <Button variant="ghost" size="icon">
                    <Settings className="h-5 w-5" />
                </Button> */}
                <UserNav />
            </div>
        </header>
    )
}