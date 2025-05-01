import ProtectedPage from "@/components/protected";
import Admins from "@/components/admin/dashboards/admins";
import { SearchParams } from "@/types/dashboard";

type props = {
  searchParams: SearchParams;
};

const Page = ({ searchParams }: props) => {
  return (
    <ProtectedPage title="Admin | Admins" restrictions={{ admins: [1] }}>
      <Admins searchParams={searchParams} />
    </ProtectedPage>
  );
};

export default Page;
