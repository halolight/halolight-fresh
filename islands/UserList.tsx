import { useComputed, useSignal } from "@preact/signals";
import { useEffect } from "preact/hooks";
import {
  Download,
  Edit,
  Filter,
  Mail,
  MoreVertical,
  Plus,
  RefreshCw,
  Search,
  Trash2,
} from "lucide-preact";
import { userApi } from "@/lib/api.ts";
import {
  LoadingState,
  PageHeader,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableHeader,
} from "@/components/layout.tsx";
import { Avatar, Badge, Button, Card, CardContent, Input } from "@/components/ui.tsx";
import { cn, formatDate } from "@/lib/utils.ts";
import type { PaginationParams, User } from "@/lib/types.ts";

export default function UserList() {
  const loading = useSignal(true);
  const users = useSignal<User[]>([]);
  const total = useSignal(0);
  const page = useSignal(1);
  const pageSize = useSignal(10);
  const search = useSignal("");
  const selectedUsers = useSignal<string[]>([]);
  const showFilters = useSignal(false);
  const filterStatus = useSignal<string>("all");
  const filterRole = useSignal<string>("all");

  const totalPages = useComputed(() => Math.ceil(total.value / pageSize.value));

  const fetchUsers = async () => {
    loading.value = true;
    try {
      const params: PaginationParams = {
        page: page.value,
        pageSize: pageSize.value,
        search: search.value,
      };

      const response = await userApi.getUsers(params);
      if (response.code === 200) {
        users.value = response.data.list;
        total.value = response.data.total;
      }
    } catch (err) {
      console.error("获取用户列表失败", err);
    } finally {
      loading.value = false;
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [page.value, pageSize.value]);

  const handleSearch = () => {
    page.value = 1;
    fetchUsers();
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      selectedUsers.value = users.value.map((u) => u.id);
    } else {
      selectedUsers.value = [];
    }
  };

  const handleSelectUser = (userId: string, checked: boolean) => {
    if (checked) {
      selectedUsers.value = [...selectedUsers.value, userId];
    } else {
      selectedUsers.value = selectedUsers.value.filter((id) => id !== userId);
    }
  };

  const handleDeleteUser = async (userId: string) => {
    if (!confirm("确定要删除该用户吗？")) return;

    try {
      const response = await userApi.deleteUser(userId);
      if (response.code === 200) {
        await fetchUsers();
      }
    } catch (err) {
      console.error("删除用户失败", err);
    }
  };

  const statusBadges: Record<string, { variant: "success" | "warning" | "error"; label: string }> =
    {
      active: { variant: "success", label: "正常" },
      inactive: { variant: "warning", label: "未激活" },
      suspended: { variant: "error", label: "已禁用" },
    };

  // 统计数据
  const stats = useComputed(() => {
    const all = users.value;
    return {
      total: total.value,
      active: all.filter((u) => u.status === "active").length,
      inactive: all.filter((u) => u.status === "inactive").length,
      suspended: all.filter((u) => u.status === "suspended").length,
    };
  });

  return (
    <div class="space-y-6">
      <PageHeader title="用户管理" description="管理系统用户和权限">
        <Button icon={<Plus class="h-4 w-4" />}>
          添加用户
        </Button>
      </PageHeader>

      {/* 统计卡片 */}
      <div class="grid gap-4 sm:grid-cols-4">
        <Card>
          <CardContent class="p-4">
            <p class="text-sm text-gray-500 dark:text-gray-400">总用户数</p>
            <p class="mt-1 text-2xl font-bold text-gray-900 dark:text-white">{stats.value.total}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent class="p-4">
            <p class="text-sm text-gray-500 dark:text-gray-400">正常用户</p>
            <p class="mt-1 text-2xl font-bold text-green-600">{stats.value.active}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent class="p-4">
            <p class="text-sm text-gray-500 dark:text-gray-400">未激活</p>
            <p class="mt-1 text-2xl font-bold text-yellow-600">{stats.value.inactive}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent class="p-4">
            <p class="text-sm text-gray-500 dark:text-gray-400">已禁用</p>
            <p class="mt-1 text-2xl font-bold text-red-600">{stats.value.suspended}</p>
          </CardContent>
        </Card>
      </div>

      {/* 搜索和筛选 */}
      <Card>
        <CardContent class="p-4">
          <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div class="flex flex-1 gap-2">
              <div class="relative flex-1 max-w-md">
                <Search class="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="搜索用户名或邮箱..."
                  value={search.value}
                  onInput={(e) => (search.value = (e.target as HTMLInputElement).value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                  class="w-full rounded-lg border border-gray-300 bg-white py-2 pl-10 pr-4 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                />
              </div>
              <Button variant="secondary" onClick={handleSearch}>
                搜索
              </Button>
              <Button
                variant="outline"
                icon={<Filter class="h-4 w-4" />}
                onClick={() => (showFilters.value = !showFilters.value)}
              >
                筛选
              </Button>
            </div>
            <div class="flex gap-2">
              <Button variant="outline" icon={<Download class="h-4 w-4" />}>
                导出
              </Button>
              <Button variant="outline" icon={<RefreshCw class="h-4 w-4" />} onClick={fetchUsers}>
                刷新
              </Button>
            </div>
          </div>

          {/* 筛选器 */}
          {showFilters.value && (
            <div class="mt-4 flex flex-wrap gap-4 border-t border-gray-200 pt-4 dark:border-gray-700">
              <div class="flex items-center gap-2">
                <span class="text-sm text-gray-500 dark:text-gray-400">状态:</span>
                <select
                  value={filterStatus.value}
                  onChange={(e) => (filterStatus.value = (e.target as HTMLSelectElement).value)}
                  class="rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-sm dark:border-gray-600 dark:bg-gray-800"
                >
                  <option value="all">全部</option>
                  <option value="active">正常</option>
                  <option value="inactive">未激活</option>
                  <option value="suspended">已禁用</option>
                </select>
              </div>
              <div class="flex items-center gap-2">
                <span class="text-sm text-gray-500 dark:text-gray-400">角色:</span>
                <select
                  value={filterRole.value}
                  onChange={(e) => (filterRole.value = (e.target as HTMLSelectElement).value)}
                  class="rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-sm dark:border-gray-600 dark:bg-gray-800"
                >
                  <option value="all">全部</option>
                  <option value="admin">超级管理员</option>
                  <option value="manager">管理员</option>
                  <option value="editor">编辑</option>
                  <option value="viewer">访客</option>
                </select>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* 用户列表 */}
      <Card>
        {loading.value ? <LoadingState message="加载用户列表..." /> : (
          <>
            <div class="overflow-x-auto">
              <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead class="bg-gray-50 dark:bg-gray-800/50">
                  <tr>
                    <th class="w-12 px-4 py-3">
                      <input
                        type="checkbox"
                        checked={selectedUsers.value.length === users.value.length &&
                          users.value.length > 0}
                        onChange={(e) => handleSelectAll((e.target as HTMLInputElement).checked)}
                        class="h-4 w-4 rounded border-gray-300"
                      />
                    </th>
                    <th class="px-4 py-3 text-left text-sm font-medium text-gray-900 dark:text-white">
                      用户
                    </th>
                    <th class="px-4 py-3 text-left text-sm font-medium text-gray-900 dark:text-white">
                      角色
                    </th>
                    <th class="px-4 py-3 text-left text-sm font-medium text-gray-900 dark:text-white">
                      部门
                    </th>
                    <th class="px-4 py-3 text-left text-sm font-medium text-gray-900 dark:text-white">
                      状态
                    </th>
                    <th class="px-4 py-3 text-left text-sm font-medium text-gray-900 dark:text-white">
                      创建时间
                    </th>
                    <th class="w-20 px-4 py-3 text-right text-sm font-medium text-gray-900 dark:text-white">
                      操作
                    </th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-800">
                  {users.value.map((user) => (
                    <tr key={user.id} class="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                      <td class="px-4 py-3">
                        <input
                          type="checkbox"
                          checked={selectedUsers.value.includes(user.id)}
                          onChange={(e) =>
                            handleSelectUser(user.id, (e.target as HTMLInputElement).checked)}
                          class="h-4 w-4 rounded border-gray-300"
                        />
                      </td>
                      <td class="px-4 py-3">
                        <div class="flex items-center gap-3">
                          <Avatar src={user.avatar} name={user.name} size="sm" />
                          <div>
                            <p class="font-medium text-gray-900 dark:text-white">{user.name}</p>
                            <p class="text-sm text-gray-500 dark:text-gray-400">{user.email}</p>
                          </div>
                        </div>
                      </td>
                      <td class="px-4 py-3">
                        <Badge variant="info">{user.role.label}</Badge>
                      </td>
                      <td class="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">
                        {user.department || "-"}
                      </td>
                      <td class="px-4 py-3">
                        <Badge variant={statusBadges[user.status]?.variant}>
                          {statusBadges[user.status]?.label}
                        </Badge>
                      </td>
                      <td class="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">
                        {formatDate(user.createdAt)}
                      </td>
                      <td class="px-4 py-3">
                        <div class="flex items-center justify-end gap-1">
                          <button
                            type="button"
                            class="rounded p-1.5 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700"
                            title="编辑"
                          >
                            <Edit class="h-4 w-4" />
                          </button>
                          <button
                            type="button"
                            class="rounded p-1.5 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700"
                            title="发送邮件"
                          >
                            <Mail class="h-4 w-4" />
                          </button>
                          <button
                            type="button"
                            class="rounded p-1.5 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20"
                            title="删除"
                            onClick={() =>
                              handleDeleteUser(user.id)}
                          >
                            <Trash2 class="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {users.value.length === 0 && (
                    <tr>
                      <td
                        colSpan={7}
                        class="px-4 py-8 text-center text-gray-500 dark:text-gray-400"
                      >
                        暂无用户数据
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* 分页 */}
            {totalPages.value > 1 && (
              <div class="border-t border-gray-200 px-4 py-3 dark:border-gray-700">
                <div class="flex items-center justify-between">
                  <p class="text-sm text-gray-500 dark:text-gray-400">
                    共 {total.value} 条记录，当前第 {page.value} / {totalPages.value} 页
                  </p>
                  <Pagination
                    currentPage={page.value}
                    totalPages={totalPages.value}
                    onPageChange={(p) => (page.value = p)}
                  />
                </div>
              </div>
            )}
          </>
        )}
      </Card>

      {/* 批量操作 */}
      {selectedUsers.value.length > 0 && (
        <div class="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-lg bg-gray-900 px-6 py-3 text-white shadow-lg dark:bg-gray-700">
          <div class="flex items-center gap-4">
            <span class="text-sm">已选择 {selectedUsers.value.length} 项</span>
            <Button size="sm" variant="danger">
              批量删除
            </Button>
            <Button size="sm" variant="secondary" onClick={() => (selectedUsers.value = [])}>
              取消选择
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
