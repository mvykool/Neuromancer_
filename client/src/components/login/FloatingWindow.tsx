import { strings } from "../../constants/strings";

const FloatingWindow = () => {
  return (
    <div className="top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 absolute w-full">
      <div className="border-x-8 border-b-8 border-t-[35px] border-green-400 flex flex-col items-center  min-h-[650px] mx-auto w-3/6">
        {" "}
        <h1 className="text-green-400 text-5xl mt-10">{strings.login.title}</h1>
        <img src="" alt="logo" />
        <button></button>
      </div>
    </div>
  );
};

export default FloatingWindow;
