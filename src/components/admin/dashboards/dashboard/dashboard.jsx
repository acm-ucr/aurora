"use client";
import {
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useState } from "react";
import Toolbar from "./toolbar";
import Filters from "./filters";
import Table from "./table";
import { Label } from "@/components/ui/label";

const Dashboard = ({
  title,
  columns,
  tags,
  statuses,
  subcolumns,
  searchParams,
}) => {
  const [data, setData] = useState([]);
  const [filters, setFilters] = useState([{ id: "status", value: [-1, 0, 1] }]);
  const [selected, setSelected] = useState([]);
  const [loading, setLoading] = useState(true);
  const [meta, setMeta] = useState({
    total: 0,
    first: "",
    last: "",
  });

  const page = title.toLowerCase();
  const empty = `No ${title} Available`;

  const {
    getHeaderGroups,
    getRowModel,
    getFilteredSelectedRowModel,
    toggleAllRowsSelected,
  } = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onRowSelectionChange: setSelected,
    enableRowSelection: true,
    state: {
      rowSelection: selected,
      columnFilters: filters,
    },
  });

  const searchableItems = columns
    .filter(({ searchable }) => searchable)
    .map(({ accessorKey }) => accessorKey);

  return (
    <div className="w-full">
      <div className="my-2 flex items-center">
        <Label className="pr-5 text-2xl font-bold">{title}</Label>

        <Filters
          statuses={statuses}
          filters={filters}
          setFilters={setFilters}
        />
      </div>

      <Toolbar
        meta={meta}
        setMeta={setMeta}
        searchParams={searchParams}
        page={page}
        filters={filters}
        setFilters={setFilters}
        data={data}
        setData={setData}
        tags={tags}
        getFilteredSelectedRowModel={getFilteredSelectedRowModel}
        toggleAllRowsSelected={toggleAllRowsSelected}
        setLoading={setLoading}
        searchableItems={searchableItems}
      />

      <Table
        page={page}
        searchParams={searchParams}
        meta={meta}
        getHeaderGroups={getHeaderGroups}
        getRowModel={getRowModel}
        subcolumns={subcolumns}
        empty={empty}
        loading={loading}
      />
    </div>
  );
};

export default Dashboard;
