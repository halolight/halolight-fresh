import type { ComponentChildren } from "preact";
import { APP_CONFIG } from "@/lib/config.ts";

interface FooterProps {
  class?: string;
}

export function Footer({ class: className }: FooterProps) {
  return (
    <footer
      class={`border-t border-gray-200 bg-white px-6 py-4 dark:border-gray-700 dark:bg-gray-800 ${
        className ?? ""
      }`}
    >
      <div class="flex flex-col items-center justify-between gap-2 text-sm text-gray-500 dark:text-gray-400 sm:flex-row">
        <p>
          &copy; {new Date().getFullYear()} {APP_CONFIG.name}. All rights reserved.
        </p>
        <div class="flex items-center gap-4">
          <a
            href="https://halolight.docs.h7ml.cn/"
            target="_blank"
            rel="noopener noreferrer"
            class="hover:text-gray-900 dark:hover:text-gray-200"
          >
            在线文档
          </a>
          <a
            href="/terms"
            class="hover:text-gray-900 dark:hover:text-gray-200"
          >
            服务条款
          </a>
          <a
            href="/privacy"
            class="hover:text-gray-900 dark:hover:text-gray-200"
          >
            隐私政策
          </a>
          <a
            href={APP_CONFIG.repository}
            target="_blank"
            rel="noopener noreferrer"
            class="hover:text-gray-900 dark:hover:text-gray-200"
          >
            GitHub
          </a>
        </div>
      </div>
    </footer>
  );
}

interface PageHeaderProps {
  title: string;
  description?: string;
  children?: ComponentChildren;
}

export function PageHeader({ title, description, children }: PageHeaderProps) {
  return (
    <div class="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 class="text-2xl font-bold text-gray-900 dark:text-white">{title}</h1>
        {description && <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">{description}</p>}
      </div>
      {children && <div class="flex items-center gap-3">{children}</div>}
    </div>
  );
}

interface EmptyStateProps {
  icon?: ComponentChildren;
  title: string;
  description?: string;
  action?: ComponentChildren;
}

export function EmptyState({ icon, title, description, action }: EmptyStateProps) {
  return (
    <div class="flex flex-col items-center justify-center py-12 text-center">
      {icon && (
        <div class="mb-4 text-gray-400 dark:text-gray-500">
          {icon}
        </div>
      )}
      <h3 class="text-lg font-medium text-gray-900 dark:text-white">{title}</h3>
      {description && <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">{description}</p>}
      {action && <div class="mt-4">{action}</div>}
    </div>
  );
}

interface LoadingStateProps {
  message?: string;
}

export function LoadingState({ message = "加载中..." }: LoadingStateProps) {
  return (
    <div class="flex flex-col items-center justify-center py-12">
      <div class="h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />
      <p class="mt-4 text-sm text-gray-500 dark:text-gray-400">{message}</p>
    </div>
  );
}

interface StatCardProps {
  title: string;
  value: string | number;
  change?: number;
  icon?: ComponentChildren;
  trend?: "up" | "down" | "neutral";
}

export function StatCard({ title, value, change, icon, trend = "neutral" }: StatCardProps) {
  const trendColors = {
    up: "text-green-600 dark:text-green-400",
    down: "text-red-600 dark:text-red-400",
    neutral: "text-gray-600 dark:text-gray-400",
  };

  return (
    <div class="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
      <div class="flex items-center justify-between">
        <p class="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</p>
        {icon && <div class="text-gray-400 dark:text-gray-500">{icon}</div>}
      </div>
      <div class="mt-2 flex items-baseline gap-2">
        <p class="text-2xl font-bold text-gray-900 dark:text-white">{value}</p>
        {change !== undefined && (
          <span class={`text-sm font-medium ${trendColors[trend]}`}>
            {change > 0 ? "+" : ""}
            {change}%
          </span>
        )}
      </div>
    </div>
  );
}

interface DropdownMenuProps {
  trigger: ComponentChildren;
  children: ComponentChildren;
  align?: "left" | "right";
}

export function DropdownMenu({ trigger, children, align = "right" }: DropdownMenuProps) {
  return (
    <div class="relative inline-block">
      {trigger}
      <div
        class={`absolute top-full mt-2 min-w-[200px] rounded-lg border border-gray-200 bg-white py-1 shadow-lg dark:border-gray-700 dark:bg-gray-800 ${
          align === "right" ? "right-0" : "left-0"
        }`}
      >
        {children}
      </div>
    </div>
  );
}

interface DropdownItemProps {
  icon?: ComponentChildren;
  children: ComponentChildren;
  danger?: boolean;
  onClick?: () => void;
  href?: string;
}

export function DropdownItem({ icon, children, danger, onClick, href }: DropdownItemProps) {
  const className = `flex w-full items-center gap-2 px-4 py-2 text-sm ${
    danger
      ? "text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20"
      : "text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700"
  }`;

  if (href) {
    return (
      <a href={href} class={className}>
        {icon}
        {children}
      </a>
    );
  }

  return (
    <button type="button" class={className} onClick={onClick}>
      {icon}
      {children}
    </button>
  );
}

interface TableProps {
  children: ComponentChildren;
}

export function Table({ children }: TableProps) {
  return (
    <div class="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700">
      <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        {children}
      </table>
    </div>
  );
}

export function TableHeader({ children }: TableProps) {
  return (
    <thead class="bg-gray-50 dark:bg-gray-800/50">
      {children}
    </thead>
  );
}

export function TableBody({ children }: TableProps) {
  return (
    <tbody class="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-800">
      {children}
    </tbody>
  );
}

interface TableCellProps {
  children: ComponentChildren;
  header?: boolean;
  class?: string;
}

export function TableCell({ children, header, class: className }: TableCellProps) {
  const baseClass = "px-4 py-3 text-sm";
  const cellClass = header
    ? `${baseClass} font-medium text-gray-900 dark:text-white`
    : `${baseClass} text-gray-600 dark:text-gray-300`;

  if (header) {
    return <th class={`${cellClass} ${className ?? ""}`}>{children}</th>;
  }

  return <td class={`${cellClass} ${className ?? ""}`}>{children}</td>;
}

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  const visiblePages = pages.filter(
    (p) => p === 1 || p === totalPages || Math.abs(p - currentPage) <= 1,
  );

  return (
    <div class="flex items-center justify-center gap-1">
      <button
        type="button"
        class="rounded-lg px-3 py-2 text-sm text-gray-600 hover:bg-gray-100 disabled:opacity-50 dark:text-gray-300 dark:hover:bg-gray-700"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        上一页
      </button>

      {visiblePages.map((page, index) => {
        const prevPage = visiblePages[index - 1];
        const showEllipsis = prevPage && page - prevPage > 1;

        return (
          <>
            {showEllipsis && <span class="px-2 text-gray-400">...</span>}
            <button
              type="button"
              class={`rounded-lg px-3 py-2 text-sm ${
                page === currentPage
                  ? "bg-blue-600 text-white"
                  : "text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
              }`}
              onClick={() => onPageChange(page)}
            >
              {page}
            </button>
          </>
        );
      })}

      <button
        type="button"
        class="rounded-lg px-3 py-2 text-sm text-gray-600 hover:bg-gray-100 disabled:opacity-50 dark:text-gray-300 dark:hover:bg-gray-700"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        下一页
      </button>
    </div>
  );
}
