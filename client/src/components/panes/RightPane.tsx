import { strings } from "../../constants/strings";

const RightPane = () => {
  return (
    <div className="gap-3 flex flex-col relative border border-green-500 w-4/12">
      {/*status*/}
      <div className="py-5 w-full border-4 border-primary  flex justify-center items-center">
        <p className="text-primary tracking-wider text-xl">
          {strings.home.rightPane.status}
        </p>
      </div>
      {/*status banner*/}
      <img
        src="/coderonin.jpeg"
        alt="ronin"
        className="h-28 w-full object-cover object-top"
      />
      {/* status name */}
      <div className="py-5 w-full border-4 border-primary  flex justify-center items-center">
        <p className="text-primary tracking-wider text-xl">
          {strings.home.rightPane.name}
        </p>
      </div>

      {/* description */}
      <div className="text-primary p-3">
        <em className="text-xs mb-4">"Wanderer of the grid"</em>
        <p className="tracking-widest mt-2">
          A versatile developer fluent in multiple languages, moving between
          front and backend like a nomadic warrior.
        </p>
      </div>
      {/* badges */}
      <div className="py-2 w-full flex justify-start pl-4 bg-primary items-center">
        <p className="text-black tracking-wider text-xl">Badges:</p>
      </div>
    </div>
  );
};

export default RightPane;
