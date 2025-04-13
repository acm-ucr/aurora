import { Button } from "@/components/ui/button";
import { getSession } from "@/utils/auth";
import Link from "next/link";
import Image from "next/image";
import image1 from "@/public/engineering/hackathon/judgeAssets1.png";
import image2 from "@/public/engineering/hackathon/judgeAssets2.png";
const Page = async () => {
  const session = await getSession();

  const name = session?.user?.name;

  return (
    <div className="flex w-full flex-col items-center justify-between bg-gradient-to-t from-hackathon-blue-200 to-[#3A749A]">
      <Image src={image1} className="w-full md:w-1/3" alt=""></Image>
      <div className="flex flex-col items-center justify-center">
        <p className="mb-2 font-poppins text-4xl font-bold text-white">
          Judging Portal
        </p>
        <p className="font-poppins text-2xl text-white">Welcome {name}</p>

        <div className="mt-10 flex gap-2">
          <Button className="text-md bg-gradient-to-r from-hackathon-green-200 to-[#80ED99] text-black">
            <Link href="/judge/register">Register</Link>
          </Button>

          <Button className="text-md bg-gradient-to-r from-hackathon-green-200 to-[#80ED99] text-black">
            <Link href="/judge/structure">View Structure</Link>
          </Button>

          <Button className="text-md bg-gradient-to-r from-hackathon-green-200 to-[#80ED99] text-black">
            <Link href="/judge/start">Get Started</Link>
          </Button>
        </div>
      </div>

      <Image src={image2} className="w-full md:w-1/3" alt=""></Image>
    </div>
  );
};

export default Page;
