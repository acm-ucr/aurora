import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { ICONS } from "@/data/admin/icons";
import { FIELDS } from "@/data/judge/form";
import { Team } from "@/types/users";
import { Round } from "@/types/rounds";
import Link from "next/link";
type props = { team: Team };
const Rounds = ({ team }: props) => {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex w-full flex-row items-center gap-3">
        <Label className="pr-5 text-2xl font-bold">
          Team {team.table} - {team.name}
        </Label>
        {Object.entries(team.links).map(([key, value], index) => {
          if (!value.length) return null;
          return (
            <Link
              key={index}
              href={value ?? ""}
              target="_blank"
              className="text-xl text-black no-underline hover:!text-hackathon-blue-100"
            >
              {ICONS[key]}
            </Link>
          );
        })}
      </div>

      <Accordion
        type="single"
        collapsible
        className="w-full overflow-hidden rounded-xl border-black/20 bg-hackathon-blue-200 text-white"
      >
        {team.rounds.map((round: Round[], index: number) => {
          const current = round[0];
          if (!current) {
            return (
              <AccordionItem
                value={`empty-${index}`}
                key={index}
                className="w-full bg-hackathon-gray-200 p-2"
              >
                R{index + 1} - No Judge
              </AccordionItem>
            );
          }
          const judge = current.name;
          const feedback = current.feedback;

          return (
            <AccordionItem value={index.toString() + 1} key={index}>
              <AccordionTrigger className="w-full bg-hackathon-blue-200 px-2 text-white">
                R{index + 1} - {judge}
              </AccordionTrigger>
              <AccordionContent className="flex flex-col gap-6 bg-white p-2 text-black">
                <div>
                  <div className="flex flex-col text-2xl text-hackathon-blue-100">
                    <div className="font-bold">TRACKS</div>
                    <div className="flex flex-row gap-2">
                      {feedback?.tracks.map((track: string, index: number) => (
                        <Badge key={index} type="accept">
                          {track}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  {Object.entries(FIELDS).map(([key, value], index) => {
                    const title = value.title;
                    const question = value.question;
                    const rating =
                      feedback?.[title.toLocaleLowerCase()].rating ?? 0;
                    const comment =
                      feedback?.[value.title.toLocaleLowerCase()].comment ??
                      "No Response";
                    if (key === "tracks") return null;
                    return (
                      <div key={index}>
                        <div className="flex flex-row justify-between text-2xl text-hackathon-blue-100">
                          <div className="font-bold">{title.toUpperCase()}</div>
                          <Badge type="accept">{rating}/5</Badge>
                        </div>
                        <div>
                          <div className="text-lg font-bold">{question}</div>
                          <div className="text-black/50">{comment}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
    </div>
  );
};

export default Rounds;
