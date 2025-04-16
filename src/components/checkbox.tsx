import { Checkbox as Check } from "./ui/checkbox";
import { Label } from "./ui/label";

type checkbox = {
  id: string;
  checked: boolean;
  children?: string;
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
};

const Checkbox = ({ id, checked, onClick, children }: checkbox) => {
  return (
    <div className="flex items-start gap-2" onClick={onClick}>
      <Check id={id} checked={checked} />
      <Label
        htmlFor={id}
        onClick={(e) => e.stopPropagation()}
        className="m-0 gap-2 font-normal"
      >
        {children}
      </Label>
    </div>
  );
};

export default Checkbox;
