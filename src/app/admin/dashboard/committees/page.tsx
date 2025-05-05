import Committees from "@/components/admin/dashboards/committees";
import { SearchParams } from "@/types/dashboard";

export const metadata = {
  title: "Admin | Committees",
};

const Page = ({ searchParams }: { searchParams: SearchParams }) => {
  return <Committees searchParams={searchParams} />;
};

export default Page;
