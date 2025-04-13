import Start from "@/components/judging/start";
import ProtectedPage from "@/components/protected";

interface props {
  params: {
    id: string;
  };
  searchParams: { [key: string]: string };
}

const Page = ({ params, searchParams }: props) => {
  const { id } = params;

  return (
    <ProtectedPage restrictions={{ judges: [1] }} title="Judge | Round">
      <Start
        id={id}
        name={searchParams.name}
        round={searchParams.round}
        table={searchParams.table}
      />
    </ProtectedPage>
  );
};

export default Page;
