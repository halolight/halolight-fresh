import type { ComponentChildren, JSX } from "preact";
import { cn } from "@/lib/utils.ts";

// deno-lint-ignore no-explicit-any
type InputAttributes = JSX.HTMLAttributes<HTMLInputElement> & Record<string, any>;

interface InputProps extends InputAttributes {
  label?: string;
  error?: string;
  icon?: ComponentChildren;
  iconPosition?: "left" | "right";
}

export function Input({
  label,
  error,
  icon,
  iconPosition = "left",
  class: className,
  id,
  ...props
}: InputProps) {
  const inputId = id || `input-${Math.random().toString(36).substring(2, 9)}`;

  return (
    <div class="space-y-1.5">
      {label && (
        <label
          for={inputId}
          class="block text-sm font-medium text-gray-700 dark:text-gray-200"
        >
          {label}
        </label>
      )}
      <div class="relative">
        {icon && iconPosition === "left" && (
          <div class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500">
            {icon}
          </div>
        )}
        <input
          id={inputId}
          class={cn(
            "w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-gray-900",
            "placeholder:text-gray-400",
            "focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20",
            "disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500",
            "dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:placeholder:text-gray-500",
            "dark:focus:border-blue-400 dark:focus:ring-blue-400/20",
            "transition-colors duration-200",
            icon && iconPosition === "left" && "pl-10",
            icon && iconPosition === "right" && "pr-10",
            error && "border-red-500 focus:border-red-500 focus:ring-red-500/20",
            className,
          )}
          {...props}
        />
        {icon && iconPosition === "right" && (
          <div class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500">
            {icon}
          </div>
        )}
      </div>
      {error && <p class="text-sm text-red-500">{error}</p>}
    </div>
  );
}

interface ButtonProps extends JSX.HTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
  icon?: ComponentChildren;
  iconPosition?: "left" | "right";
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

export function Button({
  variant = "primary",
  size = "md",
  loading = false,
  icon,
  iconPosition = "left",
  class: className,
  children,
  disabled,
  ...props
}: ButtonProps) {
  const variants = {
    primary:
      "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500/50 dark:bg-blue-500 dark:hover:bg-blue-600",
    secondary:
      "bg-gray-100 text-gray-900 hover:bg-gray-200 focus:ring-gray-500/50 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600",
    outline:
      "border border-gray-300 bg-transparent text-gray-700 hover:bg-gray-50 focus:ring-gray-500/50 dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-800",
    ghost:
      "bg-transparent text-gray-700 hover:bg-gray-100 focus:ring-gray-500/50 dark:text-gray-200 dark:hover:bg-gray-800",
    danger:
      "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500/50 dark:bg-red-500 dark:hover:bg-red-600",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2.5 text-sm",
    lg: "px-6 py-3 text-base",
  };

  return (
    <button
      class={cn(
        "inline-flex items-center justify-center gap-2 rounded-lg font-medium",
        "focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-gray-900",
        "disabled:cursor-not-allowed disabled:opacity-50",
        "transition-colors duration-200",
        variants[variant],
        sizes[size],
        className,
      )}
      disabled={disabled || loading}
      {...props}
    >
      {loading
        ? (
          <svg
            class="h-4 w-4 animate-spin"
            viewBox="0 0 24 24"
            fill="none"
          >
            <circle
              class="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              stroke-width="4"
            />
            <path
              class="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )
        : (
          icon && iconPosition === "left" && icon
        )}
      {children}
      {!loading && icon && iconPosition === "right" && icon}
    </button>
  );
}

interface CheckboxProps extends Omit<JSX.HTMLAttributes<HTMLInputElement>, "type" | "label"> {
  label?: string | ComponentChildren;
  checked?: boolean;
  onChange?: (e: Event) => void;
}

export function Checkbox({ label, class: className, id, ...props }: CheckboxProps) {
  const checkboxId = id || `checkbox-${Math.random().toString(36).substring(2, 9)}`;

  return (
    <div class="flex items-center gap-2">
      <input
        type="checkbox"
        id={checkboxId}
        class={cn(
          "h-4 w-4 rounded border-gray-300 text-blue-600",
          "focus:ring-2 focus:ring-blue-500/20",
          "dark:border-gray-600 dark:bg-gray-800",
          className,
        )}
        {...props}
      />
      {label && (
        <label
          for={checkboxId}
          class="text-sm text-gray-600 dark:text-gray-300"
        >
          {label}
        </label>
      )}
    </div>
  );
}

interface CardProps {
  class?: string;
  children: ComponentChildren;
}

export function Card({ class: className, children }: CardProps) {
  return (
    <div
      class={cn(
        "rounded-xl border border-gray-200 bg-white shadow-sm",
        "dark:border-gray-700 dark:bg-gray-800",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function CardHeader({ class: className, children }: CardProps) {
  return (
    <div class={cn("border-b border-gray-200 p-6 dark:border-gray-700", className)}>{children}</div>
  );
}

export function CardContent({ class: className, children }: CardProps) {
  return <div class={cn("p-6", className)}>{children}</div>;
}

export function CardFooter({ class: className, children }: CardProps) {
  return (
    <div class={cn("border-t border-gray-200 p-6 dark:border-gray-700", className)}>{children}</div>
  );
}

interface AlertProps {
  type?: "info" | "success" | "warning" | "error";
  title?: string;
  message: string;
  class?: string;
}

export function Alert({ type = "info", title, message, class: className }: AlertProps) {
  const styles = {
    info:
      "bg-blue-50 text-blue-800 border-blue-200 dark:bg-blue-900/20 dark:text-blue-300 dark:border-blue-800",
    success:
      "bg-green-50 text-green-800 border-green-200 dark:bg-green-900/20 dark:text-green-300 dark:border-green-800",
    warning:
      "bg-yellow-50 text-yellow-800 border-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-300 dark:border-yellow-800",
    error:
      "bg-red-50 text-red-800 border-red-200 dark:bg-red-900/20 dark:text-red-300 dark:border-red-800",
  };

  return (
    <div class={cn("rounded-lg border p-4", styles[type], className)}>
      {title && <p class="mb-1 font-medium">{title}</p>}
      <p class="text-sm">{message}</p>
    </div>
  );
}

interface BadgeProps {
  variant?: "default" | "success" | "warning" | "error" | "info";
  class?: string;
  children: ComponentChildren;
}

export function Badge({ variant = "default", class: className, children }: BadgeProps) {
  const variants = {
    default: "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200",
    success: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
    warning: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300",
    error: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300",
    info: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
  };

  return (
    <span
      class={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
        variants[variant],
        className,
      )}
    >
      {children}
    </span>
  );
}

interface AvatarProps {
  src?: string;
  alt?: string;
  name?: string;
  size?: "sm" | "md" | "lg" | "xl";
  class?: string;
}

export function Avatar({ src, alt, name, size = "md", class: className }: AvatarProps) {
  const sizes = {
    sm: "h-8 w-8 text-xs",
    md: "h-10 w-10 text-sm",
    lg: "h-12 w-12 text-base",
    xl: "h-16 w-16 text-lg",
  };

  if (src) {
    return (
      <img
        src={src}
        alt={alt || name}
        class={cn("rounded-full object-cover", sizes[size], className)}
      />
    );
  }

  // 生成首字母头像
  const initials = name
    ?.split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2) || "?";

  return (
    <div
      class={cn(
        "flex items-center justify-center rounded-full bg-blue-500 font-medium text-white",
        sizes[size],
        className,
      )}
    >
      {initials}
    </div>
  );
}

interface SkeletonProps {
  class?: string;
}

export function Skeleton({ class: className }: SkeletonProps) {
  return <div class={cn("animate-pulse rounded-lg bg-gray-200 dark:bg-gray-700", className)} />;
}

interface SpinnerProps {
  size?: "sm" | "md" | "lg";
  class?: string;
}

export function Spinner({ size = "md", class: className }: SpinnerProps) {
  const sizes = {
    sm: "h-4 w-4",
    md: "h-6 w-6",
    lg: "h-8 w-8",
  };

  return (
    <svg
      class={cn("animate-spin text-blue-600", sizes[size], className)}
      viewBox="0 0 24 24"
      fill="none"
    >
      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
      <path
        class="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );
}
