import { AppSidebar } from "@/components/Layout/app-sidebar"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"
import AppHeader from "@/components/Layout/app-header"

export default function Layout({ children }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <AppHeader />

        <main className="  bg-gray-200 min-h-screen">
          <div className="h-full w-full rounded-2xl p-5">
            {children}
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
