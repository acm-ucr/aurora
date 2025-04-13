import React from "react";
import Image from "next/image";
import image1 from "@/public/engineering/hackathon/judgeAssets3.png";
import image2 from "@/public/engineering/hackathon/judgeAssets4.png";

const Page = () => {
  return (
    <div className="flex w-full flex-col items-center justify-between bg-gradient-to-t from-hackathon-blue-200 to-[#3A749A]">
      <Image src={image1} className="w-full md:w-1/3" alt=""></Image>
      <p className="text-center font-poppins text-4xl font-semibold text-white">
        THANK YOU FOR JUDGING!
      </p>
      <Image src={image2} className="w-full md:w-1/3" alt=""></Image>
    </div>
  );
};

export default Page;
