import {DashboardMetrics} from "@/components/dashboard/dashboard-metric.tsx";

const DashboardPage = () => {
  return (
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard Admin</h1>
        <p className="text-muted-foreground">Kelola produk dan pesanan zara</p>
        <DashboardMetrics />
      </div>
  );
}

export default DashboardPage;