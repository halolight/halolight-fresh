// 权限类型定义
export type Permission =
  // 仪表盘
  | "dashboard:view"
  | "dashboard:edit"
  // 用户管理
  | "users:view"
  | "users:create"
  | "users:edit"
  | "users:delete"
  // 数据分析
  | "analytics:view"
  | "analytics:export"
  // 系统设置
  | "settings:view"
  | "settings:edit"
  // 文档和文件
  | "documents:view"
  | "documents:create"
  | "documents:edit"
  | "documents:delete"
  | "files:view"
  | "files:upload"
  | "files:delete"
  // 消息和日程
  | "messages:view"
  | "messages:send"
  | "calendar:view"
  | "calendar:edit"
  // 通知
  | "notifications:view"
  | "notifications:manage"
  // 超级权限
  | "*";

// 角色定义
export interface Role {
  id: string;
  name: string;
  label: string;
  description?: string;
  permissions: Permission[];
}

// 用户状态
export type UserStatus = "active" | "inactive" | "suspended";

// 用户定义
export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
  role: Role;
  status: UserStatus;
  department?: string;
  position?: string;
  createdAt: string;
  lastLoginAt?: string;
}

// 认证相关
export interface LoginRequest {
  email: string;
  password: string;
  remember?: boolean;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface AuthResponse {
  user: User;
  token: string;
  refreshToken?: string;
  expiresIn: number;
}

// 主题类型
export type ThemeMode = "light" | "dark" | "system";

// 皮肤类型
export type SkinType =
  | "default"
  | "zinc"
  | "slate"
  | "stone"
  | "gray"
  | "neutral"
  | "red"
  | "rose"
  | "orange"
  | "green"
  | "blue"
  | "yellow"
  | "violet";

// API 响应格式
export interface ApiResponse<T> {
  code: number;
  message: string;
  data: T;
}

// 分页响应
export interface PaginatedResponse<T> {
  list: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

// 分页请求参数
export interface PaginationParams {
  page?: number;
  pageSize?: number;
  search?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

// 菜单项定义
export interface MenuItem {
  title: string;
  icon?: string;
  href: string;
  permission?: Permission;
  children?: MenuItem[];
  badge?: string | number;
}

// 仪表盘小部件定义
export interface DashboardWidget {
  id: string;
  type: WidgetType;
  title: string;
  description?: string;
  visible: boolean;
  settings?: Record<string, unknown>;
}

export type WidgetType =
  | "stats"
  | "chart-line"
  | "chart-bar"
  | "chart-pie"
  | "recent-users"
  | "notifications"
  | "tasks"
  | "calendar"
  | "quick-actions";

// 仪表盘布局定义
export interface WidgetLayout {
  i: string;
  x: number;
  y: number;
  w: number;
  h: number;
  minW?: number;
  minH?: number;
  maxW?: number;
  maxH?: number;
}

// 统计数据
export interface DashboardStats {
  totalUsers: number;
  totalRevenue: number;
  totalOrders: number;
  conversionRate: number;
  userGrowth: number;
  revenueGrowth: number;
  orderGrowth: number;
}

// 图表数据
export interface ChartDataPoint {
  name: string;
  value: number;
  [key: string]: string | number;
}

// 通知类型
export interface Notification {
  id: string;
  title: string;
  message: string;
  type: "info" | "success" | "warning" | "error";
  read: boolean;
  createdAt: string;
}

// 任务类型
export interface Task {
  id: string;
  title: string;
  description?: string;
  status: "pending" | "in_progress" | "completed";
  priority: "low" | "medium" | "high";
  dueDate?: string;
  assignee?: User;
}

// 日历事件
export interface CalendarEvent {
  id: string;
  title: string;
  description?: string;
  start: string;
  end: string;
  allDay?: boolean;
  color?: string;
}

// 消息类型
export interface Message {
  id: string;
  content: string;
  sender: User;
  receiver: User;
  read: boolean;
  createdAt: string;
}

// 文档类型
export interface Document {
  id: string;
  title: string;
  content: string;
  category: string;
  tags: string[];
  author: User;
  status: "draft" | "published" | "archived";
  createdAt: string;
  updatedAt: string;
}

// 文件类型
export interface FileItem {
  id: string;
  name: string;
  type: string;
  size: number;
  url: string;
  folder?: string;
  uploadedBy: User;
  createdAt: string;
}
