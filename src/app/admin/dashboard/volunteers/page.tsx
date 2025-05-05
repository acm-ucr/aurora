import Volunteers from "@/components/admin/dashboards/volunteers";
import { SearchParams } from "@/types/dashboard";

export const metadata = {
  title: "Admin | Volunteers",
};

const Page = ({ searchParams }: { searchParams: SearchParams }) => {
  return <Volunteers searchParams={searchParams} />;
};

export default Page;
