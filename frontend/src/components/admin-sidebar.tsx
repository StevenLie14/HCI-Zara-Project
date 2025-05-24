
import { LayoutDashboard, Package } from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import {useNavigate} from "react-router-dom";

const AdminSidebar = () => {
  const menuItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: LayoutDashboard,
      link: "/admin/dashboard",
    },
    {
      id: "produk",
      label: "Produk",
      icon: Package,
      link: "/admin/products",
    },
  ]

  const navigate = useNavigate()

  return (
    <Sidebar>
      <SidebarHeader className="border-b">
        <div className="p-4">
          <h1 className="text-2xl font-bold">ZARA Admin</h1>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => {
                const Icon = item.icon
                return (
                  <SidebarMenuItem key={item.id}>
                    <SidebarMenuButton
                      onClick={() => navigate(item.link)}
                      isActive={window.location.pathname === item.link}
                      className="w-full justify-start"
                    >
                      <Icon className="w-5 h-5" />
                      <span>{item.label}</span>
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

export default AdminSidebar