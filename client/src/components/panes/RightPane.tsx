import { strings } from "../../constants/strings";

const RightPane = () => {
  return (
    <div className="gap-4 pl-2 flex flex-col relative w-4/12">
      {/*status*/}
      <div className="py-3 w-full border-4 border-primary  flex justify-center items-center">
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
      <div className="py-3 w-full border-4 border-primary  flex justify-center items-center">
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
      <div className="grid grid-cols-4 gap-3">
        <div className="border-2 border-primary size-16">01</div>
        <div className="border-2 border-primary size-16">01</div>
        <div className="border-2 border-primary size-16">01</div>
        <div className="border-2 border-primary size-16">01</div>

        <div className="border-2 border-primary size-16">01</div>
        <div className="border-2 border-primary size-16">01</div>
        <div className="border-2 border-primary size-16">01</div>
      </div>
    </div>
  );
};

export default RightPane;
