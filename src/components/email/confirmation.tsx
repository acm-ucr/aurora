import data from "@/data/config";
import Template from "./template";
import { Text } from "@react-email/components";

interface props {
  name: string;
  position: string;
  preview: string;
}

const Confirmation = ({ name, position, preview }: props) => {
  return (
    <Template name={name} preview={preview}>
      <Text>
        Thank you for applying as a <strong>{position}</strong>!
      </Text>
      <Text>
        We appreciate your support towards {data.name}. Please keep an eye out
        for future {data.name} emails regarding updates and announcements.
      </Text>
    </Template>
  );
};

export default Confirmation;
