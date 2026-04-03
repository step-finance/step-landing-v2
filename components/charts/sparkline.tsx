import { LineChart } from "@/components/charts/line-chart";

type SparklineProps = {
  points: { value: number; label: string }[];
  color?: string;
};

export function Sparkline({ points, color }: SparklineProps) {
  return (
    <div className="h-14">
      <LineChart points={points} color={color} />
    </div>
  );
}
