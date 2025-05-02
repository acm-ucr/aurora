import ProtectedPage from "@/components/protected";
import Join from "@/components/user/join";

type props = {
  params: Promise<{ team: string }>;
};

const Page = async (props0: props) => {
  const params = await props0.params;
  return (
    <ProtectedPage
      title="User | Join"
      restrictions={{
        participants: [1],
      }}
    >
      <Join params={params} />
    </ProtectedPage>
  );
};

export default Page;
