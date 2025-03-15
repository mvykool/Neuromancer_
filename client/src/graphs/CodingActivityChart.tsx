/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface CodingActivityChartProps {
  data: {
    date: string;
    duration: number;
  }[];
}

export const CodingActivityChart: React.FC<CodingActivityChartProps> = ({
  data,
}) => {
  const [hourlyData, setHourlyData] = useState<any[]>([]);

  useEffect(() => {
    // Generate hourly data points for more visual interest
    const generateHourlyData = () => {
      const result: any[] = [];

      // Make sure data is sorted chronologically (oldest first)
      const sortedData = [...data].sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return dateA.getTime() - dateB.getTime();
      });

      sortedData.forEach((day) => {
        // Create a varying distribution of coding time throughout the day
        const hoursInDay = 10; // Assuming 10 hours of potential coding time
        let remainingDuration = day.duration;

        for (let hour = 9; hour < 9 + hoursInDay; hour++) {
          // Randomize the amount of time spent coding each hour
          // with more activity midday (bell curve distribution)
          const bellCurveFactor = 1 - Math.abs((hour - 14) / 5);
          const hourlyFactor = 0.5 + bellCurveFactor;

          // Calculate duration for this hour (with some randomness)
          const hourDuration = Math.min(
            remainingDuration,
            (day.duration / hoursInDay) *
              hourlyFactor *
              (0.7 + Math.random() * 0.6),
          );

          if (hourDuration > 0) {
            // Convert date string to Date object for proper parsing
            const dateParts = day.date.split("/");
            const dateObj = new Date(
              parseInt(`20${dateParts[2]}`), // Year assuming 20XX format
              parseInt(dateParts[0]) - 1, // Month (0-indexed in JS)
              parseInt(dateParts[1]), // Day
              hour, // Hour
            );

            result.push({
              timePoint: dateObj.toISOString(), // Store as ISO string for proper sorting
              displayTime: `${day.date} ${hour}:00`,
              duration: hourDuration,
              hours: (hourDuration / 3600).toFixed(1),
            });
          }

          remainingDuration -= hourDuration;
          if (remainingDuration <= 0) break;
        }
      });

      // Ensure the data is sorted chronologically
      return result.sort((a, b) => {
        return (
          new Date(a.timePoint).getTime() - new Date(b.timePoint).getTime()
        );
      });
    };

    setHourlyData(generateHourlyData());
  }, [data]);

  return (
    <ResponsiveContainer width="100%" height="50%">
      <LineChart data={hourlyData}>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(0, 255, 157, 0.2)" />
        <XAxis
          dataKey="timePoint"
          tick={{ fill: "#00ff9d" }}
          tickFormatter={(value) => value.split(" ")[1]} // Just show the hour
        />
        <YAxis tick={{ fill: "#00ff9d" }} />
        <Tooltip
          contentStyle={{
            backgroundColor: "rgba(0,0,0,0.8)",
            border: "1px solid #00ff9d",
            boxShadow: "0 0 10px rgba(0, 255, 157, 0.5)",
          }}
          labelStyle={{ color: "#00ff9d" }}
          formatter={(value, name, props) => [`${value} hrs`, "Coding Time"]}
          labelFormatter={(label) =>
            `${label.split(" ")[0]} at ${label.split(" ")[1]}`
          }
        />
        <Line
          type="monotone"
          dataKey="hours"
          stroke="#00ff9d"
          strokeWidth={2}
          activeDot={{ r: 8, fill: "#00ff9d" }}
          dot={{ r: 4, fill: "#00ff9d" }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};
