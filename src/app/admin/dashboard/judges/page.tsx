import ProtectedPage from "@/components/protected";
import Judges from "@/components/admin/dashboards/judges";
import { SearchParams } from "@/types/dashboard";

type props = {
  searchParams: SearchParams;
};

const Page = ({ searchParams }: props) => {
  return (
    <ProtectedPage title="Admin | Interests" restrictions={{ admins: [1] }}>
      <Judges searchParams={searchParams} />
    </ProtectedPage>
  );
};

export default Page;
