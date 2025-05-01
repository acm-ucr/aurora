import ProtectedPage from "@/components/protected";
import Panels from "@/components/admin/dashboards/panels";
import { SearchParams } from "@/types/dashboard";

type props = {
  searchParams: SearchParams;
};

const Page = ({ searchParams }: props) => {
  return (
    <ProtectedPage title="Admin | Mentors" restrictions={{ admins: [1] }}>
      <Panels searchParams={searchParams} />
    </ProtectedPage>
  );
};

export default Page;
