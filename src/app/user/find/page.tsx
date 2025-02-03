import ProtectedPage from "@/components/protected";
import Find from "@/components/user/find";

const Page = () => {
  return (
    <ProtectedPage
      title="User | Find"
      restrictions={{
        participants: [1, 0, -1],
      }}
    >
      <Find />
    </ProtectedPage>
  );
};

export default Page;
