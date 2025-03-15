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
    CSS: "#662f9a",
    HTML: "#E34F26",
    Python: "#3776AB",
    "C#": "#8165e1",
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
      <ul className="flex flex-col gap-2 absolute right-0 top-1/2 transform -translate-y-1/2 ">
        {payload.map((entry: any, index: number) => (
          <li
            key={`legend-${index}`}
            className="flex items-center font-mono text-sm items-center"
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
    <div className="w-full flex flex-col items-center p-6 border border-gray-400">
      <h2 className="text-green-400 text-xl font-mono font-bold">
        LANGUAGE.DISTRIBUTION
      </h2>

      <div className="w-full h-[55vh]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={pieData}
              dataKey="count"
              nameKey="language"
              cx="50%"
              cy="50%"
              outerRadius={120}
              innerRadius={60}
              paddingAngle={3}
              stroke="#121212"
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
            <Legend
              content={<CustomLegend />}
              layout="vertical"
              align="left"
              verticalAlign="middle"
              wrapperStyle={{
                width: "150px",
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <style>{`
      `}</style>
    </div>
  );
};

export default LanguagePieChart;
