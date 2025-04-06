import { TIERS } from "@/data/form/sponsors";
import { generateSelect, generateStatus, generateTiers } from "./columns";
import { STATUSES } from "@/data/statuses";
import { ColumnDef } from "@tanstack/react-table";
import { Column, Tags } from "@/types/dashboard";

type Sponsor = {
  name: string;
  email: string;
  company: string;
  position: string;
  tier: string;
  comments: string;
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

export const COLUMNS: (ColumnDef<Sponsor> & Column)[] = [
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
    accessorKey: "email",
    header: "Email",
    enableColumnFilter: true,
    filterFn: "includesString",
    searchable: true,
    cell: ({ row }) => (
      <div
        onClick={row.getToggleSelectedHandler()}
        className="hover:cursor-pointer"
      >
        {row.getValue("email")}
      </div>
    ),
  },
  {
    accessorKey: "company",
    header: "Company",
    enableColumnFilter: true,
    filterFn: "includesString",
    searchable: true,
    cell: ({ row }) => (
      <div
        onClick={row.getToggleSelectedHandler()}
        className="hover:cursor-pointer"
      >
        {row.getValue("company")}
      </div>
    ),
  },
  {
    accessorKey: "position",
    header: "Position",
    enableColumnFilter: true,
    filterFn: "includesString",
    searchable: true,
    cell: ({ row }) => (
      <div
        onClick={row.getToggleSelectedHandler()}
        className="hover:cursor-pointer"
      >
        {row.getValue("position")}
      </div>
    ),
  },
  generateTiers(TIERS),
  generateStatus(STATUSES),
];
