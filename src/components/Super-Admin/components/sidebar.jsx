'use client'
import React from "react";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Building2,
  Users,
  Shield,
  BarChart3,
  Settings,
  Bell,
  Menu,
  X,
  Home,
  UserPlus,
  Database,
  Activity,
  LogOut,
  User,
  HelpCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

const navigation = [
  { name: "Dashboard", href: "/super-admin/dashboard", icon: Home },
  { name: "Institutions", href: "/super-admin/institutions", icon: Building2 },
  { name: "Create Admin", href: "/super-admin/create-admin", icon: UserPlus },
  { name: "Manage Admins", href: "/super-admin/admins", icon: Users },
  // { name: "System Analytics", href: "/super-admin/analytics", icon: BarChart3 },
  // { name: "System Settings", href: "/super-admin/settings", icon: Settings },
  // { name: "Activity Logs", href: "/super-admin/logs", icon: Activity },
  // { name: "Backup & Restore", href: "/super-admin/backup", icon: Database },
];

export function SuperAdminSidebar({ children, sidebarOpen }) {
  const pathname = usePathname();

  return (
    <div className="max-h-screen dark:bg-slate-900 relative overflow-auto">
      {/* Desktop sidebar */}
      <div className={`${sidebarOpen ? 'lg:fixed' : 'hidden' }  h-full lg:flex lg:w-64 lg:flex-col rounded-2xl p-4`}>
        <div className="flex flex-col flex-grow bg-white dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700 shadow-sm h-full rounded-xl">
          <div className="flex h-16 items-center px-4 py-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <div>
                <span className="text-xl font-bold text-slate-900 dark:text-slate-100">Super Admin</span>
                <p className="text-xs text-slate-500 dark:text-slate-400">System Control Panel</p>
              </div>
            </div>
          </div>
          <nav className="flex-1 space-y-5 px-3 py-4 overflow-auto ">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`group flex items-center px-3 py-4 text-sm font-medium rounded-xl transition-colors ${
                    isActive
                      ? "bg-black text-white  dark:bg-blue-900/20 dark:text-blue-400"
                      : "text-black hover:bg-slate-50 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-700 dark:hover:text-slate-100"
                  }`}
                >
                  <item.icon
                    className={`mr-3 h-5 w-5 ${isActive ? "text-white dark:text-blue-400" : "text-black"}`}
                  />
                  {item.name}
                </Link>
              );
            })}
          </nav>
          <div className="p-4 border-t border-slate-200 dark:border-slate-700">
            <div className="flex items-center space-x-3">
              <Avatar className="h-10 w-10">
                <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Super Admin" />
                <AvatarFallback className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">SA</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-slate-900 dark:text-slate-100 truncate">Super Admin</p>
                <p className="text-xs text-slate-500 dark:text-slate-400 truncate">admin@system.com</p>
                <Badge variant="secondary" className="text-xs mt-1">
                  System Admin
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}