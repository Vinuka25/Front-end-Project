import { Outlet } from "react-router-dom"
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "./AppSideBar.component"
import { Navbar } from "./NavBar.component"

export default function AppLayout() {
  return (
    <SidebarProvider>
      <AppSidebar />

      <main className="flex h-svh min-w-0 flex-1 flex-col overflow-hidden">
        <Navbar />

        <div className="min-h-0 flex-1 overflow-y-auto p-6">
          <Outlet />
        </div>
      </main>
    </SidebarProvider>
  )
}