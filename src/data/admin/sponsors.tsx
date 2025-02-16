import { TIERS } from "@/data/form/sponsors";
import { generateSelect, generateStatus, generateTiers } from "./columns";
import { STATUSES } from "@/data/statuses";
import { ColumnDef, CellContext } from "@tanstack/react-table";
import { Tags } from "@/types/dashboard";

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

export const COLUMNS: (ColumnDef<Sponsor, string> & {
  searchable?: boolean;
})[] = [
  generateSelect(),
  {
    accessorKey: "name",
    header: "Name",
    enableColumnFilter: true,
    filterFn: "includesString",
    searchable: true,
    cell: (props: CellContext<Sponsor, Sponsor["name"]>) => (
      <div>{props.getValue()}</div>
    ),
  },
  {
    accessorKey: "email",
    header: "Email",
    enableColumnFilter: true,
    filterFn: "includesString",
    searchable: true,
    cell: (props: CellContext<Sponsor, Sponsor["email"]>) => (
      <div>{props.getValue()}</div>
    ),
  },
  {
    accessorKey: "company",
    header: "Company",
    enableColumnFilter: true,
    filterFn: "includesString",
    searchable: true,
    cell: (props: CellContext<Sponsor, Sponsor["company"]>) => (
      <div>{props.getValue()}</div>
    ),
  },
  {
    accessorKey: "position",
    header: "Position",
    enableColumnFilter: true,
    filterFn: "includesString",
    searchable: true,
    cell: (props: CellContext<Sponsor, Sponsor["position"]>) => (
      <div>{props.getValue()}</div>
    ),
  },
  generateTiers(TIERS),
  generateStatus(STATUSES),
];
