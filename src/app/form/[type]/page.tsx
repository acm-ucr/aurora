import Admin from "@/components/form/admin";
import Committee from "@/components/form/committee";
import Feedback from "@/components/form/feedback";
import Interest from "@/components/form/interest";
import Mentor from "@/components/form/mentor";
import Participant from "@/components/form/participant";
import Sponsor from "@/components/form/sponsor";
import Volunteer from "@/components/form/volunteer";
import Panel from "@/components/form/panelist";
import Lead from "@/components/form/lead";
import Ideas from "@/components/form/ideas";
import ProtectedPage from "@/components/protected";
import Fault from "@/utils/error";
import React from "react";

type props = {
  params: { type: string };
};

const components: Record<string, React.ReactElement> = {
  admin: <Admin />,
  committee: <Committee />,
  feedback: <Feedback />,
  interest: <Interest />,
  mentor: <Mentor />,
  participant: <Participant />,
  sponsor: <Sponsor />,
  panel: <Panel />,
  volunteer: <Volunteer />,
  lead: <Lead />,
  idea: <Ideas />,
};
const capitalizeFirstLetter = (word: string) => {
  return word[0].toUpperCase() + word.slice(1);
};

const Page = ({ params }: props) => {
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
    throw new Fault(
      404,
      "Page Not Found",
      "The page you are looking for does not seem to exist",
    );
  }
};

export default Page;
