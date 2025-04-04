import { generateAffiliation, generateSelect, generateStatus } from "./columns";
import { AFFILIATIONS } from "../form/information";
import { STATUSES } from "../statuses";
import { CellContext, ColumnDef } from "@tanstack/react-table";
import { Tags } from "@/types/dashboard";

type Admin = {
  name: string;
  email: string;
  affiliation: string;
  discord: string;
  major: string;
  grade: string;
  gender: string;
  shirt: string;
  age: string;
  diet: string;
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

export const COLUMNS: (ColumnDef<Admin, string> & {
  searchable?: boolean;
})[] = [
  generateSelect(),
  {
    accessorKey: "name",
    header: "Name",
    enableColumnFilter: true,
    filterFn: "includesString",
    searchable: true,
    cell: (props: CellContext<Admin, Admin["name"]>) => (
      <div
        onClick={(e) => {
          props.row.getToggleSelectedHandler()(e);
          props.row.getToggleExpandedHandler()();
        }}
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
    cell: (props: CellContext<Admin, Admin["email"]>) => (
      <div
        onClick={(e) => {
          props.row.getToggleSelectedHandler()(e);
          props.row.getToggleExpandedHandler()();
        }}
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
    cell: (props: CellContext<Admin, Admin["discord"]>) => (
      <div
        onClick={(e) => {
          props.row.getToggleSelectedHandler()(e);
          props.row.getToggleExpandedHandler()();
        }}
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
    cell: (props: CellContext<Admin, Admin["shirt"]>) => (
      <div
        onClick={(e) => {
          props.row.getToggleSelectedHandler()(e);
          props.row.getToggleExpandedHandler()();
        }}
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
    cell: (props: CellContext<Admin, Admin["gender"]>) => (
      <div
        onClick={(e) => {
          props.row.getToggleSelectedHandler()(e);
          props.row.getToggleExpandedHandler()();
        }}
        className="hover:cursor-pointer"
      >
        {props.getValue()}
      </div>
    ),
  },
  generateAffiliation(AFFILIATIONS),
  generateStatus(STATUSES),
];

export const SUBCOLUMNS = [
  generateSelect(),
  {
    accessorKey: "grade",
    header: "Grade",
    enableColumnFilter: true,
    filterFn: "includesString",
    searchable: true,
    cell: (props: CellContext<Admin, Admin["grade"]>) => (
      <div
        onClick={(e) => {
          props.row.getToggleSelectedHandler()(e);
          props.row.getToggleExpandedHandler()();
        }}
        className="hover:cursor-pointer"
      >
        {props.getValue()}
      </div>
    ),
  },
  {
    accessorKey: "major",
    header: "Major",
    enableColumnFilter: true,
    filterFn: "includesString",
    searchable: true,
    cell: (props: CellContext<Admin, Admin["major"]>) => (
      <div
        onClick={(e) => {
          props.row.getToggleSelectedHandler()(e);
          props.row.getToggleExpandedHandler()();
        }}
        className="hover:cursor-pointer"
      >
        {props.getValue()}
      </div>
    ),
  },
  {
    accessorKey: "diet",
    header: "Diet",
    enableColumnFilter: true,
    filterFn: "includesString",
    searchable: true,
    cell: (props: CellContext<Admin, Admin["diet"]>) => (
      <div
        onClick={(e) => {
          props.row.getToggleSelectedHandler()(e);
          props.row.getToggleExpandedHandler()();
        }}
        className="hover:cursor-pointer"
      >
        {props.getValue()}
      </div>
    ),
  },
  {
    accessorKey: "age",
    header: "Age",
    enableColumnFilter: true,
    filterFn: "includesString",
    searchable: true,
    cell: (props: CellContext<Admin, Admin["age"]>) => (
      <div
        onClick={(e) => {
          props.row.getToggleSelectedHandler()(e);
          props.row.getToggleExpandedHandler()();
        }}
        className="hover:cursor-pointer"
      >
        {props.getValue()}
      </div>
    ),
  },
];
