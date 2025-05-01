import ProtectedPage from "@/components/protected";
import Teams from "@/components/admin/dashboards/teams";
import { SearchParams } from "@/types/dashboard";

type props = {
  searchParams: SearchParams;
};

const Page = ({ searchParams }: props) => {
  return (
    <ProtectedPage title="Admin | Teams" restrictions={{ admins: [1] }}>
      <Teams searchParams={searchParams} />
    </ProtectedPage>
  );
};

export default Page;
