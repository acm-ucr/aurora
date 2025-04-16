import Checkbox from "@/components/checkbox";
import { useState } from "react";
type props = {
  options: string[];
  onClick: () => void;
  onMLHClick: () => void;
};

const Terms = ({ options, onClick, onMLHClick }: props) => {
  const [checked, setChecked] = useState(false);
  const [mlh, setMLH] = useState(false);

  const onClickWithCheckBox = () => {
    onClick();
    setChecked(!checked);
  };

  const onClickWithCheckBoxMLH = () => {
    onMLHClick();
    setMLH(!mlh);
  };

  return (
    <>
      <p className="mb-1 mt-3 font-semibold">
        Terms and Conditions
        <span className="text-red-500">*</span>
      </p>
      <ul className="mb-4 list-disc pl-5 text-sm">
        {options.map((option, index) => (
          <li key={index}>{option}</li>
        ))}
      </ul>

      <div className="flex flex-col gap-4">
        <Checkbox id="terms" checked={checked} onClick={onClickWithCheckBox}>
          By selecting this I agree to all of the above terms
        </Checkbox>

        <Checkbox id="mlh" checked={mlh} onClick={onClickWithCheckBoxMLH}>
          I authorize MLH to send me occasional emails about relevant events,
          career opportunities, and community announcements.
        </Checkbox>
      </div>
    </>
  );
};

export default Terms;
