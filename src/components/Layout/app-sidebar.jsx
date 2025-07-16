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
  Home,Zap,
  Settings2
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
      // isActive: true,
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
      title: "Attendance",
      url: "#",
      icon: Check,
      // isActive: true,
      items: [
        {
          title: "Student Attendance",
          url: "/admission/new-student",
          icon: User2,
          isActive: false,
        },
        {
          title: "Staff Attendance",
          url: "/admission/new-staff",
          icon: Users,
          isActive: false,
        },
        {
          title: "Attendance Sessions",
          url: "/admission/new-staff",
          icon: Users,
          isActive: false,
        }
      ]
    },

    {
      title: "Payroll",
      url: "#",
      icon: Users,
      // isActive: true,
      items: [
        {
          title: "Salary",
          url: "/admission/new-student",
          icon: User2,
          isActive: false,
        },
        {
          title: "Set Salary",
          url: "/admission/new-staff",
          icon: Users,
          isActive: false,
        },
        {
          title: "Staff Leave Details",
          url: "/admission/new-staff",
          icon: Users,
          isActive: false,
        }
      ]
    },
    {
      title: "Academic",
      url: "#",
      icon: Building,
      items: [
        {
          title: "Salary",
          url: "/admission/new-student",
          icon: User2,
          isActive: false,
        },
        {
          title: "Set Salary",
          url: "/admission/new-staff",
          icon: Users,
          isActive: false,
        },
        {
          title: "Staff Leave Details",
          url: "/admission/new-staff",
          icon: Users,
          isActive: false,
        }
      ]
    },
    {
      title: "Facilities",
      url: "#",
      icon: Building,
    },
    {
      title: "Fees",
      url: "#",
      icon: DollarSign,
    },
    {
      title: "Student",
      url: "#",
      icon: Users,
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

const toolButtons = [
  { title: "CLI", icon: Zap },
  { title: "Docs", icon: Home },
  { title: "Settings", icon: Settings2},
  { title: "API" }, // no icon
  // add as many as you like – the row scrolls horizontally
]
export function AppSidebar({
  ...props
}) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
      <NavMain items={data.navMain} tools={toolButtons} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}