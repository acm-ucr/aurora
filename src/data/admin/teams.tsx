import Link from "next/link";
import { generateSelect, generateStatus } from "./columns";
import { ICONS } from "./icons";
import { STATUSES } from "@/data/statuses";
import { ColumnDef, CellContext } from "@tanstack/react-table";
import { Tags } from "@/types/dashboard";

type Team = {
  name: string;
  teamid: string;
  members: string[];
  discords: string[];
  links: {
    name: string;
    link: string;
  }[];
};

export const TAGS: Tags[] = [
  {
    text: "accept",
    value: 1,
  },
  {
    text: "reject",
    value: -1,
  },
];

export const COLUMNS: (ColumnDef<Team, string | string[]> & {
  searchable?: boolean;
})[] = [
  generateSelect(),
  {
    accessorKey: "name",
    header: "Name",
    enableColumnFilter: true,
    filterFn: "includesString",
    searchable: true,
    cell: (props: CellContext<Team, Team["name"]>) => (
      <div>{props.getValue()}</div>
    ),
  },
  {
    accessorKey: "teamid",
    header: "Team ID",
    enableColumnFilter: true,
    filterFn: "includesString",
    searchable: true,
    cell: (props: CellContext<Team, Team["teamid"]>) => (
      <div>{props.getValue()}</div>
    ),
  },
  {
    accessorKey: "members",
    header: "Members",
    enableSorting: false,
    filterFn: "includesString",
    enableColumnFilter: true,
    searchable: true,
    cell: (props: CellContext<Team, Team["members"]>) => (
      <div>
        {props.getValue().map((data, index) => (
          <p key={index}>{data}</p>
        ))}
      </div>
    ),
  },
  {
    accessorKey: "discords",
    header: "Discords",
    enableSorting: false,
    enableColumnFilter: true,
    filterFn: "includesString",
    searchable: true,
    cell: (props: CellContext<Team, Team["discords"]>) => (
      <div>
        {props.getValue().map((data, index) => (
          <p key={index}>{data}</p>
        ))}
      </div>
    ),
  },
  {
    accessorKey: "links",
    header: "Links",
    enableSorting: false,
    cell: (props: CellContext<Team, Team["links"]>) => (
      <div>
        {props.getValue().map(({ name, link }, index) => (
          <Link key={index} href={link} className="mx-2 inline-flex">
            {ICONS[name]}
          </Link>
        ))}
      </div>
    ),
  },
  generateStatus(STATUSES),
];
