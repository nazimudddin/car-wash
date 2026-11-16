import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { DashbordSidebar } from "@/components/shered/dashbordSidebar"

export default function DashbordLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <DashbordSidebar />
      <main>
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  )
}