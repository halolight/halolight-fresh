import type { ComponentChildren } from "preact";
import Sidebar from "@/islands/Sidebar.tsx";
import Header from "@/islands/Header.tsx";
import { Footer } from "@/components/layout.tsx";
import { uiSettings } from "@/lib/stores.ts";
import { cn } from "@/lib/utils.ts";

interface AdminLayoutProps {
  title?: string;
  currentPath: string;
  children: ComponentChildren;
  showFooter?: boolean;
}

export default function AdminLayout({
  title,
  currentPath,
  children,
  showFooter = true,
}: AdminLayoutProps) {
  const collapsed = uiSettings.value.sidebarCollapsed;

  return (
    <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar currentPath={currentPath} />

      <div
        class={cn(
          "flex min-h-screen flex-col transition-all duration-300",
          collapsed ? "lg:ml-16" : "lg:ml-64",
        )}
      >
        <Header title={title} />

        <main class="flex-1 p-4 lg:p-6">
          {children}
        </main>

        {showFooter && <Footer />}
      </div>
    </div>
  );
}
