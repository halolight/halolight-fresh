// API 服务层
import { DEMO_USER, generateMockUsers, mockData } from "@/mock/data.ts";
import type {
  ApiResponse,
  AuthResponse,
  DashboardStats,
  Document,
  FileItem,
  LoginRequest,
  Notification,
  PaginatedResponse,
  PaginationParams,
  RegisterRequest,
  Task,
  User,
} from "@/lib/types.ts";

// 模拟网络延迟
function delay(ms = 300): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// 生成响应
function success<T>(data: T): ApiResponse<T> {
  return { code: 200, message: "success", data };
}

function error<T = null>(message: string, code = 400): ApiResponse<T> {
  return { code, message, data: null as T };
}

// ==================== 认证 API ====================

export const authApi = {
  // 登录
  async login(data: LoginRequest): Promise<ApiResponse<AuthResponse>> {
    await delay(500);

    // Demo 账号验证
    if (data.email === "admin@halolight.h7ml.cn" && data.password === "123456") {
      return success({
        user: DEMO_USER,
        token: `mock-token-${Date.now()}`,
        refreshToken: `mock-refresh-${Date.now()}`,
        expiresIn: 7 * 24 * 60 * 60, // 7 天
      });
    }

    // 模拟其他用户登录
    if (data.email && data.password.length >= 6) {
      const user: User = {
        ...DEMO_USER,
        id: `user-${Date.now()}`,
        email: data.email,
        name: data.email.split("@")[0],
      };
      return success({
        user,
        token: `mock-token-${Date.now()}`,
        refreshToken: `mock-refresh-${Date.now()}`,
        expiresIn: 7 * 24 * 60 * 60,
      });
    }

    return error("邮箱或密码错误", 401);
  },

  // 注册
  async register(data: RegisterRequest): Promise<ApiResponse<AuthResponse>> {
    await delay(500);

    if (data.password !== data.confirmPassword) {
      return error("两次输入的密码不一致");
    }

    const user: User = {
      ...DEMO_USER,
      id: `user-${Date.now()}`,
      email: data.email,
      name: data.name,
    };

    return success({
      user,
      token: `mock-token-${Date.now()}`,
      refreshToken: `mock-refresh-${Date.now()}`,
      expiresIn: 7 * 24 * 60 * 60,
    });
  },

  // 忘记密码
  async forgotPassword(email: string): Promise<ApiResponse<{ message: string }>> {
    await delay(500);
    return success({ message: `重置密码链接已发送到 ${email}` });
  },

  // 重置密码
  async resetPassword(
    _token: string,
    _password: string,
  ): Promise<ApiResponse<{ message: string }>> {
    await delay(500);
    return success({ message: "密码重置成功" });
  },

  // 登出
  async logout(): Promise<ApiResponse<null>> {
    await delay(200);
    return success(null);
  },

  // 获取当前用户
  async getCurrentUser(): Promise<ApiResponse<User>> {
    await delay(300);
    return success(DEMO_USER);
  },
};

// ==================== 用户 API ====================

export const userApi = {
  // 获取用户列表
  async getUsers(params: PaginationParams = {}): Promise<ApiResponse<PaginatedResponse<User>>> {
    await delay(400);

    const { page = 1, pageSize = 10, search = "", sortBy = "createdAt", sortOrder = "desc" } =
      params;

    let users = [...mockData.users];

    // 搜索过滤
    if (search) {
      const keyword = search.toLowerCase();
      users = users.filter(
        (u) => u.name.toLowerCase().includes(keyword) || u.email.toLowerCase().includes(keyword),
      );
    }

    // 排序
    users.sort((a, b) => {
      const aVal = a[sortBy as keyof User] ?? "";
      const bVal = b[sortBy as keyof User] ?? "";
      const comparison = String(aVal).localeCompare(String(bVal));
      return sortOrder === "desc" ? -comparison : comparison;
    });

    // 分页
    const total = users.length;
    const totalPages = Math.ceil(total / pageSize);
    const start = (page - 1) * pageSize;
    const list = users.slice(start, start + pageSize);

    return success({ list, total, page, pageSize, totalPages });
  },

  // 获取单个用户
  async getUser(id: string): Promise<ApiResponse<User | null>> {
    await delay(300);
    const user = mockData.users.find((u) => u.id === id);
    if (!user) return error("用户不存在", 404);
    return success(user);
  },

  // 创建用户
  async createUser(data: Partial<User>): Promise<ApiResponse<User>> {
    await delay(400);
    const newUser = { ...DEMO_USER, ...data, id: `user-${Date.now()}` };
    mockData.users.unshift(newUser);
    return success(newUser);
  },

  // 更新用户
  async updateUser(id: string, data: Partial<User>): Promise<ApiResponse<User>> {
    await delay(400);
    const index = mockData.users.findIndex((u) => u.id === id);
    if (index === -1) return error("用户不存在", 404);

    mockData.users[index] = { ...mockData.users[index], ...data };
    return success(mockData.users[index]);
  },

  // 删除用户
  async deleteUser(id: string): Promise<ApiResponse<null>> {
    await delay(300);
    const index = mockData.users.findIndex((u) => u.id === id);
    if (index === -1) return error("用户不存在", 404);

    mockData.users.splice(index, 1);
    return success(null);
  },
};

// ==================== 仪表盘 API ====================

export const dashboardApi = {
  // 获取统计数据
  async getStats(): Promise<ApiResponse<DashboardStats>> {
    await delay(300);
    return success(mockData.stats);
  },

  // 获取访问趋势
  async getVisitData(): Promise<ApiResponse<typeof mockData.visitData>> {
    await delay(300);
    return success(mockData.visitData);
  },

  // 获取销售数据
  async getSalesData(): Promise<ApiResponse<typeof mockData.salesData>> {
    await delay(300);
    return success(mockData.salesData);
  },

  // 获取流量占比
  async getTrafficData(): Promise<ApiResponse<typeof mockData.trafficData>> {
    await delay(300);
    return success(mockData.trafficData);
  },

  // 获取最近用户
  async getRecentUsers(): Promise<ApiResponse<User[]>> {
    await delay(300);
    return success(mockData.users.slice(0, 5));
  },
};

// ==================== 通知 API ====================

export const notificationApi = {
  // 获取通知列表
  async getNotifications(): Promise<ApiResponse<Notification[]>> {
    await delay(300);
    return success(mockData.notifications);
  },

  // 标记已读
  async markAsRead(id: string): Promise<ApiResponse<null>> {
    await delay(200);
    const notification = mockData.notifications.find((n) => n.id === id);
    if (notification) notification.read = true;
    return success(null);
  },

  // 标记全部已读
  async markAllAsRead(): Promise<ApiResponse<null>> {
    await delay(200);
    mockData.notifications.forEach((n) => (n.read = true));
    return success(null);
  },

  // 获取未读数量
  async getUnreadCount(): Promise<ApiResponse<number>> {
    await delay(100);
    const count = mockData.notifications.filter((n) => !n.read).length;
    return success(count);
  },
};

// ==================== 任务 API ====================

export const taskApi = {
  // 获取任务列表
  async getTasks(): Promise<ApiResponse<Task[]>> {
    await delay(300);
    return success(mockData.tasks);
  },

  // 更新任务状态
  async updateTaskStatus(id: string, status: Task["status"]): Promise<ApiResponse<Task>> {
    await delay(200);
    const task = mockData.tasks.find((t) => t.id === id);
    if (!task) return error("任务不存在", 404);

    task.status = status;
    return success(task);
  },
};

// ==================== 文档 API ====================

export const documentApi = {
  // 获取文档列表
  async getDocuments(
    params: PaginationParams = {},
  ): Promise<ApiResponse<PaginatedResponse<Document>>> {
    await delay(400);

    const { page = 1, pageSize = 10, search = "" } = params;

    let documents = [...mockData.documents];

    if (search) {
      const keyword = search.toLowerCase();
      documents = documents.filter(
        (d) =>
          d.title.toLowerCase().includes(keyword) || d.category.toLowerCase().includes(keyword),
      );
    }

    const total = documents.length;
    const totalPages = Math.ceil(total / pageSize);
    const start = (page - 1) * pageSize;
    const list = documents.slice(start, start + pageSize);

    return success({ list, total, page, pageSize, totalPages });
  },

  // 获取单个文档
  async getDocument(id: string): Promise<ApiResponse<Document | null>> {
    await delay(300);
    const doc = mockData.documents.find((d) => d.id === id);
    if (!doc) return error("文档不存在", 404);
    return success(doc);
  },
};

// ==================== 文件 API ====================

export const fileApi = {
  // 获取文件列表
  async getFiles(params: PaginationParams = {}): Promise<ApiResponse<PaginatedResponse<FileItem>>> {
    await delay(400);

    const { page = 1, pageSize = 10, search = "" } = params;

    let files = [...mockData.files];

    if (search) {
      const keyword = search.toLowerCase();
      files = files.filter((f) => f.name.toLowerCase().includes(keyword));
    }

    const total = files.length;
    const totalPages = Math.ceil(total / pageSize);
    const start = (page - 1) * pageSize;
    const list = files.slice(start, start + pageSize);

    return success({ list, total, page, pageSize, totalPages });
  },
};

// ==================== 日历 API ====================

export const calendarApi = {
  // 获取日历事件
  async getEvents(): Promise<ApiResponse<typeof mockData.events>> {
    await delay(300);
    return success(mockData.events);
  },
};
