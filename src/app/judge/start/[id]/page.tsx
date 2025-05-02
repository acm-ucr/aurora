import Start from "@/components/judging/start";
import ProtectedPage from "@/components/protected";

interface props {
  params: Promise<{
    id: string;
  }>;
}

const Page = async (props0: props) => {
  const params = await props0.params;
  const { id } = params;

  return (
    <ProtectedPage restrictions={{}} title="Judge | Round">
      <Start id={id} />
    </ProtectedPage>
  );
};

export default Page;
