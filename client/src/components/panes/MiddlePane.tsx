import { CodingActivityChart } from "../../graphs/CodingActivityChart";
import { LanguageDistribution } from "../../graphs/LanguageDistribution";
import { RadarChart } from "../../graphs/RadarChart";
import { RecentActivity } from "../../graphs/RecentActivity";
import { Sphere } from "../../graphs/Sphere";
import { useInfo } from "../../services";

const MiddlePane = () => {
  const { data: data, isLoading, error } = useInfo();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className=" w-full flex flex-wrap border border-green-500 overflow-y-auto h-full rel">
      <RadarChart data={data.chartData.languageDistribution} />
      <Sphere />
      <LanguageDistribution data={data.chartData.codingLanguageDistribution} />

      <CodingActivityChart data={data.chartData.dailyCodingTime} />

      <RecentActivity activity={data.chartData.recentActivity} />
    </div>
  );
};

export default MiddlePane;
