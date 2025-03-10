import { strings } from "../../constants/strings";

interface LeftPaneProps {
  picture: string;
  name: string;
}

const LeftPane = ({ name, picture }: LeftPaneProps) => {
  return (
    <div className="gap-3 border border-red-500 w-4/12">
      {/* Radar */}
      <div className="py-5 w-full bg-primary  flex justify-center items-center">
        {" "}
        <p className="text-lg">{strings.home.leftPane.id}</p>
      </div>
      {/* img */}
      <img src={picture} alt={strings.home.leftPane.altPic} />
      {/* Name */}
      <div>
        <p className="text-white">{`@${name}`}</p>
      </div>
      j{/* Radar */}
      <div>radar</div>
    </div>
  );
};

export default LeftPane;
