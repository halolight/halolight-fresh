import { useComputed, useSignal } from "@preact/signals";
import { useEffect } from "preact/hooks";
import {
  AlertCircle,
  ArrowRight,
  Bell,
  Calendar,
  CheckCircle,
  Clock,
  DollarSign,
  FileText,
  Plus,
  ShoppingCart,
  TrendingDown,
  TrendingUp,
  Users,
} from "lucide-preact";
import { calendarApi, dashboardApi, notificationApi, taskApi } from "@/lib/api.ts";
import { LoadingState, PageHeader, StatCard } from "@/components/layout.tsx";
import { Badge, Button, Card, CardContent, CardHeader, Skeleton } from "@/components/ui.tsx";
import { cn, formatCurrency, formatNumber } from "@/lib/utils.ts";
import type {
  CalendarEvent,
  ChartDataPoint,
  DashboardStats,
  Notification,
  Task,
} from "@/lib/types.ts";

export default function Dashboard() {
  const loading = useSignal(true);
  const stats = useSignal<DashboardStats | null>(null);
  const visitData = useSignal<ChartDataPoint[]>([]);
  const salesData = useSignal<ChartDataPoint[]>([]);
  const trafficData = useSignal<ChartDataPoint[]>([]);
  const notifications = useSignal<Notification[]>([]);
  const tasks = useSignal<Task[]>([]);
  const events = useSignal<CalendarEvent[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      loading.value = true;
      try {
        const [statsRes, visitRes, salesRes, trafficRes, notifRes, tasksRes, eventsRes] =
          await Promise.all([
            dashboardApi.getStats(),
            dashboardApi.getVisitData(),
            dashboardApi.getSalesData(),
            dashboardApi.getTrafficData(),
            notificationApi.getNotifications(),
            taskApi.getTasks(),
            calendarApi.getEvents(),
          ]);

        if (statsRes.code === 200) stats.value = statsRes.data;
        if (visitRes.code === 200) visitData.value = visitRes.data;
        if (salesRes.code === 200) salesData.value = salesRes.data;
        if (trafficRes.code === 200) trafficData.value = trafficRes.data;
        if (notifRes.code === 200) notifications.value = notifRes.data;
        if (tasksRes.code === 200) tasks.value = tasksRes.data;
        if (eventsRes.code === 200) events.value = eventsRes.data;
      } catch (err) {
        console.error("获取仪表盘数据失败", err);
      } finally {
        loading.value = false;
      }
    };

    fetchData();
  }, []);

  if (loading.value) {
    return <LoadingState message="加载仪表盘数据..." />;
  }

  const statCards = stats.value
    ? [
      {
        title: "总用户数",
        value: formatNumber(stats.value.totalUsers),
        change: stats.value.userGrowth,
        trend: stats.value.userGrowth >= 0 ? "up" : "down",
        icon: <Users class="h-5 w-5" />,
      },
      {
        title: "总收入",
        value: formatCurrency(stats.value.totalRevenue),
        change: stats.value.revenueGrowth,
        trend: stats.value.revenueGrowth >= 0 ? "up" : "down",
        icon: <DollarSign class="h-5 w-5" />,
      },
      {
        title: "总订单",
        value: formatNumber(stats.value.totalOrders),
        change: stats.value.orderGrowth,
        trend: stats.value.orderGrowth >= 0 ? "up" : "down",
        icon: <ShoppingCart class="h-5 w-5" />,
      },
      {
        title: "转化率",
        value: `${stats.value.conversionRate}%`,
        change: 2.5,
        trend: "up",
        icon: <TrendingUp class="h-5 w-5" />,
      },
    ]
    : [];

  const taskStatusIcons = {
    pending: <Clock class="h-4 w-4 text-yellow-500" />,
    in_progress: <AlertCircle class="h-4 w-4 text-blue-500" />,
    completed: <CheckCircle class="h-4 w-4 text-green-500" />,
  };

  const taskStatusLabels = {
    pending: "待处理",
    in_progress: "进行中",
    completed: "已完成",
  };

  const priorityColors = {
    low: "bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300",
    medium: "bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400",
    high: "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400",
  };

  return (
    <div class="space-y-6">
      <PageHeader
        title="仪表盘"
        description="欢迎回来，这是您的业务概览"
      />

      {/* 统计卡片 */}
      <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {statCards.map((card, index) => (
          <StatCard
            key={index}
            title={card.title}
            value={card.value}
            change={card.change}
            trend={card.trend as "up" | "down" | "neutral"}
            icon={card.icon}
          />
        ))}
      </div>

      {/* 图表区域 */}
      <div class="grid gap-6 lg:grid-cols-2">
        {/* 访问趋势 */}
        <Card>
          <CardHeader class="flex flex-row items-center justify-between">
            <div>
              <h3 class="font-semibold text-gray-900 dark:text-white">访问趋势</h3>
              <p class="text-sm text-gray-500 dark:text-gray-400">最近30天的访问数据</p>
            </div>
          </CardHeader>
          <CardContent>
            <div class="h-64 flex items-end gap-1">
              {visitData.value.slice(-15).map((item, index) => {
                const maxValue = Math.max(...visitData.value.map((d) => d.value));
                const height = (item.value / maxValue) * 100;
                return (
                  <div
                    key={index}
                    class="flex-1 bg-blue-500 dark:bg-blue-400 rounded-t transition-all hover:bg-blue-600"
                    style={{ height: `${height}%` }}
                    title={`${item.name}: ${formatNumber(item.value)}`}
                  />
                );
              })}
            </div>
            <div class="mt-2 flex justify-between text-xs text-gray-500 dark:text-gray-400">
              <span>{visitData.value[visitData.value.length - 15]?.name}</span>
              <span>{visitData.value[visitData.value.length - 1]?.name}</span>
            </div>
          </CardContent>
        </Card>

        {/* 销售统计 */}
        <Card>
          <CardHeader class="flex flex-row items-center justify-between">
            <div>
              <h3 class="font-semibold text-gray-900 dark:text-white">销售统计</h3>
              <p class="text-sm text-gray-500 dark:text-gray-400">月度销售数据</p>
            </div>
          </CardHeader>
          <CardContent>
            <div class="h-64 flex items-end gap-2">
              {salesData.value.map((item, index) => {
                const maxValue = Math.max(...salesData.value.map((d) => d.value));
                const height = (item.value / maxValue) * 100;
                return (
                  <div
                    key={index}
                    class="flex-1 bg-emerald-500 dark:bg-emerald-400 rounded-t transition-all hover:bg-emerald-600"
                    style={{ height: `${height}%` }}
                    title={`${item.name}: ${formatCurrency(item.value)}`}
                  />
                );
              })}
            </div>
            <div class="mt-2 flex justify-between text-xs text-gray-500 dark:text-gray-400">
              <span>{salesData.value[0]?.name}</span>
              <span>{salesData.value[salesData.value.length - 1]?.name}</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 下方区域 */}
      <div class="grid gap-6 lg:grid-cols-3">
        {/* 流量占比 */}
        <Card>
          <CardHeader>
            <h3 class="font-semibold text-gray-900 dark:text-white">流量占比</h3>
          </CardHeader>
          <CardContent>
            <div class="space-y-4">
              {trafficData.value.map((item, index) => {
                const total = trafficData.value.reduce((sum, d) => sum + d.value, 0);
                const percentage = ((item.value / total) * 100).toFixed(1);
                const colors = [
                  "bg-blue-500",
                  "bg-emerald-500",
                  "bg-yellow-500",
                  "bg-purple-500",
                  "bg-pink-500",
                ];
                return (
                  <div key={index} class="space-y-1">
                    <div class="flex items-center justify-between text-sm">
                      <span class="text-gray-700 dark:text-gray-200">{item.name}</span>
                      <span class="text-gray-500 dark:text-gray-400">{percentage}%</span>
                    </div>
                    <div class="h-2 rounded-full bg-gray-200 dark:bg-gray-700">
                      <div
                        class={`h-full rounded-full ${colors[index % colors.length]}`}
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* 待办任务 */}
        <Card>
          <CardHeader class="flex flex-row items-center justify-between">
            <h3 class="font-semibold text-gray-900 dark:text-white">待办任务</h3>
            <a
              href="/tasks"
              class="text-sm text-blue-600 hover:underline dark:text-blue-400"
            >
              查看全部
            </a>
          </CardHeader>
          <CardContent>
            <div class="space-y-3">
              {tasks.value.slice(0, 5).map((task) => (
                <div
                  key={task.id}
                  class="flex items-start gap-3 rounded-lg p-2 hover:bg-gray-50 dark:hover:bg-gray-700/50"
                >
                  {taskStatusIcons[task.status]}
                  <div class="flex-1 min-w-0">
                    <p class="truncate text-sm font-medium text-gray-900 dark:text-white">
                      {task.title}
                    </p>
                    <div class="mt-1 flex items-center gap-2">
                      <span
                        class={cn(
                          "rounded px-1.5 py-0.5 text-xs",
                          priorityColors[task.priority],
                        )}
                      >
                        {task.priority === "high" ? "高" : task.priority === "medium" ? "中" : "低"}
                      </span>
                      <span class="text-xs text-gray-500 dark:text-gray-400">
                        {taskStatusLabels[task.status]}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
              {tasks.value.length === 0 && (
                <p class="text-center text-sm text-gray-500 dark:text-gray-400">
                  暂无待办任务
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* 最新通知 */}
        <Card>
          <CardHeader class="flex flex-row items-center justify-between">
            <h3 class="font-semibold text-gray-900 dark:text-white">最新通知</h3>
            <a
              href="/notifications"
              class="text-sm text-blue-600 hover:underline dark:text-blue-400"
            >
              查看全部
            </a>
          </CardHeader>
          <CardContent>
            <div class="space-y-3">
              {notifications.value.slice(0, 5).map((notif) => (
                <div
                  key={notif.id}
                  class={cn(
                    "rounded-lg p-2 hover:bg-gray-50 dark:hover:bg-gray-700/50",
                    !notif.read && "bg-blue-50/50 dark:bg-blue-900/10",
                  )}
                >
                  <div class="flex items-start gap-2">
                    <Bell class="h-4 w-4 mt-0.5 text-gray-400" />
                    <div class="flex-1 min-w-0">
                      <p class="truncate text-sm font-medium text-gray-900 dark:text-white">
                        {notif.title}
                      </p>
                      <p class="truncate text-xs text-gray-500 dark:text-gray-400">
                        {notif.message}
                      </p>
                    </div>
                    {!notif.read && <span class="h-2 w-2 rounded-full bg-blue-500" />}
                  </div>
                </div>
              ))}
              {notifications.value.length === 0 && (
                <p class="text-center text-sm text-gray-500 dark:text-gray-400">
                  暂无新通知
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 快捷操作 */}
      <Card>
        <CardHeader>
          <h3 class="font-semibold text-gray-900 dark:text-white">快捷操作</h3>
        </CardHeader>
        <CardContent>
          <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <a
              href="/users/new"
              class="flex items-center gap-3 rounded-lg border border-gray-200 p-4 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-700/50"
            >
              <div class="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
                <Users class="h-5 w-5" />
              </div>
              <div>
                <p class="font-medium text-gray-900 dark:text-white">添加用户</p>
                <p class="text-sm text-gray-500 dark:text-gray-400">创建新用户</p>
              </div>
            </a>
            <a
              href="/documents/new"
              class="flex items-center gap-3 rounded-lg border border-gray-200 p-4 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-700/50"
            >
              <div class="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400">
                <FileText class="h-5 w-5" />
              </div>
              <div>
                <p class="font-medium text-gray-900 dark:text-white">新建文档</p>
                <p class="text-sm text-gray-500 dark:text-gray-400">创建新文档</p>
              </div>
            </a>
            <a
              href="/calendar"
              class="flex items-center gap-3 rounded-lg border border-gray-200 p-4 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-700/50"
            >
              <div class="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400">
                <Calendar class="h-5 w-5" />
              </div>
              <div>
                <p class="font-medium text-gray-900 dark:text-white">日程安排</p>
                <p class="text-sm text-gray-500 dark:text-gray-400">管理日程</p>
              </div>
            </a>
            <a
              href="/analytics"
              class="flex items-center gap-3 rounded-lg border border-gray-200 p-4 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-700/50"
            >
              <div class="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400">
                <TrendingUp class="h-5 w-5" />
              </div>
              <div>
                <p class="font-medium text-gray-900 dark:text-white">数据分析</p>
                <p class="text-sm text-gray-500 dark:text-gray-400">查看报表</p>
              </div>
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
