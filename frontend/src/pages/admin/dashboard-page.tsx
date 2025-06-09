import {DashboardMetrics} from "@/components/dashboard/dashboard-metric.tsx";
import AdminOrderManagement from "@/pages/admin/edit-status-transaction.tsx";

const DashboardPage = () => {
  return (

    <div className="flex flex-col flex-1 pr-10 py-10">
      <DashboardMetrics />

      <main className="flex-1">
      <AdminOrderManagement />
      </main>
    </div>
  );
}

export default DashboardPage;