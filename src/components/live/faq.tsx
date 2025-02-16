import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { QUESTIONS } from "@/data/faq";
import Title from "@/components/ui/title";

const FAQ = () => {
  return (
    <div className="flex w-full flex-col items-center">
      <Title>FAQ</Title>
      <div className="w-10/12">
        <Accordion type="single" collapsible className="w-full">
          {QUESTIONS.map(({ question, answer }, index) => (
            <AccordionItem value={question} key={index}>
              <AccordionTrigger>{question}</AccordionTrigger>
              <AccordionContent>{answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
};

export default FAQ;
