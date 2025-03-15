/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// Define types for language data
interface LanguageData {
  language: string;
  count: number;
  percentage: number;
}

// Props interface for the component
interface LanguagePieChartProps {
  data?: LanguageData[];
  loading?: boolean;
}

// Custom tooltip props
interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{
    name: string;
    value: number;
    payload: LanguageData;
    fill: string;
  }>;
}

const LanguagePieChart: React.FC<LanguagePieChartProps> = ({
  data = [],
  loading = false,
}) => {
  // Define colors for different programming languages
  const languageColors: Record<string, string> = {
    TypeScript: "#3178C6",
    JavaScript: "#F7DF1E",
    CSS: "#264de4",
    HTML: "#E34F26",
    Python: "#3776AB",
    "C#": "#239120",
    Lua: "#000080",
    SCSS: "#CC6699",
    Shell: "#4EAA25",
    Astro: "#FF5D01",
    PHP: "#777BB4",
    Nix: "#7EBAE4",
    Dockerfile: "#2496ED",
    C: "#A8B9CC",
    EJS: "#B4CA65",
  };

  // Sort languages by count (descending)
  const topLanguages: LanguageData[] = [...(data || [])].sort(
    (a, b) => b.count - a.count,
  );

  // Calculate total for percentages
  const total: number = topLanguages.reduce((sum, lang) => sum + lang.count, 0);

  // Prepare data for the pie chart with percentage
  const pieData = topLanguages.map((lang) => ({
    ...lang,
    percentage: Math.round((lang.count / total) * 100),
  }));

  // Custom tooltip component
  const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0];
      return (
        <div className="bg-gray-900 bg-opacity-90 text-white p-3 border border-gray-700 rounded shadow-lg backdrop-blur-sm">
          <p className="font-mono font-bold" style={{ color: data.fill }}>
            {data.name}
          </p>
          <p className="text-green-400 font-mono">
            {data.value} repos ({payload[0].payload.percentage}%)
          </p>
        </div>
      );
    }
    return null;
  };

  // Custom legend component
  const CustomLegend = (props: any) => {
    const { payload } = props;

    return (
      <ul className="flex flex-wrap justify-center gap-3 mt-3">
        {payload.map((entry: any, index: number) => (
          <li
            key={`legend-${index}`}
            className="flex items-center font-mono text-sm"
          >
            <div
              className="w-3 h-3 mr-2"
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-white">
              {entry.value} (
              {pieData.find((item) => item.language === entry.value)?.count})
            </span>
          </li>
        ))}
      </ul>
    );
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64 bg-gray-900 text-green-400 p-6 rounded-lg border border-gray-800">
        <div className="animate-pulse text-green-400">
          Loading language data...
        </div>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col items-center bg-gray-900 p-6 rounded-lg border border-gray-800">
      <h2 className="text-green-400 text-xl font-mono font-bold mb-4">
        LANGUAGE.DISTRIBUTION
      </h2>

      <div className="w-full h-96">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={pieData}
              dataKey="count"
              nameKey="language"
              cx="50%"
              cy="50%"
              outerRadius={120}
              innerRadius={70} // Make it a donut chart for more cyberpunk feel
              paddingAngle={2}
              strokeWidth={2}
              stroke="#121212"
              // label={(entry) => `${entry.language} (${entry.count})`}
              // labelLine={{ stroke: "#666", strokeWidth: 1 }}
            >
              {pieData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={
                    languageColors[entry.language] ||
                    `hsl(${index * 36}, 70%, 50%)`
                  }
                  className="filter drop-shadow-glow" // Apply glow effect
                />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend content={<CustomLegend />} />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Center text overlay */}
      <div
        className="absolute pointer-events-none font-mono text-white text-center"
        style={{
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          marginTop: "40px", // Adjust to center in the pie
        }}
      ></div>

      <style>{`
        .recharts-wrapper {
          background-image:
            linear-gradient(rgba(20, 30, 40, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(20, 30, 40, 0.1) 1px, transparent 1px);
          background-size: 20px 20px;
          background-position: center center;
        }

        .filter.drop-shadow-glow {
          filter: drop-shadow(0px 0px 8px rgba(100, 255, 100, 0.3));
        }

        .recharts-pie-label-text {
          font-family: monospace;
          font-size: 11px;
          font-weight: bold;
          fill: white;
          text-shadow: 0 0 5px rgba(0, 0, 0, 0.7);
        }
      `}</style>
    </div>
  );
};

export default LanguagePieChart;
