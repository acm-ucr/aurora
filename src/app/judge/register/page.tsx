import Judge from "@/components/form/judge";
import ProtectedPage from "@/components/protected";

const Page = () => {
  return (
    <ProtectedPage title="Judge | Register" restrictions={{}}>
      <Judge />
    </ProtectedPage>
  );
};

export default Page;
