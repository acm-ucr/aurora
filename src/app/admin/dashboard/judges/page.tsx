import Judges from "@/components/admin/dashboards/judges";
import { SearchParams } from "@/types/dashboard";

export const metadata = {
  title: "Admin | Judges",
};

const Page = ({ searchParams }: { searchParams: SearchParams }) => {
  return <Judges searchParams={searchParams} />;
};

export default Page;
