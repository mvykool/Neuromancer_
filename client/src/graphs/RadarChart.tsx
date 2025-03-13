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
    <ResponsiveContainer width="30%" height="30%">
      <RechartsRadarChart cx="50%" cy="50%" outerRadius="80%" data={chartData}>
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
  );
};
