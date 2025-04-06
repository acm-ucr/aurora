import { CellContext, ColumnDef } from "@tanstack/react-table";
import { generateSelect, generateStatus } from "./columns";
import { Column, Tags } from "@/types/dashboard";

export const STATUSES = {
  1: "read",
  0: "unread",
};

export const TAGS: Tags[] = [
  {
    text: "read",
    value: 1,
  },
  {
    text: "unread",
    value: 0,
  },
];

type Feedback = {
  rating: string;
  eventSource: string;
  improvements: string;
  helpful: string;
};

export const COLUMNS: (ColumnDef<Feedback> & Column)[] = [
  generateSelect(),
  {
    accessorKey: "rating",
    header: "Rating",
    searchable: true,
    cell: (props: CellContext<Feedback, Feedback["rating"]>) => (
      <div
        onClick={props.row.getToggleSelectedHandler()}
        className="hover:cursor-pointer"
      >
        {props.getValue()}
      </div>
    ),
  },
  {
    accessorKey: "eventSource",
    header: "Event Source",
    searchable: true,
    cell: (props: CellContext<Feedback, Feedback["eventSource"]>) => (
      <div
        onClick={props.row.getToggleSelectedHandler()}
        className="hover:cursor-pointer"
      >
        {props.getValue()}
      </div>
    ),
  },
  {
    accessorKey: "improvements",
    header: "Improvements",
    searchable: true,
    cell: (props: CellContext<Feedback, Feedback["improvements"]>) => (
      <div
        onClick={props.row.getToggleSelectedHandler()}
        className="hover:cursor-pointer"
      >
        {props.getValue()}
      </div>
    ),
  },
  {
    accessorKey: "helpful",
    header: "Helpful",
    searchable: true,
    cell: (props: CellContext<Feedback, Feedback["helpful"]>) => (
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
