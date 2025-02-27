import Countdown from "../ui/countdown";
const Landing = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <Countdown
        classNames={{
          unit: "text-black",
          background: "bg-hackathon-blue-100",
          digit: "text-white",
        }}
      />
    </div>
  );
};

export default Landing;
