import ProtectedPage from "@/components/protected";
import Interests from "@/components/admin/dashboards/interests";
import { SearchParams } from "@/types/dashboard";

type props = {
  searchParams: SearchParams;
};

const Page = ({ searchParams }: props) => {
  return (
    <ProtectedPage title="Admin | Interests" restrictions={{ admins: [1] }}>
      <Interests searchParams={searchParams} />
    </ProtectedPage>
  );
};

export default Page;
