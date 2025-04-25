import Link from "next/link";
import { generateSelect, generateStatus } from "./columns";
import { ICONS } from "./icons";
import { STATUSES } from "@/data/statuses";
import { ColumnDef } from "@tanstack/react-table";
import { Column, Tags } from "@/types/dashboard";
import { Team } from "@/types/users";

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

export const COLUMNS: (ColumnDef<Team> & Column)[] = [
  generateSelect(),
  {
    accessorKey: "name",
    header: "Name",
    enableColumnFilter: true,
    filterFn: "includesString",
    searchable: true,
    cell: ({ row }) => (
      <div
        onClick={row.getToggleSelectedHandler()}
        className="hover:cursor-pointer"
      >
        {row.getValue("name")}
      </div>
    ),
  },
  {
    accessorKey: "teamid",
    header: "Team ID",
    enableColumnFilter: true,
    filterFn: "includesString",
    searchable: true,
    cell: ({ row }) => (
      <div
        onClick={row.getToggleSelectedHandler()}
        className="hover:cursor-pointer"
      >
        {row.getValue("teamid")}
      </div>
    ),
  },
  {
    accessorKey: "members",
    header: "Members",
    enableSorting: false,
    filterFn: "includesString",
    enableColumnFilter: true,
    searchable: true,
    cell: ({ row }) => (
      <div
        onClick={row.getToggleSelectedHandler()}
        className="hover:cursor-pointer"
      >
        {(row.getValue("members") as string[]).map((data, index) => (
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
    cell: ({ row }) => (
      <div
        onClick={row.getToggleSelectedHandler()}
        className="hover:cursor-pointer"
      >
        {(row.getValue("discords") as string[]).map((data, index) => (
          <p key={index}>{data}</p>
        ))}
      </div>
    ),
  },
  {
    accessorKey: "links",
    header: "Links",
    enableSorting: false,
    searchable: false,
    cell: ({ row }) => (
      <div
        onClick={row.getToggleSelectedHandler()}
        className="hover:cursor-pointer"
      >
        {Object.entries(
          row.getValue("links") as Record<string, string | undefined>,
        ).map(([key, value], index) => (
          <Link key={index} href={value ?? ""} className="mx-2 inline-flex">
            {ICONS[key]}
          </Link>
        ))}
      </div>
    ),
  },
  generateStatus(STATUSES),
];
