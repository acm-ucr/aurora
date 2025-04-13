import Acceptance from "./acceptance";
import Confirmation from "./confirmation";
import Rejection from "./rejection";

interface props {
  id: "confirmation" | "acceptance" | "rejection";
  name: string;
  position: string;
  preview: string;
}

const Email = ({ id, name, position, preview }: props) => {
  if (id === "confirmation")
    return <Confirmation name={name} position={position} preview={preview} />;
  if (id === "acceptance")
    return <Acceptance name={name} position={position} preview={preview} />;
  if (id === "rejection")
    return <Rejection name={name} position={position} preview={preview} />;
};

export default Email;
