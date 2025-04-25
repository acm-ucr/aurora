import { getResults } from "./actions";
import Result from "./result";
import { ReactQuery } from "@/utils/react-query";

const Index = async () => {
  return (
    <ReactQuery query={getResults} queryKey={["/admin/results"]}>
      <Result />
    </ReactQuery>
  );
};

export default Index;
