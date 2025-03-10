import Navbar from "../components/navbar/Navbar";

const HomeView = () => {
  return (
    <main className="bg-black h-screen pt-24 overflow-y-hidden w-11/12 relative flex flex-col items-center mx-auto">
      <Navbar />

      {/* Scrollable content */}
      <div className=" w-full border border-amber-500 overflow-y-auto h-full rel"></div>
    </main>
  );
};

export default HomeView;
