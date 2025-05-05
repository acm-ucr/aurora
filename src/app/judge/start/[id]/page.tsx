import Start from "@/components/judging/start";

interface props {
  params: {
    id: string;
  };
}

export const metadata = {
  title: "Judge | Round",
};

const Page = ({ params }: props) => {
  const { id } = params;

  return <Start id={id} />;
};

export default Page;
