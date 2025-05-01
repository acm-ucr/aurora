import ProtectedPage from "@/components/protected";
import Volunteers from "@/components/admin/dashboards/volunteers";
import { SearchParams } from "@/types/dashboard";

type props = {
  searchParams: SearchParams;
};

const Page = ({ searchParams }: props) => {
  return (
    <ProtectedPage title="Admin | Volunteers" restrictions={{ admins: [1] }}>
      <Volunteers searchParams={searchParams} />
    </ProtectedPage>
  );
};

export default Page;
