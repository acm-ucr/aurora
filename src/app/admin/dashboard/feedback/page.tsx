import ProtectedPage from "@/components/protected";
import Feedback from "@/components/admin/dashboards/feedback";
import { SearchParams } from "@/types/dashboard";

type props = {
  searchParams: SearchParams;
};

const Page = ({ searchParams }: props) => {
  return (
    <ProtectedPage title="Admin | Feedback" restrictions={{ admins: [1] }}>
      <Feedback searchParams={searchParams} />
    </ProtectedPage>
  );
};

export default Page;
