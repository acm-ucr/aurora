import { TECHSTACKS } from "@/data/user/hackpacks";
import Link from "next/link";
import { SiGithub as Github } from "@icons-pack/react-simple-icons";
import { Badge } from "@/components/ui/badge";

type props = {
  text: string;
  languages: string[];
  link: string;
  description: string;
};

const Hackpack = ({ text, languages, link, description }: props) => {
  return (
    <Link
      className="items-center justify-between rounded bg-white p-3 opacity-100 hover:opacity-70"
      href={link}
      target="_black"
    >
      <div className="flex items-center justify-between text-lg font-semibold">
        {text}
        <div>
          <Github size={20} />
        </div>
      </div>
      <div className="flex flex-wrap gap-2">
        {languages.map((language, index) => (
          <Badge key={index} className="flex items-center gap-1 text-gray-400">
            <div className="text-hackathon-blue-100">
              {TECHSTACKS[language]}
            </div>
            {language}
          </Badge>
        ))}
      </div>
      <p className="mt-2">{description}</p>
    </Link>
  );
};

export default Hackpack;
