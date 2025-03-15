import Navbar from "../components/navbar/Navbar";
import LeftPane from "../components/panes/LeftPane";
import MiddlePane from "../components/panes/MiddlePane";
import { useInfo } from "../services/hooks/useInfo";

const HomeView = () => {
  const { data: data, isLoading, error } = useInfo();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <main className="bg-black h-screen pt-24 overflow-y-hidden w-11/12 relative flex flex-col items-center mx-auto">
      <Navbar />

      {/* Scrollable content */}
      <div className="flex gap-4 w-full min-h-full">
        <LeftPane name={data.profile.username} picture={data.profile.avatar} />
        <MiddlePane />
      </div>
    </main>
  );
};

export default HomeView;
