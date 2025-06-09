import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import {Outlet} from "react-router-dom";
import AdminSidebar from "@/components/navigation/admin-sidebar.tsx";
import {DashboardHeader} from "@/components/navigation/admin-navbar.tsx";

const AdminLayout = () => {
  return (
    <SidebarProvider>
      <div className="flex h-screen w-full">
        <AdminSidebar />
        <SidebarInset className="flex flex-col">
          <DashboardHeader/>

          <main className="flex-1 p-6 overflow-y-auto">
            <div className="max-w-7xl mx-auto space-y-6">
                <Outlet />
            </div>
          </main>
        </SidebarInset>
      </div>

    </SidebarProvider>
  );
}

export default AdminLayout;