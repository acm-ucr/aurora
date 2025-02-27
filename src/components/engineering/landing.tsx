import Link from "next/link";
import { SiGithub as Github } from "@icons-pack/react-simple-icons";
import Pages from "@/public/engineering/pages.webp";
import Image from "next/image";

const Landing = () => {
  return (
    <div className="flex w-full flex-col items-center justify-center pt-12 md:min-h-screen md:flex-row md:pt-0">
      <div className="ml-0 w-9/12 md:ml-12 md:w-5/12">
        <div className="mb-6 border-l-8 border-hackathon-blue-100 px-5 text-hackathon-green-300">
          <title>Engineering | Hackathon Template</title>
          <div className="mb-4 text-3xl font-bold text-hackathon-blue-200 md:text-5xl">
            Hackathon Website
          </div>
          <p className="text-xl">
            A template website simplifying the management process for UC
            Riverside&apos;s hackathon events.
          </p>
        </div>
        <Link
          href="https://github.com/acm-ucr/hackathon-website"
          className="my-4 flex items-center gap-3 rounded pb-4 text-2xl text-black hover:cursor-pointer hover:opacity-50"
        >
          <Github className="text-3xl" />
          GitHub
        </Link>
      </div>
      <Image
        src={Pages}
        alt="Hackathon Web Pages"
        className="mb-6 w-11/12 drop-shadow-lg"
        width={750}
        height={750}
      />
    </div>
  );
};

export default Landing;
