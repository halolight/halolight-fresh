// Mock 数据生成工具
import { ROLES } from "@/lib/config.ts";
import type {
  CalendarEvent,
  ChartDataPoint,
  DashboardStats,
  Document,
  FileItem,
  Message,
  Notification,
  Task,
  User,
  UserStatus,
} from "@/lib/types.ts";

// 随机数生成
function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomFloat(min: number, max: number, decimals = 2): number {
  return parseFloat((Math.random() * (max - min) + min).toFixed(decimals));
}

function randomPick<T>(arr: T[]): T {
  return arr[randomInt(0, arr.length - 1)];
}

function randomDate(start: Date, end: Date): Date {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

// 生成 UUID
function uuid(): string {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = Math.random() * 16 | 0;
    const v = c === "x" ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

// 中文名字库
const SURNAMES = [
  "张",
  "李",
  "王",
  "刘",
  "陈",
  "杨",
  "黄",
  "赵",
  "周",
  "吴",
  "徐",
  "孙",
  "马",
  "朱",
  "胡",
];
const GIVEN_NAMES = [
  "伟",
  "芳",
  "娜",
  "秀英",
  "敏",
  "静",
  "丽",
  "强",
  "磊",
  "洋",
  "艳",
  "勇",
  "军",
  "杰",
  "涛",
];

function randomChineseName(): string {
  return randomPick(SURNAMES) + randomPick(GIVEN_NAMES) +
    (Math.random() > 0.5 ? randomPick(GIVEN_NAMES) : "");
}

// 部门列表
const DEPARTMENTS = [
  "技术部",
  "产品部",
  "运营部",
  "市场部",
  "财务部",
  "人事部",
  "行政部",
  "客服部",
];

// 职位列表
const POSITIONS = ["经理", "主管", "专员", "工程师", "设计师", "分析师", "助理", "总监"];

// ==================== Mock 用户 ====================

export function generateMockUser(overrides?: Partial<User>): User {
  const name = randomChineseName();
  const role = randomPick(ROLES);
  const statuses: UserStatus[] = ["active", "inactive", "suspended"];
  const createdAt = randomDate(new Date("2023-01-01"), new Date());

  return {
    id: uuid(),
    name,
    email: `${name.toLowerCase()}@example.com`,
    phone: `1${randomInt(30, 99)}${String(randomInt(10000000, 99999999))}`,
    avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${name}`,
    role,
    status: randomPick(statuses),
    department: randomPick(DEPARTMENTS),
    position: randomPick(POSITIONS),
    createdAt: createdAt.toISOString(),
    lastLoginAt: randomDate(createdAt, new Date()).toISOString(),
    ...overrides,
  };
}

export function generateMockUsers(count: number): User[] {
  return Array.from({ length: count }, () => generateMockUser());
}

// Demo 用户
export const DEMO_USER: User = {
  id: "demo-user-001",
  name: "管理员",
  email: "admin@halolight.h7ml.cn",
  phone: "13800138000",
  avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=admin",
  role: ROLES[0], // admin 角色
  status: "active",
  department: "技术部",
  position: "超级管理员",
  createdAt: "2024-01-01T00:00:00.000Z",
  lastLoginAt: new Date().toISOString(),
};

// ==================== Mock 仪表盘统计 ====================

export function generateMockDashboardStats(): DashboardStats {
  return {
    totalUsers: randomInt(10000, 50000),
    totalRevenue: randomInt(1000000, 10000000),
    totalOrders: randomInt(5000, 20000),
    conversionRate: randomFloat(2, 8),
    userGrowth: randomFloat(-5, 15),
    revenueGrowth: randomFloat(-10, 25),
    orderGrowth: randomFloat(-5, 20),
  };
}

// ==================== Mock 图表数据 ====================

export function generateMockVisitData(days = 30): ChartDataPoint[] {
  const data: ChartDataPoint[] = [];
  const now = new Date();

  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    data.push({
      name: `${date.getMonth() + 1}/${date.getDate()}`,
      value: randomInt(1000, 5000),
      pv: randomInt(2000, 8000),
      uv: randomInt(1000, 5000),
    });
  }

  return data;
}

export function generateMockSalesData(months = 12): ChartDataPoint[] {
  const monthNames = [
    "1月",
    "2月",
    "3月",
    "4月",
    "5月",
    "6月",
    "7月",
    "8月",
    "9月",
    "10月",
    "11月",
    "12月",
  ];

  return monthNames.slice(0, months).map((name) => ({
    name,
    value: randomInt(50000, 200000),
    orders: randomInt(100, 500),
  }));
}

export function generateMockTrafficData(): ChartDataPoint[] {
  return [
    { name: "直接访问", value: randomInt(1000, 5000) },
    { name: "搜索引擎", value: randomInt(2000, 8000) },
    { name: "社交媒体", value: randomInt(500, 3000) },
    { name: "外部链接", value: randomInt(300, 1500) },
    { name: "邮件营销", value: randomInt(200, 1000) },
  ];
}

// ==================== Mock 通知 ====================

const NOTIFICATION_TITLES = [
  "系统更新通知",
  "新用户注册",
  "订单已完成",
  "安全警告",
  "数据备份完成",
  "新消息提醒",
  "任务已分配",
  "审批待处理",
];

export function generateMockNotification(overrides?: Partial<Notification>): Notification {
  const types: Notification["type"][] = ["info", "success", "warning", "error"];
  const title = randomPick(NOTIFICATION_TITLES);

  return {
    id: uuid(),
    title,
    message: `这是一条关于"${title}"的详细说明信息。`,
    type: randomPick(types),
    read: Math.random() > 0.5,
    createdAt: randomDate(new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), new Date()).toISOString(),
    ...overrides,
  };
}

export function generateMockNotifications(count: number): Notification[] {
  return Array.from({ length: count }, () => generateMockNotification());
}

// ==================== Mock 任务 ====================

const TASK_TITLES = [
  "完成项目文档编写",
  "代码审查",
  "修复登录页面BUG",
  "设计新功能原型",
  "优化数据库查询",
  "编写单元测试",
  "准备周会材料",
  "更新API文档",
];

export function generateMockTask(overrides?: Partial<Task>): Task {
  const statuses: Task["status"][] = ["pending", "in_progress", "completed"];
  const priorities: Task["priority"][] = ["low", "medium", "high"];

  return {
    id: uuid(),
    title: randomPick(TASK_TITLES),
    description: "任务详细描述信息...",
    status: randomPick(statuses),
    priority: randomPick(priorities),
    dueDate: randomDate(new Date(), new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)).toISOString(),
    ...overrides,
  };
}

export function generateMockTasks(count: number): Task[] {
  return Array.from({ length: count }, () => generateMockTask());
}

// ==================== Mock 日历事件 ====================

const EVENT_TITLES = [
  "团队周会",
  "项目评审",
  "客户演示",
  "技术分享",
  "面试安排",
  "培训课程",
  "团建活动",
  "发布会议",
];

export function generateMockCalendarEvent(overrides?: Partial<CalendarEvent>): CalendarEvent {
  const colors = ["#3b82f6", "#ef4444", "#10b981", "#f59e0b", "#8b5cf6", "#ec4899"];
  const start = randomDate(new Date(), new Date(Date.now() + 7 * 24 * 60 * 60 * 1000));
  const end = new Date(start.getTime() + randomInt(1, 4) * 60 * 60 * 1000);

  return {
    id: uuid(),
    title: randomPick(EVENT_TITLES),
    description: "事件详细描述...",
    start: start.toISOString(),
    end: end.toISOString(),
    allDay: Math.random() > 0.8,
    color: randomPick(colors),
    ...overrides,
  };
}

export function generateMockCalendarEvents(count: number): CalendarEvent[] {
  return Array.from({ length: count }, () => generateMockCalendarEvent());
}

// ==================== Mock 消息 ====================

export function generateMockMessage(sender: User, receiver: User): Message {
  const messages = [
    "你好，请问项目进度如何？",
    "我已经完成了文档更新。",
    "明天上午有空开个简短的会议吗？",
    "收到，我会尽快处理。",
    "数据报告已经发送到你的邮箱。",
    "有时间的话我们可以讨论一下方案。",
  ];

  return {
    id: uuid(),
    content: randomPick(messages),
    sender,
    receiver,
    read: Math.random() > 0.3,
    createdAt: randomDate(new Date(Date.now() - 24 * 60 * 60 * 1000), new Date()).toISOString(),
  };
}

// ==================== Mock 文档 ====================

const DOC_TITLES = [
  "项目需求文档",
  "技术架构设计",
  "API接口文档",
  "用户使用手册",
  "运维部署指南",
  "测试用例文档",
  "会议纪要",
  "产品规划方案",
];

const DOC_CATEGORIES = ["技术文档", "产品文档", "运营文档", "会议记录", "规范指南"];

export function generateMockDocument(author?: User): Document {
  const statuses: Document["status"][] = ["draft", "published", "archived"];
  const createdAt = randomDate(new Date("2024-01-01"), new Date());

  return {
    id: uuid(),
    title: randomPick(DOC_TITLES),
    content: "文档内容...",
    category: randomPick(DOC_CATEGORIES),
    tags: ["标签1", "标签2"],
    author: author ?? generateMockUser(),
    status: randomPick(statuses),
    createdAt: createdAt.toISOString(),
    updatedAt: randomDate(createdAt, new Date()).toISOString(),
  };
}

export function generateMockDocuments(count: number): Document[] {
  return Array.from({ length: count }, () => generateMockDocument());
}

// ==================== Mock 文件 ====================

const FILE_NAMES = [
  "项目计划.xlsx",
  "设计稿.psd",
  "演示文稿.pptx",
  "需求文档.docx",
  "数据报表.pdf",
  "代码压缩包.zip",
  "图片素材.png",
  "视频教程.mp4",
];

const FILE_TYPES = ["xlsx", "psd", "pptx", "docx", "pdf", "zip", "png", "mp4"];

export function generateMockFile(uploadedBy?: User): FileItem {
  const name = randomPick(FILE_NAMES);

  return {
    id: uuid(),
    name,
    type: name.split(".").pop() ?? "unknown",
    size: randomInt(1024, 10 * 1024 * 1024),
    url: `/files/${name}`,
    folder: randomPick(["项目文件", "设计资源", "文档资料", "其他"]),
    uploadedBy: uploadedBy ?? generateMockUser(),
    createdAt: randomDate(new Date("2024-01-01"), new Date()).toISOString(),
  };
}

export function generateMockFiles(count: number): FileItem[] {
  return Array.from({ length: count }, () => generateMockFile());
}

// ==================== 导出所有 Mock 数据 ====================

export const mockData = {
  user: DEMO_USER,
  users: generateMockUsers(20),
  stats: generateMockDashboardStats(),
  visitData: generateMockVisitData(),
  salesData: generateMockSalesData(),
  trafficData: generateMockTrafficData(),
  notifications: generateMockNotifications(10),
  tasks: generateMockTasks(8),
  events: generateMockCalendarEvents(5),
  documents: generateMockDocuments(15),
  files: generateMockFiles(12),
};
