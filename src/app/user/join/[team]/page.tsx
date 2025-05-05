import Join from "@/components/user/join";

type props = {
  params: { team: string };
};

export const metadata = {
  title: "User | Join",
};

const Page = ({ params }: props) => {
  return <Join params={params} />;
};

export default Page;
