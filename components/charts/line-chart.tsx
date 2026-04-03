import { useId } from "react";

import { cn } from "@/lib/utils";

type LineChartProps = {
  points: { value: number; label: string }[];
  color?: string;
  className?: string;
};

export function LineChart({
  points,
  color = "#00F8B7",
  className
}: LineChartProps) {
  const gradientId = useId();

  if (points.length === 0) {
    return null;
  }

  const values = points.map((point) => point.value);
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = Math.max(1, max - min);

  const coordinates = points
    .map((point, index) => {
      const x = (index / Math.max(1, points.length - 1)) * 100;
      const y = 48 - ((point.value - min) / range) * 44 - 2;
      return `${x},${y}`;
    })
    .join(" ");

  const fillCoordinates = `0,48 ${coordinates} 100,48`;

  return (
    <svg
      viewBox="0 0 100 48"
      preserveAspectRatio="none"
      className={cn("h-full w-full", className)}
      role="img"
      aria-label="Line chart"
    >
      <defs>
        <linearGradient id={gradientId} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={color} stopOpacity="0.35" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={`M ${fillCoordinates}`} fill={`url(#${gradientId})`} />
      <polyline
        fill="none"
        stroke={color}
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
        points={coordinates}
      />
    </svg>
  );
}
