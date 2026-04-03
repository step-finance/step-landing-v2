import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatNumber(value: number, options?: Intl.NumberFormatOptions) {
  return new Intl.NumberFormat("en-US", options).format(value);
}

export function formatPercent(value: number, digits = 2) {
  return `${value.toFixed(digits)}%`;
}

export function formatCompact(value: number, digits = 1) {
  return new Intl.NumberFormat("en-US", {
    notation: "compact",
    maximumFractionDigits: digits
  }).format(value);
}

export function formatRelativeTime(iso: string) {
  const target = new Date(iso).getTime();
  const diffMs = Date.now() - target;
  const minutes = Math.max(1, Math.round(diffMs / 60000));

  if (minutes < 60) {
    return `${minutes}m ago`;
  }

  const hours = Math.round(minutes / 60);

  if (hours < 48) {
    return `${hours}h ago`;
  }

  const days = Math.round(hours / 24);
  return `${days}d ago`;
}

export function formatDurationApprox(seconds: number) {
  const years = seconds / (60 * 60 * 24 * 365.25);

  if (years >= 1) {
    return `~${years.toFixed(1)} years`;
  }

  const months = seconds / (60 * 60 * 24 * 30.44);

  if (months >= 1) {
    return `~${months.toFixed(1)} months`;
  }

  const days = seconds / (60 * 60 * 24);
  return `~${Math.max(1, Math.round(days))} days`;
}

export function formatDateTime(iso: string) {
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short"
  }).format(new Date(iso));
}

export function formatAddress(value: string, start = 6, end = 6) {
  if (value.length <= start + end) {
    return value;
  }

  return `${value.slice(0, start)}...${value.slice(-end)}`;
}
