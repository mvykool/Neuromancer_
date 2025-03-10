import Navbar from "../components/navbar/Navbar";
import LeftPane from "../components/panes/LeftPane";
import MiddlePane from "../components/panes/MiddlePane";
import RightPane from "../components/panes/RightPane";

const HomeView = () => {
  return (
    <main className="bg-black h-screen pt-24 overflow-y-hidden w-11/12 relative flex flex-col items-center mx-auto">
      <Navbar />

      {/* Scrollable content */}
      <div className="flex w-full min-h-[90%]">
        <LeftPane />
        <MiddlePane />
        <RightPane />
      </div>
    </main>
  );
};

export default HomeView;
