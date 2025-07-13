"use client"

import * as React from "react"
import {
  User,
  Check,
  DollarSign,
  Users,
  Building,
  FileText,
  MessageCircle,
  Package,
  Settings,
  User2,
} from "lucide-react"

import { NavMain } from "@/components/Layout/nav-main"
import { NavProjects } from "@/components/Layout/nav-projects"
import { NavUser } from "@/components/Layout/nav-user"
import { TeamSwitcher } from "@/components/Layout/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"

// Updated sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Acme Inc",
      logo: Users,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: Check,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Settings,
      plan: "Free",
    },
  ],
  navMain: [
    {
      title: "Admissions",
      url: "#",
      icon: User,
      isActive: true,
      items: [
        {
          title: "Student Admission",
          url: "/admission/new-student",
          icon: User2,
          isActive: false,
        },
        {
          title: "Staff Admission",
          url: "/admission/new-staff",
          icon: Users,
          isActive: false,
        }

      ]
    },
    {
      title: "Student",
      url: "#",
      icon: Users,
    },
    {
      title: "Attendance",
      url: "#",
      icon: Check,
    },
    {
      title: "Fees",
      url: "#",
      icon: DollarSign,
    },
    {
      title: "Payroll",
      url: "#",
      icon: Users,
    },
    {
      title: "Academic",
      url: "#",
      icon: Building,
    },
    {
      title: "Facilities",
      url: "#",
      icon: Building,
    },
    {
      title: "Reports",
      url: "#",
      icon: FileText,
    },
    {
      title: "SMS",
      url: "#",
      icon: MessageCircle,
    },
    {
      title: "Inventory",
      url: "#",
      icon: Package,
    },
    {
      title: "Tools",
      url: "#",
      icon: Settings,
    },
  ],
  projects: [
    {
      name: "Design Engineering",
      url: "#",
      icon: User,
    },
    {
      name: "Sales & Marketing",
      url: "#",
      icon: DollarSign,
    },
    {
      name: "Travel",
      url: "#",
      icon: Building,
    },
  ],
}

export function AppSidebar({
  ...props
}) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}