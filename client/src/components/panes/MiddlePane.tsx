import GitHubDashboard from "../../graphs/GithubCommit";
import LanguageFlowChart from "../../graphs/LanguageDistribution";
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
    <div className="no-scrollbar w-full flex flex-wrap border border-green-500 overflow-y-auto h-full rel">
      <RadarChart data={data.chartData.languageDistribution} />
      <Sphere />
      <div className="h-[60%] w-4/6 p-4">
        <GitHubDashboard />
        <LanguageFlowChart data={languageData} loading={isLoading} />
      </div>
      <RecentActivity activity={data.chartData.recentActivity} />
    </div>
  );
};

export default MiddlePane;
