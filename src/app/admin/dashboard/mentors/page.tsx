import ProtectedPage from "@/components/protected";
import Mentors from "@/components/admin/dashboards/mentors";
import { SearchParams } from "@/types/dashboard";

type props = {
  searchParams: SearchParams;
};

const Page = ({ searchParams }: props) => {
  return (
    <ProtectedPage title="Admin | Mentors" restrictions={{ admins: [1] }}>
      <Mentors searchParams={searchParams} />
    </ProtectedPage>
  );
};

export default Page;
