import Interests from "@/components/admin/dashboards/interests";
import { SearchParams } from "@/types/dashboard";

export const metadata = {
  title: "Admin | Interests",
};

const Page = ({ searchParams }: { searchParams: SearchParams }) => {
  return <Interests searchParams={searchParams} />;
};

export default Page;
