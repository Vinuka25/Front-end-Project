// src/components/layout/AppSidebar.component.tsx
import { useLocation, Link } from "react-router-dom"
import { LayoutDashboard, Package, Settings } from "lucide-react"
import { cn } from "@/lib/utils"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar"

const items = [
  { title: "Dashboard", url: "/", icon: LayoutDashboard },
  { title: "Products", url: "/products", icon: Package },
  { title: "Settings", url: "/settings", icon: Settings },
]

export function AppSidebar() {
  const location = useLocation()

  return (
    <Sidebar className="bg-violet-500 text-zinc-800 border-r border-violet-100">
      <SidebarContent>
        <div className="px-4 py-3 text-lg font-semibold text-white">
          E-Commerce Site
        </div>

        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => {
                const isActive = location.pathname === item.url

                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      render={<Link to={item.url} />}
                      isActive={isActive}
                      className={cn(
                        "text-zinc-200 hover:bg-violet-50 hover:text-violet-700",
                        isActive && "bg-violet-50 text-violet-700 font-medium"
                      )}
                    >
                      <item.icon />
                      {item.title}
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}