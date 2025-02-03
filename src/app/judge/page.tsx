import { Button } from "@/components/ui/button";
import { getSession } from "@/utils/auth";
import Link from "next/link";

const Page = async () => {
  const session = await getSession();

  const name = session?.user?.name;

  return (
    <div className="flex w-full flex-col items-center justify-center bg-gradient-to-b from-hackathon-blue-200 to-[#3A749A]">
      <p className="font-poppins text-4xl font-bold text-white">
        Judging Portal
      </p>
      <p className="font-poppins text-xl text-white">Welcome {name}</p>

      <div className="flex gap-2">
        <Button>
          <Link href="/judge/register">Register</Link>
        </Button>

        <Button>
          <Link href="/judge/structure">View Structure</Link>
        </Button>

        <Button>
          <Link href="/judge/start">Start Judging</Link>
        </Button>
      </div>
    </div>
  );
};

export default Page;
