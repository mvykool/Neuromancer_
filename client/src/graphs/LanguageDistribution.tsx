/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

interface LanguageDistributionProps {
  data: {
    language: string;
    minutes: number;
  }[];
}

export const LanguageDistribution: React.FC<LanguageDistributionProps> = ({
  data,
}) => {
  // Convert minutes to hours and sort by most used
  const formattedData = [...data]
    .sort((a, b) => b.minutes - a.minutes)
    .map((item) => ({
      language: item.language,
      hours: parseFloat((item.minutes / 60).toFixed(1)),
    }));

  // Custom tooltip to eliminate white background
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div
          style={{
            backgroundColor: "rgba(0,0,0,0.85)",
            border: "1px solid #00ff9d",
            padding: "8px 12px",
            borderRadius: "2px",
            boxShadow: "0 0 10px rgba(0, 255, 157, 0.5)",
          }}
        >
          <p style={{ color: "#00ff9d", margin: "0 0 5px 0" }}>{`${label}`}</p>
          <p style={{ color: "#00ff9d", margin: 0 }}>
            <span style={{ color: "#00c3ff" }}>Hours: </span>
            {payload[0].value}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <ResponsiveContainer width="30%" height="30%">
      <BarChart
        data={formattedData}
        margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
        // This helps prevent some hover artifacts
        style={{ background: "transparent" }}
      >
        <CartesianGrid
          strokeDasharray="3 3"
          stroke="rgba(0, 255, 157, 0.2)"
          // Make sure grid is transparent
          fill="transparent"
        />

        <XAxis
          dataKey="language"
          tick={{ fill: "#00ff9d" }}
          angle={-45}
          textAnchor="end"
          height={60}
          // Make axis parts transparent
          axisLine={{ stroke: "#00ff9d" }}
        />

        <YAxis
          tick={{ fill: "#00ff9d" }}
          // Make axis parts transparent
          axisLine={{ stroke: "#00ff9d" }}
        />

        {/* Use custom tooltip */}
        <Tooltip
          content={<CustomTooltip />}
          cursor={{ fill: "rgba(0, 255, 157, 0.1)" }} // This changes the hover highlight color
        />

        <Bar
          dataKey="hours"
          fill="#00ff9d"
          radius={[4, 4, 0, 0]}
          // Add a subtle animation
          animationDuration={500}
          // Add glow effect with filter
          fillOpacity={0.8}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};
