import { Badge } from "@/components/ui/badge";
import { TECHSTACKS } from "@/data/user/hackpacks";

interface props {
  title: string;
  languages: string[];
  description: string;
  contact: string;
}

const Idea = ({ title, languages, description, contact }: props) => {
  return (
    <div className="h-full w-full rounded bg-white p-3">
      <p className="text-lg font-semibold">{title}</p>
      <div className="my-2 flex gap-3">
        {languages.map((language, index) => (
          <Badge key={index} className="flex gap-1">
            <div className="text-hackathon-blue-100">
              {TECHSTACKS[language]}
            </div>
            {language}
          </Badge>
        ))}
      </div>
      <p>{description}</p>

      <p className="my-2">
        <span className="font-semibold">Contact:</span> {contact}
      </p>
    </div>
  );
};

export default Idea;
