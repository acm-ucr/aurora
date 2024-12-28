import { Badge } from "@/components/ui/badge";

interface props {
  title: string;
  languages: string[];
  description: string;
  contact: string;
}

const Idea = ({ title, languages, description, contact }: props) => {
  return (
    <div className="h-full w-full rounded-lg bg-white p-3">
      <p className="text-lg font-semibold">{title}</p>
      <div className="my-2 flex gap-3">
        {languages.map((technology, index) => (
          <Badge key={index}>{technology}</Badge>
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
