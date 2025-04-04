import { Loader } from "lucide-react";

const Loading = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <p className="text-3xl font-bold text-hackathon-blue-100">Loading...</p>
      <Loader className="animate-spin text-hackathon-blue-100" />
    </div>
  );
};

export default Loading;
