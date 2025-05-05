import Panels from "@/components/admin/dashboards/panels";
import { SearchParams } from "@/types/dashboard";

export const metadata = {
  title: "Admin | Panels",
};

const Page = ({ searchParams }: { searchParams: SearchParams }) => {
  return <Panels searchParams={searchParams} />;
};

export default Page;
