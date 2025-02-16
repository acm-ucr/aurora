import ProtectedPage from "@/components/protected";
import ScheduleWrapper from "@/components/user/schedule/Wrapper";
import { Label } from "@/components/ui/label";

const Page = () => {
  return (
    <ProtectedPage
      title="User | Schedule"
      restrictions={{
        participants: [1, 0, -1],
      }}
    >
      <Label className="flex gap-3 py-4 pr-5 text-2xl font-bold">
        Schedule
      </Label>
      <ScheduleWrapper />
    </ProtectedPage>
  );
};

export default Page;

export const dynamic = "force-dynamic";
