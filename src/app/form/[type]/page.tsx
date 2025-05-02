import Admin from "@/components/form/admin";
import Committee from "@/components/form/committee";
import Feedback from "@/components/form/feedback";
import Interest from "@/components/form/interest";
import Mentor from "@/components/form/mentor";
import Participant from "@/components/form/participant";
import Sponsor from "@/components/form/sponsor";
import Volunteer from "@/components/form/volunteer";
import Panel from "@/components/form/panel";
import Lead from "@/components/form/lead";
import Ideas from "@/components/form/ideas";
import Judge from "@/components/form/judge";
import ProtectedPage from "@/components/protected";
import React from "react";
import { notFound } from "next/navigation";

type props = {
  params: Promise<{ type: string }>;
};

const components: Record<string, React.ReactElement<any>> = {
  admin: <Admin />,
  committee: <Committee />,
  feedback: <Feedback />,
  interest: <Interest />,
  mentor: <Mentor />,
  participant: <Participant />,
  judge: <Judge />,
  sponsor: <Sponsor />,
  panel: <Panel />,
  volunteer: <Volunteer />,
  lead: <Lead />,
  idea: <Ideas />,
};
const capitalizeFirstLetter = (word: string) => {
  return word[0].toUpperCase() + word.slice(1);
};

const Page = async (props0: props) => {
  const params = await props0.params;
  if (components.hasOwnProperty(params.type)) {
    return (
      <ProtectedPage
        title={`Form | ${capitalizeFirstLetter(params.type)}`}
        restrictions={{}}
      >
        {components[params.type]}
      </ProtectedPage>
    );
  } else {
    notFound();
  }
};

export default Page;
