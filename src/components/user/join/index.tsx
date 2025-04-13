import { fetchTeam } from "../actions/fetchTeam";
import Invite from "./invite";

interface props {
  params: {
    team: string;
  };
}

const Join = async ({ params }: props) => {
  const { team: id } = params;
  const team = await fetchTeam(id);

  return team && <Invite team={team} id={id} />;
};

export default Join;
