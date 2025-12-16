import { define } from "@/utils.ts";
import AdminLayout from "@/islands/AdminLayout.tsx";
import Settings from "@/islands/Settings.tsx";
import StoreInitializer from "@/islands/StoreInitializer.tsx";

export default define.page(function SettingsPage() {
  return (
    <>
      <StoreInitializer />
      <AdminLayout title="系统设置" currentPath="/settings">
        <Settings />
      </AdminLayout>
    </>
  );
});
