import ProtectedPage from "@/components/protected";
import Events from "@/components/admin/services/calendar";
import CheckIn from "@/components/admin/services/checkin";
import Judging from "@/components/admin/services/judging/judging";
import Contacts from "@/components/admin/services/contacts";
import Results from "@/components/admin/services/results";
import Statistics from "@/components/admin/services/statistics";
import Settings from "@/components/admin/services/settings";
import Timer from "@/components/admin/services/timer";
import { notFound } from "next/navigation";

const Page = ({ params, searchParams }) => {
  const components = {
    calendar: <Events />,
    checkin: <CheckIn />,
    judging: <Judging />,
    contacts: <Contacts />,
    results: <Results />,
    settings: <Settings />,
    statistics: <Statistics />,
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
