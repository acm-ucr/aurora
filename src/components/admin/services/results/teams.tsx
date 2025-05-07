import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Team } from "@/types/users";

type props = { teams: Team[]; setTeam: (value: Team) => void };
const Teams = ({ teams, setTeam }: props) => {
  return (
    <ToggleGroup type="single" className="grid w-full grid-cols-6">
      {teams?.map(({ name, table, ...team }, index) => {
        return (
          <ToggleGroupItem
            key={index}
            value={name + index}
            className="items-center justify-between whitespace-nowrap rounded bg-white px-4 py-6 text-left opacity-100 hover:opacity-70 data-[state=on]:bg-hackathon-blue-100 data-[state=on]:text-white"
            onClick={() => setTeam({ name, table, ...team })}
          >
            <div className="w-3/4 truncate text-ellipsis">
              Team {table} - {name}
            </div>
          </ToggleGroupItem>
        );
      })}
    </ToggleGroup>
  );
};

export default Teams;
