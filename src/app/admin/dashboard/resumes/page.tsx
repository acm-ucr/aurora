import Resumes from "@/components/admin/dashboards/resumes";
import { SearchParams } from "@/types/dashboard";

export const metadata = {
  title: "Admin | Resumes",
};

const Page = ({ searchParams }: { searchParams: SearchParams }) => {
  return <Resumes searchParams={searchParams} />;
};

export default Page;
