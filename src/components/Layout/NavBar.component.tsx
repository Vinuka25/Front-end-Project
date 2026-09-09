// src/components/Layout/NavBar.component.tsx
import { useNavigate } from "react-router-dom"
import { Search, Bell, Settings, LogOut } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { logout } from "@/services/auth.service"

export function Navbar() {
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate("/login")
  }

  return (
    <header className="sticky top-0 z-20 bg-violet-500 flex items-center justify-between gap-4 border-b px-4 py-3">
      <div className="relative w-full max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Search..."
          className="pl-9 bg-violet-50 border-violet-100 focus-visible:ring-violet-300"
        />
      </div>

      <div className="flex items-center gap-3">
        <button type="button" className="p-2 rounded-md hover:bg-violet-50 text-white" aria-label="Notifications">
          <Bell className="w-5 h-5" />
        </button>

        <button type="button" className="p-2 rounded-md hover:bg-violet-50 text-white" aria-label="Settings">
          <Settings className="w-5 h-5" />
        </button>

        <DropdownMenu>
          <DropdownMenuTrigger render={<Button variant="ghost" size="icon" className="rounded-full" />}>
            <Avatar>
              <AvatarImage src="" alt="Profile" />
              <AvatarFallback className="bg-violet-600 text-white">U</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={handleLogout}>
              <LogOut />
              Logout
            </DropdownMenuItem>
            <DropdownMenuSeparator />
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}