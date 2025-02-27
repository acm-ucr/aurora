import ProtectedPage from "@/components/protected";
import ScheduleWrapper from "@/components/user/schedule/Wrapper";

const Page = () => {
  return (
    <ProtectedPage
      title="User | Schedule"
      restrictions={{
        participants: [1, 0, -1],
      }}
    >
      <ScheduleWrapper />
    </ProtectedPage>
  );
};

export default Page;

export const dynamic = "force-dynamic";
