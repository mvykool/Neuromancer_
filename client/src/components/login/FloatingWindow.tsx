import { strings } from "../../constants/strings";
import { useNavigate } from "react-router-dom";

const FloatingWindow = () => {
  const navigate = useNavigate();

  const goHome = () => navigate("/home");

  return (
    <div className="top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 absolute w-full">
      <div className="border-x-8 relative border-b-8 border-t-[35px] border-primary flex flex-col items-center  min-h-[610px] mx-auto w-5/12">
        {" "}
        <h1 className="text-primary text-5xl mt-12 z-10">
          {strings.login.title}
        </h1>
        <img
          src="/logoone.png"
          alt="logo"
          className="object-cover -mt-2 size-[380px] mr-[4%]"
        />
        <button
          onClick={goHome}
          type="button"
          className="bg-primary px-4 w-3/6 mx-auto py-2 absolute bottom-24 tracking-wide cursor-pointer"
        >
          {strings.login.btn}
        </button>
      </div>
    </div>
  );
};

export default FloatingWindow;
