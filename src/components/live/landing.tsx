import Countdown from "../user/dashboard/countdown";

const Landing = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex w-1/2 items-center justify-center">
        <Countdown />
      </div>
    </div>
  );
};

export default Landing;
