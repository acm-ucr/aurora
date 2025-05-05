import Participants from "@/components/admin/dashboards/participants";
import { SearchParams } from "@/types/dashboard";

export const metadata = {
  title: "Admin | Participants",
};

const Page = ({ searchParams }: { searchParams: SearchParams }) => {
  return <Participants searchParams={searchParams} />;
};

export default Page;
