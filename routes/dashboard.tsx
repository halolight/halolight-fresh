import { define, PageProps } from "@/utils.ts";
import AdminLayout from "@/islands/AdminLayout.tsx";
import Dashboard from "@/islands/Dashboard.tsx";
import StoreInitializer from "@/islands/StoreInitializer.tsx";

export default define.page(function DashboardPage(_props: PageProps) {
  return (
    <>
      <StoreInitializer />
      <AdminLayout title="仪表盘" currentPath="/dashboard">
        <Dashboard />
      </AdminLayout>
    </>
  );
});
