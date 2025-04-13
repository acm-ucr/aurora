import {
  getCoreRowModel,
  getExpandedRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useState } from "react";
import Toolbar from "./toolbar";
import Filters from "./filters";
import Table from "./table";
import { Label } from "@/components/ui/label";

import { api } from "@/utils/api";

import { useEffect } from "react";

import { useInfiniteQuery, keepPreviousData } from "@tanstack/react-query";

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
  const [expanded, setExpanded] = useState({});
  const [meta, setMeta] = useState({
    total: 0,
    last: "",
  });

  const page = title.toLowerCase();
  const empty = `No ${title} Available`;

  const fetchData = async ({ pageParam }) => {
    const { size = 20 } = searchParams;

    const res = await api({
      url: `/api/dashboard/${page}?size=${size}&last=${pageParam}`,
      method: "GET",
    });

    setMeta({ total: res.total, last: res.last });

    return { items: res.items, last: res.last, total: res.total };
  };

  const {
    data: queryData,
    fetchNextPage,
    refetch,
    isFetching,
    isRefetching,
    isLoading,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: [page, searchParams],
    queryFn: fetchData,
    initialPageParam: undefined,
    getNextPageParam: (lastPage) => lastPage.last,
    placeholderData: keepPreviousData,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (queryData) {
      const flattenedData = queryData.pages.flatMap((page) => page.items || []);
      setData(flattenedData);
    }
  }, [queryData, isLoading, isFetching]);

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
    getSortedRowModel: getSortedRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    getRowCanExpand: (_row) => true,
    onRowSelectionChange: setSelected,
    enableRowSelection: true,
    onExpandedChange: setExpanded,
    state: {
      rowSelection: selected,
      columnFilters: filters,
      expanded,
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
        searchParams={searchParams}
        page={page}
        filters={filters}
        setFilters={setFilters}
        data={data}
        setData={setData}
        refetch={refetch}
        tags={tags}
        getFilteredSelectedRowModel={getFilteredSelectedRowModel}
        toggleAllRowsSelected={toggleAllRowsSelected}
        searchableItems={searchableItems}
        setExpanded={setExpanded}
      />

      <Table
        page={page}
        searchParams={searchParams}
        meta={meta}
        getHeaderGroups={getHeaderGroups}
        getRowModel={getRowModel}
        subcolumns={subcolumns}
        empty={empty}
        loading={isLoading}
        isRefetching={isRefetching}
        isFetchingNextPage={isFetchingNextPage}
        fetchNextPage={fetchNextPage}
        isFetching={isFetching}
        totalFetched={data.length}
        totalDBRowCount={meta.total}
      />
    </div>
  );
};

export default Dashboard;
