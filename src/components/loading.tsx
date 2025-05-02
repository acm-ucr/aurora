import { Loader } from "lucide-react";

const Loading = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <p className="text-hackathon-blue-100 text-3xl font-bold">Loading...</p>
      <Loader className="text-hackathon-blue-100 animate-spin" />
    </div>
  );
};

export default Loading;
