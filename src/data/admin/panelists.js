import View from "@/components/admin/dashboards/dashboard/view";
import { generateSelect, generateStatus } from "./columns";
import { STATUSES } from "@/data/statuses";
import { Badge } from "@/components/ui/badge";

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

export const COLUMNS = [
  generateSelect(),
  {
    accessorKey: "name",
    header: "Name",
    enableColumnFilter: true,
    filterFn: "includesString",
    searchable: true,
    cell: ({ getValue }) => (
      <div
        onClick={props.row.getToggleSelectedHandler()}
        className="hover:cursor-pointer"
      >
        {getValue()}
      </div>
    ),
  },
  {
    accessorKey: "email",
    header: "Email",
    enableColumnFilter: true,
    filterFn: "includesString",
    searchable: true,
    cell: ({ getValue }) => (
      <div
        onClick={props.row.getToggleSelectedHandler()}
        className="hover:cursor-pointer"
      >
        {getValue()}
      </div>
    ),
  },
  {
    accessorKey: "title",
    header: "Title",
    enableColumnFilter: true,
    filterFn: "includesString",
    searchable: true,
    cell: ({ getValue }) => (
      <div
        onClick={props.row.getToggleSelectedHandler()}
        className="hover:cursor-pointer"
      >
        {getValue()}
      </div>
    ),
  },
  {
    accessorKey: "panelist",
    header: "Panelist",
    cell: ({ getValue }) => <Badge>{getValue()}</Badge>,
  },
  generateStatus(STATUSES),
  {
    accessorKey: "photo",
    header: "Photo",
    enableSorting: false,
    cell: ({ getValue }) => <View src={getValue()} title="Photo" />,
  },
];
