import ProtectedPage from "@/components/protected";
import Dashboard from "@/components/user/dashboard/dashboard";

const Page = () => {
  return (
    <ProtectedPage
      title="User | Dashboard"
      restrictions={{
        participants: [1, 0, -1],
      }}
    >
      <Dashboard />
    </ProtectedPage>
  );
};

export default Page;
