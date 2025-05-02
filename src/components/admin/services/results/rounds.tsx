import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { ICONS } from "@/data/admin/icons";
import { QUESTIONS } from "@/data/judge/form";
import { Team } from "@/types/users";
import { Round } from "@/types/rounds";
import Link from "next/link";
type props = { team: Team };
const Rounds = ({ team }: props) => {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex w-full flex-row items-center gap-3">
        <Label className="pr-5 text-2xl font-bold">{team.name}</Label>
        {Object.entries(team.links).map(([key, value], index) => (
          <Link
            key={index}
            href={value ?? ""}
            target="_blank"
            className="hover:text-hackathon-blue-100! text-xl text-black no-underline"
          >
            {ICONS[key]}
          </Link>
        ))}
      </div>

      <Accordion
        type="single"
        collapsible
        className="bg-hackathon-blue-200 w-full rounded-md border-black/20 text-white"
      >
        {team.rounds.map((round: Round[], index: number) => {
          const current = round[0];
          if (!current) {
            return (
              <AccordionItem
                value={`empty-${index}`}
                key={index}
                className="bg-hackathon-gray-200 w-full p-2"
              >
                R{index + 1} - No Judge
              </AccordionItem>
            );
          }
          const judge = current.name;
          const feedback = current.feedback;

          return (
            <AccordionItem value={index.toString() + 1} key={index}>
              <AccordionTrigger className="bg-hackathon-blue-200 w-full px-2 text-white">
                R{index + 1} - {judge}
              </AccordionTrigger>
              <AccordionContent className="flex flex-col gap-6 bg-white p-2 text-black">
                {feedback ? (
                  <div>
                    <div className="text-hackathon-blue-100 flex flex-col text-2xl">
                      <div className="font-bold">TRACKS</div>
                      <div className="flex flex-row gap-2">
                        {feedback.tracks.map((track: string, index: number) => (
                          <Badge key={index} type="accept">
                            {track}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    {QUESTIONS.map((value, index) => {
                      const title = value.title;
                      const question = value.question;
                      const rating =
                        feedback[title.toLocaleLowerCase()]?.rating;
                      const comment =
                        feedback[value.title.toLocaleLowerCase()].comment;
                      return (
                        <div key={index}>
                          <div className="text-hackathon-blue-100 flex flex-row justify-between text-2xl">
                            <div className="font-bold">
                              {title.toUpperCase()}
                            </div>
                            <Badge type="accept">
                              {rating ? `${rating}/5` : "N/A"}
                            </Badge>
                          </div>
                          <div>
                            <div className="text-lg font-bold">{question}</div>
                            <div className="text-black/50">
                              {comment ?? "No Response"}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="font-semibold">No Feedback Submitted</div>
                )}
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
    </div>
  );
};

export default Rounds;
