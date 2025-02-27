import Clock from "@/components/ui/countdown";

const Countdown = () => {
  return (
    <div className="inline-flex-col inline-block w-full rounded-lg bg-hackathon-green-300 text-center shadow-xl">
      <div className="m-2 mb-0 font-bold text-white">HACKING ENDS IN</div>
      <Clock
        classNames={{
          digit: "text-white",
          background: "bg-white",
          unit: "text-white",
        }}
      />
    </div>
  );
};

export default Countdown;
