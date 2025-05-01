import ProtectedPage from "@/components/protected";
import Leads from "@/components/admin/dashboards/leads";
import { SearchParams } from "@/types/dashboard";

type props = {
  searchParams: SearchParams;
};

const Page = ({ searchParams }: props) => {
  return (
    <ProtectedPage title="Admin | Leads" restrictions={{ admins: [1] }}>
      <Leads searchParams={searchParams} />
    </ProtectedPage>
  );
};

export default Page;
