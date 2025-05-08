import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { FIELDS } from "@/data/judge/form";
import { Team } from "@/types/users";
import { Round } from "@/types/rounds";
import { cn } from "@/utils/tailwind";
import Link from "next/link";
import { COLORS } from "@/data/tags";
import { ICONS } from "@/data/admin/icons";

type props = { team: Team };
const Rounds = ({ team }: props) => {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex w-full flex-row items-center justify-between gap-3">
        <Label className="pr-5 text-2xl font-bold hover:cursor-default">
          Team {team.table} - {team.name}
        </Label>
        <div className="flex gap-3">
          {Object.entries(team.links).map(([key, value], index) => {
            if (!value.length) return null;
            const text = key.charAt(0).toLocaleUpperCase() + key.slice(1);
            return (
              <Link
                key={index}
                href={value}
                className={cn(
                  COLORS[key as keyof typeof COLORS].background,
                  COLORS[key as keyof typeof COLORS].text,
                  COLORS[key as keyof typeof COLORS].hover,
                  "inline-flex rounded-md px-4 py-2",
                )}
              >
                <div>{ICONS[key as keyof typeof ICONS]}</div>
                <div>{text}</div>
              </Link>
            );
          })}
        </div>
      </div>

      <Accordion
        type="single"
        collapsible
        className="w-full overflow-hidden rounded border-black/20 bg-hackathon-blue-200 text-white"
      >
        {team.rounds.map((round: Round[], index: number) => {
          const current = round[0];
          if (!current) {
            return (
              <AccordionItem
                value={`empty-${index}`}
                key={index}
                className="w-full bg-hackathon-gray-200 px-6 py-4"
              >
                R{index + 1} - No Judge
              </AccordionItem>
            );
          }
          const judge = current.name;
          const feedback = current.feedback;

          return (
            <AccordionItem value={index.toString() + 1} key={index}>
              <AccordionTrigger className="w-full bg-hackathon-blue-200 px-6 text-white">
                R{index + 1} - {judge}
              </AccordionTrigger>
              <AccordionContent className="flex flex-col bg-white p-6 text-black">
                <div className="flex flex-col gap-6">
                  <div className="flex flex-col text-2xl text-hackathon-blue-100">
                    <div className="font-bold">TRACKS</div>
                    <div className="flex flex-row gap-2">
                      {feedback ? (
                        feedback?.tracks.map((track: string, index: number) => (
                          <Badge
                            key={index}
                            type={
                              track
                                .toLowerCase()
                                .replace("/", "") as keyof typeof COLORS
                            }
                          >
                            {track}
                          </Badge>
                        ))
                      ) : (
                        <div className="text-sm text-black/50">
                          No tracks selected
                        </div>
                      )}
                    </div>
                  </div>
                  {Object.entries(FIELDS).map(([key, value], index) => {
                    const title = value.title;
                    const question = value.question;
                    const rating =
                      feedback?.[title.toLocaleLowerCase()].rating ?? 0;
                    const comment =
                      feedback?.[value.title.toLocaleLowerCase()].comment ??
                      "No response";
                    if (key === "tracks") return null;
                    return (
                      <div key={index}>
                        <div className="flex flex-row justify-between text-2xl">
                          <div className="flex items-center gap-2 text-hackathon-blue-100">
                            <div className="font-bold">
                              {title.toUpperCase()}
                            </div>
                            <span>-</span>
                            <div className="text-lg">{question}</div>
                          </div>
                          <Badge type={`${rating}/5` as keyof typeof COLORS}>
                            {rating}/5
                          </Badge>
                        </div>
                        <div className="text-black/50">{comment}</div>
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
