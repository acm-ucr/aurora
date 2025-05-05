import Teams from "@/components/admin/dashboards/teams";
import { SearchParams } from "@/types/dashboard";

export const metadata = {
  title: "Admin | Teams",
};

const Page = ({ searchParams }: { searchParams: SearchParams }) => {
  return <Teams searchParams={searchParams} />;
};

export default Page;
