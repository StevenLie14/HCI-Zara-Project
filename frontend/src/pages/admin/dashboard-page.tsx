import {DashboardMetrics} from "@/components/dashboard/dashboard-metric.tsx";
import AdminNewProduct from "./admin-new-product";
import AdminSideBarSection from "./admin-side-bar";

const DashboardPage = () => {
  return (
      <div className="bg-white flex w-full min-h-screen">
      <aside className="w-[20%] flex-shrink-0">
        <AdminSideBarSection />
      </aside>

      <div className="flex flex-col flex-1 pr-10 py-10">
        <DashboardMetrics />

        <main className="flex-1">
        <AdminNewProduct/>
        </main>
      </div>
    </div>
  );
}

export default DashboardPage;