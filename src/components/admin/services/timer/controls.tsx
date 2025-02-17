import { Trash2 } from "lucide-react";

type props = {
  onRemove: () => void;
};

const Controls = ({ onRemove }: props) => {
  return (
    <div className="flex gap-4">
      <Trash2 onClick={onRemove} className="hover:cursor-pointer" />
    </div>
  );
};
export default Controls;
