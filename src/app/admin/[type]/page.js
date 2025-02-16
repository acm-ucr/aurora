import ProtectedPage from "@/components/protected";
import Admins from "@/components/admin/dashboards/admins";
import Events from "@/components/admin/services/calendar";
import CheckIn from "@/components/admin/services/checkin";
import Committees from "@/components/admin/dashboards/committees";
import Feedback from "@/components/admin/dashboards/feedback";
import Interests from "@/components/admin/dashboards/interests";
import Judges from "@/components/admin/dashboards/judges";
import Judging from "@/components/admin/services/judging/judging";
import Mentors from "@/components/admin/dashboards/mentors";
import Contacts from "@/components/admin/services/contacts";
import Participants from "@/components/admin/dashboards/participants";
import Sponsors from "@/components/admin/dashboards/sponsors";
import Panelists from "@/components/admin/dashboards/panelists";
import Statistics from "@/components/admin/services/statistics";
import Teams from "@/components/admin/dashboards/teams";
import Volunteers from "@/components/admin/dashboards/volunteers";
import Leads from "@/components/admin/dashboards/leads";
import Settings from "@/components/admin/services/settings";
import Timer from "@/components/admin/services/timer";
import { notFound } from "next/navigation";

const Page = ({ params, searchParams }) => {
  const components = {
    admins: <Admins searchParams={searchParams} />,
    calendar: <Events />,
    checkin: <CheckIn />,
    committees: <Committees searchParams={searchParams} />,
    feedback: <Feedback searchParams={searchParams} />,
    interests: <Interests searchParams={searchParams} />,
    judges: <Judges searchParams={searchParams} />,
    judging: <Judging />,
    mentors: <Mentors searchParams={searchParams} />,
    contacts: <Contacts />,
    participants: <Participants searchParams={searchParams} />,
    settings: <Settings />,
    sponsors: <Sponsors searchParams={searchParams} />,
    panelists: <Panelists searchParams={searchParams} />,
    statistics: <Statistics />,
    teams: <Teams searchParams={searchParams} />,
    volunteers: <Volunteers searchParams={searchParams} />,
    leads: <Leads searchParams={searchParams} />,
    timer: <Timer searchParams={searchParams} />,
  };

  const capitalizeFirstLetter = (word) => {
    return word[0].toUpperCase() + word.slice(1);
  };

  if (components.hasOwnProperty(params.type)) {
    return (
      <ProtectedPage
        title={`Admin | ${capitalizeFirstLetter(params.type)}`}
        restrictions={{ admins: [1] }}
      >
        {components[params.type]}
      </ProtectedPage>
    );
  } else {
    notFound();
  }
};

export default Page;
