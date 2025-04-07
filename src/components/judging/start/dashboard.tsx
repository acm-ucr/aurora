import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import Link from "next/link";
import { Label } from "@/components/ui/label";
import { Pencil } from "lucide-react";
import { Badge } from "@/components/ui/badge";
const Dashboard = () => {
  return (
    <div className="w-full">
      <Label className="pr-5 text-2xl font-bold">Judging</Label>
      <Accordion
        type="single"
        collapsible
        className="w-full rounded-md border-black/20 bg-hackathon-blue-200 text-white"
      >
        <AccordionItem value="item-1" className="w-full">
          <div className="text-md flex w-full flex-row items-center justify-between px-2">
            <AccordionTrigger hidden>ROUND 1 - TEAM 1</AccordionTrigger>
            <Link
              href="/judge/start/1"
              className="text-md flex flex-row items-center justify-between gap-2 rounded-md bg-hackathon-tags-gray-bg px-2 py-1 text-hackathon-tags-gray-text"
            >
              <Pencil size={20} />
              <div className="text-md">edit</div>
            </Link>
          </div>
          <AccordionContent className="bg-white p-2 text-black">
            <div className="flex flex-row justify-between text-2xl text-hackathon-blue-100">
              <div className="font-bold">IMPLEMENTATION</div>
              <Badge type="accept">4/5</Badge>
            </div>
            <div>
              <div className="text-lg font-bold">
                Describe the complexity of the project.
              </div>
              <div className="text-black/50">
                The technical execution of this project was pretty good!
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};
export default Dashboard;
