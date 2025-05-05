import Leads from "@/components/admin/dashboards/leads";
import { SearchParams } from "@/types/dashboard";

export const metadata = {
  title: "Admin | Leads",
};

const Page = ({ searchParams }: { searchParams: SearchParams }) => {
  return <Leads searchParams={searchParams} />;
};

export default Page;
