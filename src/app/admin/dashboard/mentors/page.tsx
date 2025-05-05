import Mentors from "@/components/admin/dashboards/mentors";
import { SearchParams } from "@/types/dashboard";

export const metadata = {
  title: "Admin | Mentors",
};

const Page = ({ searchParams }: { searchParams: SearchParams }) => {
  return <Mentors searchParams={searchParams} />;
};

export default Page;
