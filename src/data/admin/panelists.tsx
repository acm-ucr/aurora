import View from "@/components/admin/dashboards/dashboard/view";
import { generateSelect, generateStatus } from "./columns";
import { STATUSES } from "@/data/statuses";
import { Badge } from "@/components/ui/badge";
import { ColumnDef } from "@tanstack/react-table";
import { Column } from "@/types/dashboard";

export const TAGS = [
  {
    text: "accept",
    value: 1,
  },
  {
    text: "reject",
    value: -1,
  },
];

type Panelist = {
  name: string;
  email: string;
  discord: string;
  availability: string[];
  response: string;
  shirt: string;
  gender: string;
  grade: string;
};

export const COLUMNS: (ColumnDef<Panelist> & Column)[] = [
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
        <p>{row.getValue("email")}</p>
      </div>
    ),
  },
  {
    accessorKey: "title",
    header: "Title",
    enableColumnFilter: true,
    filterFn: "includesString",
    searchable: true,
    cell: ({ row }) => (
      <div
        onClick={row.getToggleSelectedHandler()}
        className="hover:cursor-pointer"
      >
        {row.getValue("title")}
      </div>
    ),
  },
  {
    accessorKey: "panelist",
    header: "Panelist",
    cell: ({ row }) => <Badge>{row.getValue("panelist")}</Badge>,
    searchable: false,
  },
  generateStatus(STATUSES),
  {
    accessorKey: "photo",
    header: "Photo",
    enableSorting: false,
    searchable: false,
    cell: ({ row }) => <View src={row.getValue("photo")} title="Photo" />,
  },
];
