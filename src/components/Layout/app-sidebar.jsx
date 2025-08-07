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
  Home, Zap,
  Settings2,
  CalendarDays,     // For Student Time Table
  CalendarCheck,    // For Staff Time Table
  FileClock,        // For Exam Scheduling
  Users2,           // For Meeting
  BadgePercent,     // For Scholarship
  BarChart2,
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
    name: 'shadcn',
    email: 'm@example.com',
    avatar: '/avatars/shadcn.jpg',
  },
  teams: [
    {
      name: 'Acme Inc',
      logo: Users,
      plan: 'Enterprise',
    },
    {
      name: 'Acme Corp.',
      logo: Check,
      plan: 'Startup',
    },
    {
      name: 'Evil Corp.',
      logo: Settings,
      plan: 'Free',
    },
  ],
  navMain: [
    {
      title: 'Admissions',
      icon: User,
      items: [
        {
          title: 'Student Admission',
          url: '/admission/student',
          icon: User2,
        },
        {
          title: 'Staff Admission',
          url: '/admission/staff',
          icon: Users,
        },
      ],
    },
    {
      title: 'Attendance',
      icon: Check,
      items: [
        {
          title: 'Student Attendance',
          url: '/attendance/student',
          icon: User2,
        },
        {
          title: 'Staff Attendance',
          url: '/attendance/staff',
          icon: Users,
        },
        // {
        //   title: 'Attendance Sessions',
        //   url: '/attendance/sessions',
        //   icon: Users,
        // },
      ],
    },
    {
      title: 'Payroll',
      icon: Users,
      items: [
        {
          title: 'Salary',
          url: '/payroll/salary',
          icon: User2,
        },
        {
          title: 'Set Salary',
          url: '/payroll/set-salary',
          icon: Users,
        },
        {
          title: 'Staff Leave Details',
          url: '/payroll/leave-details',
          icon: Users,
        },
      ],
    },
    {
      title: 'Academic',
      icon: Building,
      items: [
        {
          title: 'Staff Time Table',
          url: '/academic/staff-time-table',
          icon: CalendarCheck,
        },
        {
          title: 'Exam Scheduling',
          url: '/academic/exam-scheduling',
          icon: FileClock,
        },
        {
          title: 'Meeting',
          url: '/academic/meeting',
          icon: Users2,
        },
        {
          title: 'Scholarship',
          url: '/academic/scholarship',
          icon: BadgePercent,
        },
        {
          title: 'Assignment',
          url: '/academic/assignment',
          icon: FileText,
        },
        {
          title: 'Progress Report',
          url: '/academic/progress-report',
          icon: BarChart2,
        },
      ],
    },
    {
      title: 'Fees',
      url: '/fees',
      icon: DollarSign,
    },
    {
      title: 'Student',
      url: '/student',
      icon: Users,
    },
    {
      title: 'Tools',
      // url: '/tools',
      icon: Settings,
      items: [
        {
          title: 'Degree',
          url: '/tools/add-degree',
          icon: CalendarCheck,
        },
        {
          title: 'Course',
          url: '/tools/add-course',
          icon: FileClock,
        },
        {
          title: 'Department',
          url: '/tools/add-department',
          icon: Users2,
        },
        {
          title: 'Subject',
          url: '/tools/add-subject',
          icon: BadgePercent,
        },
        {
          title: 'Syllabus',
          url: '/tools/add-syllabus',
          icon: FileText,
        },
        // {
        //   title: 'Progress Report',
        //   url: '/academic/progress-report',
        //   icon: BarChart2,
        // },
      ],
    },
  ],
  projects: [
    {
      name: 'Design Engineering',
      url: '/projects/design',
      icon: User,
    },
    {
      name: 'Sales & Marketing',
      url: '/projects/sales',
      icon: DollarSign,
    },
    {
      name: 'Travel',
      url: '/projects/travel',
      icon: Building,
    },
  ],
};

const toolButtons = [
  { title: "SMS", icon: Zap, url:'/sms' },
  { title: "Inventory", icon: Home, url:'/inventory'  },
  { title: "Reports", url:'/report'  }, // no icon
  { title: "Settings", icon: Settings2, url:'/setting'  },
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