import ProtectedPage from "@/components/protected";
import Resumes from "@/components/admin/dashboards/resumes";
import { SearchParams } from "@/types/dashboard";

type props = {
  searchParams: SearchParams;
};

const Page = ({ searchParams }: props) => {
  return (
    <ProtectedPage title="Admin | Resumes" restrictions={{ admins: [1] }}>
      <Resumes searchParams={searchParams} />
    </ProtectedPage>
  );
};

export default Page;
