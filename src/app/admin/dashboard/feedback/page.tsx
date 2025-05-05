import Feedback from "@/components/admin/dashboards/feedback";
import { SearchParams } from "@/types/dashboard";

export const metadata = {
  title: "Admin | Feedback",
};

const Page = ({ searchParams }: { searchParams: SearchParams }) => {
  return <Feedback searchParams={searchParams} />;
};

export default Page;
