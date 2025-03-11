import { strings } from "../../constants/strings";

interface LeftPaneProps {
  picture: string;
  name: string;
}

const LeftPane = ({ name, picture }: LeftPaneProps) => {
  return (
    <div className="gap-3 relative flex flex-col w-4/12">
      {/* Radar */}
      <div className="py-5 w-full bg-primary  flex justify-center items-center">
        {" "}
        <p className="text-2xl">{strings.home.leftPane.id}</p>
      </div>
      {/* img */}
      <img
        src={picture}
        alt={strings.home.leftPane.altPic}
        className="min-h-60 w-full object-cover"
      />
      {/* Name */}
      <div className="border-4 border-primary w-full py-2 flex justify-center items-center">
        <p className="text-primary tracking-wider text-lg">{`@${name}`}</p>
      </div>
      {/* Radar */}
      <div className="h-60 w-full overflow-hidden">
        <video className=" w-full h-full object-cover" autoPlay muted loop>
          <source src="waveradiant.mp4" type="video/mp4" />
        </video>
      </div>
    </div>
  );
};

export default LeftPane;
