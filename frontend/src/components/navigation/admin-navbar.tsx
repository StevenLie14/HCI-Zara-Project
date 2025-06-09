import { SidebarTrigger } from "@/components/ui/sidebar"
import {ThemeToggle} from "@/components/theme-toggle.tsx";
import {Link} from "react-router-dom";
import ProfileNav from "@/components/navigation/profile-nav.tsx";


export function DashboardHeader() {


  return (
    <header className="border-b bg-background px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <SidebarTrigger />
          <div className="flex items-center space-x-8">
            <Link to="/" className="text-xl font-bold uppercase">
              Zara
            </Link>
          </div>
        </div>
        <div className={`flex items-center space-x-4`}>
          <ThemeToggle />
          <ProfileNav showCart={false} />
        </div>
      </div>
    </header>
  )
}
