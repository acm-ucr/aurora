import Fault from "@/utils/error";

const Error = ({ code, name, message, dev }: Fault) => {
  return (
    <div className="fixed flex h-screen w-screen flex-col items-center justify-center">
      <p className="text-hackathon-blue-100 m-0 text-center text-6xl font-extrabold">
        {code}
      </p>
      <p className="m-0 text-center text-lg font-bold text-black md:text-2xl">
        {name}
      </p>
      <p className="text-hackathon-blue-200 m-0 text-center text-sm md:text-lg">
        {message}
      </p>
      {dev && (
        <p className="text-hackathon-blue-200 m-0 text-center text-sm md:text-lg">
          Developer Notes: {dev}
        </p>
      )}
    </div>
  );
};

export default Error;
