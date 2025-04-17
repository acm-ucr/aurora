import { generateSelect, generateStatus } from "./columns";
import { STATUSES } from "@/data/statuses";
import { Column, Tags } from "@/types/dashboard";
import { ColumnDef } from "@tanstack/react-table";
import { Interest } from "@/types/users";

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

export const COLUMNS: (ColumnDef<Interest, string> & Column)[] = [
  generateSelect(),
  {
    accessorFn: (row) => `${row.firstName} ${row.lastName}`,
    accessorKey: "name",
    id: "fullName",
    header: "Name",
    enableColumnFilter: true,
    filterFn: "includesString",
    searchable: true,
    cell: ({ row }) => (
      <div
        onClick={row.getToggleSelectedHandler()}
        className="hover:cursor-pointer"
      >
        {row.getValue("fullName")}
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
    accessorKey: "eventSource",
    header: "Event Source",
    enableColumnFilter: true,
    filterFn: "includesString",
    searchable: true,
    cell: ({ row }) => (
      <div
        onClick={row.getToggleSelectedHandler()}
        className="hover:cursor-pointer"
      >
        {row.getValue("eventSource")}
      </div>
    ),
  },
  generateStatus(STATUSES),
];
