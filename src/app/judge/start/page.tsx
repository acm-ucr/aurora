import Dashboard from "@/components/judging/start/dashboard";
import ProtectedPage from "@/components/protected";

const Page = () => {
  return (
    <ProtectedPage restrictions={{ judges: [1] }} title="Judge | Start">
      <Dashboard />
    </ProtectedPage>
  );
};

export default Page;
