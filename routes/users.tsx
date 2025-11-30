import { define } from "@/utils.ts";
import AdminLayout from "@/islands/AdminLayout.tsx";
import UserList from "@/islands/UserList.tsx";
import StoreInitializer from "@/islands/StoreInitializer.tsx";

export default define.page(function UsersPage() {
  return (
    <>
      <StoreInitializer />
      <AdminLayout title="用户管理" currentPath="/users">
        <UserList />
      </AdminLayout>
    </>
  );
});
