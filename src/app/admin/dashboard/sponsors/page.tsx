import Sponsors from "@/components/admin/dashboards/sponsors";
import { SearchParams } from "@/types/dashboard";

export const metadata = {
  title: "Admin | Sponsors",
};

const Page = ({ searchParams }: { searchParams: SearchParams }) => {
  return <Sponsors searchParams={searchParams} />;
};

export default Page;
