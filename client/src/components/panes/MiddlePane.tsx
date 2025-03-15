import DailyCoding from "../../graphs/DailyCoding";
import GitHubDashboard from "../../graphs/GithubCommit";
import LanguageFlowChart from "../../graphs/LanguageDistribution";
import MatrixRainDemo from "../../graphs/Matrix";
import { RadarChart } from "../../graphs/RadarChart";
import { RecentActivity } from "../../graphs/RecentActivity";
import { Sphere } from "../../graphs/Sphere";
import { useInfo } from "../../services";

const MiddlePane = () => {
  const { data: data, isLoading, error } = useInfo();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const languageData = data?.chartData?.languageDistribution || [];

  return (
    <div className="no-scrollbar w-full flex flex-wrap overflow-y-auto h-full rel">
      <RadarChart data={data.chartData.languageDistribution} />
      <Sphere />
      <div className="h-[60%] w-[70%]">
        <GitHubDashboard />
        <LanguageFlowChart data={languageData} loading={isLoading} />
      </div>
      <div className="w-[30%] px-2">
        <DailyCoding />
        <RecentActivity activity={data.chartData.recentActivity} />
        <MatrixRainDemo title="Neuromancer_" />
      </div>
    </div>
  );
};

export default MiddlePane;
