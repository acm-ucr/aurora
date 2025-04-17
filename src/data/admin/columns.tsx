import { COLORS } from "../tags";
import Checkbox from "@/components/checkbox";
import { Table, Row, CellContext } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";

export const generateSelect = <TData extends object>() => ({
  id: "select",
  searchable: false,
  size: 50,
  header: ({ table }: { table: Table<TData> }) => (
    <Checkbox
      id="select-all"
      checked={table.getIsAllRowsSelected()}
      onClick={(e) => {
        table.getToggleAllRowsSelectedHandler()(e);
        table.getToggleAllRowsExpandedHandler()(e);
      }}
    />
  ),
  cell: ({ row }: { row: Row<TData> }) => (
    <Checkbox
      id="select-one"
      checked={row.getIsSelected()}
      onClick={(e) => {
        row.getToggleSelectedHandler()(e);
        row.getToggleExpandedHandler()();
      }}
    />
  ),
});

export const generateAffiliation = <TData extends object>() => ({
  accessorKey: "affiliation",
  header: "Affiliation",
  searchable: false,
  cell: ({ row }: CellContext<TData, string>) => {
    if (!row.getValue("affiliation")) {
      return <Badge>None</Badge>;
    }

    const affiliation: string = row.getValue("affiliation");

    return (
      <Badge type={affiliation.toLowerCase() as keyof typeof COLORS}>
        {affiliation}
      </Badge>
    );
  },
});

export const generateStatus = <TData extends object>(
  statuses: Record<string, string>,
) => {
  return {
    accessorKey: "status",
    header: "Status",
    enableColumnFilter: true,
    searchable: false,
    filterFn: (row: Row<TData>, col: string, filter: string[]) => {
      const status = row.getValue(col) as string;
      return filter.includes(status);
    },

    cell: ({ row }: CellContext<TData, string>) => (
      <Badge type={row.getValue("status") as keyof typeof COLORS}>
        {statuses[row.getValue("status") as keyof typeof statuses]}
      </Badge>
    ),
  };
};

export const generateTiers = <TData extends object>(
  tiers: Record<string, string>,
) => ({
  accessorKey: "tier",
  header: "Tier",
  searchable: false,
  cell: ({ getValue }: CellContext<TData, string>) => (
    <Badge>{tiers[getValue().toLowerCase()]}</Badge>
  ),
});
