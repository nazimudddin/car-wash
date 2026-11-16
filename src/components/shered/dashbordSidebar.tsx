import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "@/components/ui/sidebar"
import { CalendarCheck, CalendarDays, LayoutDashboard } from "lucide-react"


const dashboardSidebarItem = {
  user: [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "My Bookings",
      href: "/bookings",
      icon: CalendarCheck,
    },
    {
      title: "Upcoming Bookings",
      href: "/bookings/upcoming",
      icon: CalendarDays,
    },
  ],

  admin: [
    {
      title: "Dashboard",
      href: "/admin/dashboard",
      icon: LayoutDashboard,
    },
  ],

  branchManager: [
    {
      title: "Dashboard",
      href: "/branch-manager/dashboard",
      icon: LayoutDashboard,
    },
  ],
};


export function DashbordSidebar() {
  return (
    <Sidebar>
      <SidebarHeader>dashbord sidebar header</SidebarHeader>
      <SidebarContent>
        <SidebarGroup />
        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  )
}