import Start from "@/components/judging/start";
import ProtectedPage from "@/components/protected";

interface props {
  params: {
    id: string;
  };
}

const Page = ({ params }: props) => {
  const { id } = params;

  return (
    <ProtectedPage restrictions={{}} title="Judge | Round">
      <Start id={id} />
    </ProtectedPage>
  );
};

export default Page;
