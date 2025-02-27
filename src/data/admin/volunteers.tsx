import { generateSelect, generateStatus } from "./columns";
import { STATUSES } from "@/data/statuses";
import { Tags } from "@/types/dashboard";
import { ColumnDef, CellContext } from "@tanstack/react-table";

type Volunteer = {
  name: string;
  email: string;
  phone: string;
  discord: string;
  major: string;
  grade: string;
  availability: string[];
  gender: string;
  shirt: string;
};

export const TAGS: Tags[] = [
  {
    text: "confirm",
    value: 1,
  },
  {
    text: "not attending",
    value: -1,
  },
];

export const COLUMNS: (ColumnDef<Volunteer, string> & {
  searchable?: boolean;
})[] = [
  generateSelect(),
  {
    accessorKey: "name",
    header: "Name",
    enableColumnFilter: true,
    filterFn: "includesString",
    searchable: true,
    cell: (props: CellContext<Volunteer, Volunteer["name"]>) => (
      <div
        onClick={props.row.getToggleSelectedHandler()}
        className="hover:cursor-pointer"
      >
        {props.getValue()}
      </div>
    ),
  },
  {
    accessorKey: "email",
    header: "Email",
    enableColumnFilter: true,
    filterFn: "includesString",
    searchable: true,
    cell: (props: CellContext<Volunteer, Volunteer["email"]>) => (
      <div
        onClick={props.row.getToggleSelectedHandler()}
        className="hover:cursor-pointer"
      >
        {props.getValue()}
      </div>
    ),
  },
  {
    accessorKey: "discord",
    header: "Discord",
    enableColumnFilter: true,
    filterFn: "includesString",
    searchable: true,
    cell: (props: CellContext<Volunteer, Volunteer["discord"]>) => (
      <div
        onClick={props.row.getToggleSelectedHandler()}
        className="hover:cursor-pointer"
      >
        {props.getValue()}
      </div>
    ),
  },
  {
    accessorKey: "shirt",
    header: "Shirt",
    enableColumnFilter: true,
    filterFn: "includesString",
    searchable: true,
    cell: (props: CellContext<Volunteer, Volunteer["shirt"]>) => (
      <div
        onClick={props.row.getToggleSelectedHandler()}
        className="hover:cursor-pointer"
      >
        {props.getValue()}
      </div>
    ),
  },
  {
    accessorKey: "gender",
    header: "Gender",
    enableColumnFilter: true,
    filterFn: "includesString",
    searchable: true,
    cell: (props: CellContext<Volunteer, Volunteer["gender"]>) => (
      <div
        onClick={props.row.getToggleSelectedHandler()}
        className="hover:cursor-pointer"
      >
        {props.getValue()}
      </div>
    ),
  },
  {
    accessorKey: "grade",
    header: "Grade",
    enableColumnFilter: true,
    filterFn: "includesString",
    searchable: true,
    cell: (props: CellContext<Volunteer, Volunteer["grade"]>) => (
      <div
        onClick={props.row.getToggleSelectedHandler()}
        className="hover:cursor-pointer"
      >
        {props.getValue()}
      </div>
    ),
  },
  generateStatus(STATUSES),
];
