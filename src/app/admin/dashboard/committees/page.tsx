import ProtectedPage from "@/components/protected";
import Committees from "@/components/admin/dashboards/committees";
import { SearchParams } from "@/types/dashboard";

type props = {
  searchParams: SearchParams;
};

const Page = ({ searchParams }: props) => {
  return (
    <ProtectedPage title="Admin | Committees" restrictions={{ admins: [1] }}>
      <Committees searchParams={searchParams} />
    </ProtectedPage>
  );
};

export default Page;
