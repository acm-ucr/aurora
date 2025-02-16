import { generateSelect, generateStatus } from "./columns";
import { STATUSES } from "@/data/statuses";
import { Tags } from "@/types/dashboard";
import { ColumnDef, CellContext } from "@tanstack/react-table";

type Participant = {
  phone: string;
  major: string;
  age: number;
  country: string;
  school: string;
  grade: string;
  gender: string;
  shirt: string;
  diet: string;
  resume: string;
  name: string;
  email: string;
  roles: string;
  discord: string;
  team: string;
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

export const COLUMNS: (ColumnDef<Participant, string> & {
  searchable?: boolean;
})[] = [
  generateSelect(),
  {
    accessorKey: "name",
    header: "Name",
    enableColumnFilter: true,
    filterFn: "includesString",
    searchable: true,
    cell: (props: CellContext<Participant, Participant["name"]>) => (
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
    cell: (props: CellContext<Participant, Participant["email"]>) => (
      <div>{props.getValue()}</div>
    ),
  },
  {
    accessorKey: "discord",
    header: "Discord",
    enableColumnFilter: true,
    filterFn: "includesString",
    searchable: true,
    cell: (props: CellContext<Participant, Participant["discord"]>) => (
      <div>{props.getValue()}</div>
    ),
  },
  {
    accessorKey: "team",
    header: "Team",
    enableColumnFilter: true,
    filterFn: "includesString",
    searchable: true,
    cell: (props: CellContext<Participant, Participant["team"]>) => (
      <div>{props.getValue() ?? "N/A"}</div>
    ),
  },
  {
    accessorKey: "shirt",
    header: "Shirt",
    enableColumnFilter: true,
    filterFn: "includesString",
    searchable: true,
    cell: (props: CellContext<Participant, Participant["shirt"]>) => (
      <div>{props.getValue() ?? "N/A"}</div>
    ),
  },
  generateStatus(STATUSES),
];

export const ATTRIBUTES = {
  country: "",
  diet: "",
  resume: "",
};

export const SUBCOLUMNS = [
  generateSelect(),
  {
    accessorKey: "school",
    header: "School",
    enableColumnFilter: true,
    filterFn: "includesString",
    searchable: true,
    cell: (props: CellContext<Participant, Participant["school"]>) => (
      <div>{props.getValue()}</div>
    ),
  },
  {
    accessorKey: "grade",
    header: "Grade",
    enableColumnFilter: true,
    filterFn: "includesString",
    searchable: true,
    cell: (props: CellContext<Participant, Participant["grade"]>) => (
      <div>{props.getValue()}</div>
    ),
  },
  {
    accessorKey: "major",
    header: "Major",
    enableColumnFilter: true,
    filterFn: "includesString",
    searchable: true,
    cell: (props: CellContext<Participant, Participant["major"]>) => (
      <div>{props.getValue()}</div>
    ),
  },
  {
    accessorKey: "diet",
    header: "Diet",
    enableColumnFilter: true,
    filterFn: "includesString",
    searchable: true,
    cell: (props: CellContext<Participant, Participant["diet"]>) => (
      <div>{props.getValue()}</div>
    ),
  },
  {
    accessorKey: "age",
    header: "Age",
    enableColumnFilter: true,
    filterFn: "includesString",
    searchable: true,
    cell: (props: CellContext<Participant, Participant["age"]>) => (
      <div>{props.getValue()}</div>
    ),
  },
  {
    accessorKey: "gender",
    header: "Gender",
    enableColumnFilter: true,
    filterFn: "includesString",
    searchable: true,
    cell: (props: CellContext<Participant, Participant["gender"]>) => (
      <div>{props.getValue()}</div>
    ),
  },
];
