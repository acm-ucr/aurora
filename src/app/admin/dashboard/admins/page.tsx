import Admins from "@/components/admin/dashboards/admins";
import { SearchParams } from "@/types/dashboard";

export const metadata = {
  title: "Admin | Admins",
};

const Page = ({ searchParams }: { searchParams: SearchParams }) => {
  return <Admins searchParams={searchParams} />;
};

export default Page;
