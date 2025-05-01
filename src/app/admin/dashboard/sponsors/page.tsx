import ProtectedPage from "@/components/protected";
import Sponsors from "@/components/admin/dashboards/sponsors";
import { SearchParams } from "@/types/dashboard";

type props = {
  searchParams: SearchParams;
};

const Page = ({ searchParams }: props) => {
  return (
    <ProtectedPage title="Admin | Sponsors" restrictions={{ admins: [1] }}>
      <Sponsors searchParams={searchParams} />
    </ProtectedPage>
  );
};

export default Page;
