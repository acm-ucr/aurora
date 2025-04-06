import data from "@/data/config";
import Template from "./template";
import { Text } from "@react-email/components";

interface props {
  name: string;
  position: string;
  preview: string;
}

const Rejection = ({ name, position, preview }: props) => {
  return (
    <Template name={name} preview={preview}>
      <Text>
        Thank you for applying to {data.name} as a {position}. Unfortunately,
        due to particular circumstances we are unable to provide you a spot at{" "}
        {data.name}.
      </Text>
      <Text>
        However, we loved getting to know you and hope that you apply next year.
        If you have any questions, please reach out at {data.email}
      </Text>
    </Template>
  );
};

export default Rejection;
