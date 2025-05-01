import ProtectedPage from "@/components/protected";
import Participants from "@/components/admin/dashboards/participants";
import { SearchParams } from "@/types/dashboard";

type props = {
  searchParams: SearchParams;
};

const Page = ({ searchParams }: props) => {
  return (
    <ProtectedPage title="Admin | Participants" restrictions={{ admins: [1] }}>
      <Participants searchParams={searchParams} />
    </ProtectedPage>
  );
};

export default Page;
