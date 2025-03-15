/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  Area,
} from "recharts";

// Types for the data
interface CommitRepo {
  name: string;
  count: number;
}

interface DailyCommit {
  date: string;
  count: number;
  repos: CommitRepo[];
}

interface ChartProps {
  data?: DailyCommit[];
  loading?: boolean;
  username?: string;
}

const CyberpunkCommitChart: React.FC<ChartProps> = ({
  data = [],
  username = "mvykool",
}) => {
  const [chartData, setChartData] = useState<any[]>([]);
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const [totalCommits, setTotalCommits] = useState(0);
  const [visibleRange, setVisibleRange] = useState<{
    start: number;
    end: number;
  }>({ start: 0, end: 30 });

  useEffect(() => {
    if (data.length > 0) {
      // Process data to add normalized values and display formats
      const maxCount = Math.max(...data.map((day) => day.count));

      const processed = data.map((day, index) => {
        const date = new Date(day.date);
        return {
          ...day,
          displayDate: `${date.getMonth() + 1}/${date.getDate()}`,
          activity: maxCount > 0 ? day.count / maxCount : 0,
          index,
        };
      });

      setChartData(processed);
      setTotalCommits(data.reduce((sum, day) => sum + day.count, 0));

      // Set default visible range to the last 30 days
      if (processed.length > 30) {
        setVisibleRange({
          start: processed.length - 30,
          end: processed.length,
        });
      } else {
        setVisibleRange({
          start: 0,
          end: processed.length,
        });
      }
    }
  }, [data]);

  // Get visible data for the chart
  const visibleData = chartData.slice(visibleRange.start, visibleRange.end);

  const handleViewAll = () => {
    setVisibleRange({
      start: 0,
      end: chartData.length,
    });
  };

  const handleViewMonth = () => {
    if (chartData.length > 30) {
      setVisibleRange({
        start: chartData.length - 30,
        end: chartData.length,
      });
    } else {
      setVisibleRange({
        start: 0,
        end: chartData.length,
      });
    }
  };

  // Custom tooltip component
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-black bg-opacity-90 text-green-400 p-3 border border-green-500 rounded shadow-lg backdrop-blur-sm">
          <div className="border-b border-green-500 pb-2 mb-2">
            <p className="font-mono text-sm">{data.date}</p>
            <p className="font-bold text-xl">
              {data.count} commit{data.count !== 1 ? "s" : ""}
            </p>
          </div>

          {data.repos.length > 0 ? (
            <div>
              <p className="text-xs uppercase tracking-wider text-green-300 mb-1">
                Repositories:
              </p>
              <ul className="space-y-1">
                {data.repos.slice(0, 3).map((repo: CommitRepo, i: number) => (
                  <li key={i} className="text-sm flex justify-between">
                    <span className="mr-2 font-mono">{repo.name}</span>
                    <span className="text-green-300">{repo.count}</span>
                  </li>
                ))}
                {data.repos.length > 3 && (
                  <li className="text-xs text-green-300">
                    +{data.repos.length - 3} more repos
                  </li>
                )}
              </ul>
            </div>
          ) : (
            <p className="text-sm italic text-green-300">No commits</p>
          )}
        </div>
      );
    }
    return null;
  };

  // Custom dot component with glow effect
  const CustomDot = (props: any) => {
    const { cx, cy, index, payload } = props;

    // Skip rendering dots for days with zero commits
    if (payload.count === 0) return null;

    // Highlight effect when hovering
    const isHovered = index === hoverIndex;

    return (
      <g>
        {/* Glow effect */}
        <circle
          cx={cx}
          cy={cy}
          r={isHovered ? 12 : 8}
          fill="rgba(16, 185, 129, 0.2)"
          className="glow-medium"
        />
        <circle
          cx={cx}
          cy={cy}
          r={isHovered ? 8 : 5}
          fill="rgba(16, 185, 129, 0.4)"
          className="glow-small"
        />
        {/* Main dot */}
        <circle
          cx={cx}
          cy={cy}
          r={isHovered ? 5 : 3}
          stroke="#064E3B"
          strokeWidth={2}
          fill="#10B981"
          className={isHovered ? "glow-strong" : ""}
        />
      </g>
    );
  };

  const handleMouseMove = (data: any) => {
    if (data && data.activeTooltipIndex !== undefined) {
      setHoverIndex(data.activeTooltipIndex);
    }
  };

  const handleMouseLeave = () => {
    setHoverIndex(null);
  };

  // Calculate date range for display
  const dateRange =
    chartData.length > 0
      ? `${visibleData[0]?.date || "-"} → ${visibleData[visibleData.length - 1]?.date || "-"}`
      : "";

  return (
    <div className="w-full bg-black rounded-lg border border-green-700 overflow-hidden">
      {/* Header with digital count display */}
      <div className="p-4 border-b border-green-700 flex justify-between items-center">
        <div className="flex items-center">
          <h2 className="text-green-400 text-xl font-mono font-bold">
            COMMIT.HISTORY
          </h2>
          <span className="ml-3 text-gray-500 font-mono">{username}</span>
        </div>
        <div className="font-mono text-green-400 bg-black border border-green-500 px-3 py-1 rounded">
          {totalCommits} commits
        </div>
      </div>

      {/* View controls */}
      <div className="px-4 pt-2 pb-1 flex justify-end space-x-2">
        <button
          onClick={handleViewMonth}
          className="px-2 py-1 text-xs text-green-400 border border-green-700 rounded hover:bg-green-900 hover:border-green-500 transition-colors font-mono"
        >
          LAST 30 DAYS
        </button>
        <button
          onClick={handleViewAll}
          className="px-2 py-1 text-xs text-green-400 border border-green-700 rounded hover:bg-green-900 hover:border-green-500 transition-colors font-mono"
        >
          ALL 2025
        </button>
      </div>

      {/* Main chart */}
      <div className="relative">
        {/* Grid overlay for cyberpunk effect */}
        <div className="absolute inset-0 grid grid-cols-12 grid-rows-6 pointer-events-none">
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={`v-${i}`}
              className="h-full border-r border-green-900 opacity-30"
            ></div>
          ))}
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={`h-${i}`}
              className="w-full border-b border-green-900 opacity-30 col-span-12"
            ></div>
          ))}
        </div>

        {/* Chart element */}
        <div className="p-4">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart
              data={visibleData}
              margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              <defs>
                <linearGradient id="colorActivity" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10B981" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#10B981" stopOpacity={0.2} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1F2937" />
              <XAxis
                dataKey="displayDate"
                stroke="#6EE7B7"
                tick={{ fill: "#6EE7B7" }}
                tickLine={{ stroke: "#6EE7B7" }}
                axisLine={{ stroke: "#065F46" }}
              />
              <YAxis
                stroke="#6EE7B7"
                tick={{ fill: "#6EE7B7" }}
                tickLine={{ stroke: "#6EE7B7" }}
                axisLine={{ stroke: "#065F46" }}
                domain={[0, "dataMax + 1"]}
              />
              <Tooltip content={<CustomTooltip />} />
              <ReferenceLine y={0} stroke="#065F46" />

              {/* Area under the line */}
              <defs>
                <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>

              <Area
                type="monotone"
                dataKey="count"
                fill="url(#colorActivity)"
                stroke="none"
                fillOpacity={0.1}
              />

              <Line
                type="monotone"
                dataKey="count"
                stroke="#10B981"
                strokeWidth={3}
                activeDot={false}
                dot={<CustomDot />}
                isAnimationActive={true}
                animationDuration={1500}
                filter="url(#glow)"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Footer with time range */}
      <div className="p-4 border-t border-green-700 flex justify-between text-xs text-green-500 font-mono">
        <div>{visibleData.length} DAYS SHOWN</div>
        <div>{dateRange}</div>
      </div>

      {/* CSS for glow effects */}
      <style>{`
        .glow-strong {
          filter: drop-shadow(0 0 5px #10b981);
        }

        .glow-medium {
          filter: drop-shadow(0 0 3px #10b981);
        }

        .glow-small {
          filter: drop-shadow(0 0 2px #10b981);
        }
      `}</style>
    </div>
  );
};

export default CyberpunkCommitChart;
