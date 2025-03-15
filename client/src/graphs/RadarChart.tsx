import React from "react";
import {
  Radar,
  RadarChart as RechartsRadarChart,
  PolarGrid,
  PolarAngleAxis,
  ResponsiveContainer,
} from "recharts";

interface RadarChartProps {
  data: {
    language: string;
    count: number;
  }[];
}

export const RadarChart: React.FC<RadarChartProps> = ({ data }) => {
  const chartData = data.map((item) => ({
    subject: item.language,
    A: item.count,
    fullMark: Math.max(...data.map((d) => d.count)) + 5,
  }));

  return (
    <div className="h-[40%] w-[70%] border-2 border-primary radar">
      <ResponsiveContainer width="100%" height="100%">
        <RechartsRadarChart
          cx="50%"
          margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
          cy="50%"
          outerRadius="75%"
          data={chartData}
        >
          <PolarGrid stroke="#00ff9d" />
          <PolarAngleAxis dataKey="subject" tick={{ fill: "#00ff9d" }} />
          <Radar
            name="Skills"
            dataKey="A"
            stroke="#00ff9d"
            fill="#00ff9d"
            fillOpacity={0.7}
          />
        </RechartsRadarChart>
      </ResponsiveContainer>
    </div>
  );
};
