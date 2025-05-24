import { SidebarTrigger } from "@/components/ui/sidebar"
import ProfileNav from "@/components/nav/profile-nav.tsx";
import {ThemeToggle} from "@/components/theme-toggle.tsx";


export function DashboardHeader() {


  return (
    <header className="border-b bg-background px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <SidebarTrigger />
          <div className="flex items-center space-x-8">
            <h2 className="text-xl font-bold">ZARA</h2>
            {/*<nav className="flex space-x-6">*/}
            {/*  {navItems.map((item) => (*/}
            {/*    <Button key={item} variant="ghost" className="text-muted-foreground hover:text-foreground">*/}
            {/*      {item}*/}
            {/*    </Button>*/}
            {/*  ))}*/}
            {/*</nav>*/}
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
