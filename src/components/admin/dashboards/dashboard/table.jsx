"use client";
import { flexRender } from "@tanstack/react-table";
import { SortAsc, SortDesc, ArrowRightLeft, Loader } from "lucide-react";
import Loading from "@/components/loading";
import {
  Table as Datatable,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { useRef, useEffect, useCallback } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";

const Table = ({
  getHeaderGroups,
  getRowModel,
  subcolumns,
  empty,
  loading,
  fetchNextPage,
  isFetching,
  isRefetching,
  totalFetched,
  totalDBRowCount,
  isFetchingNextPage,
}) => {
  const tableContainerRef = useRef(null);

  const fetchMoreOnBottomReached = useCallback(
    (containerRefElement) => {
      if (containerRefElement) {
        const { scrollTop, scrollHeight, clientHeight } = containerRefElement;
        if (
          scrollHeight - scrollTop - clientHeight < 500 &&
          !isFetching &&
          totalFetched < totalDBRowCount
        ) {
          fetchNextPage();
        }
      }
    },
    [fetchNextPage, isFetching, totalFetched, totalDBRowCount],
  );

  useEffect(() => {
    fetchMoreOnBottomReached(tableContainerRef.current);
  }, [fetchMoreOnBottomReached]);

  const { rows } = getRowModel();

  const rowVirtualizer = useVirtualizer({
    count: rows.length,
    estimateSize: () => 60,
    getScrollElement: () => tableContainerRef.current,
    measureElement:
      typeof window !== "undefined" &&
      navigator.userAgent.indexOf("Firefox") === -1
        ? (element) => element.getBoundingClientRect().height
        : undefined,
    overscan: 5,
  });

  // clean up for deletion of rows
  useEffect(() => {
    rowVirtualizer.measure();
  }, [rows.length]);

  const virtualItems = rowVirtualizer.getVirtualItems();

  return (
    <>
      <div className="bg-white">
        <Datatable
          className="relative grid max-h-[75vh] overflow-y-scroll bg-white"
          ref={tableContainerRef}
          onScroll={(e) => {
            fetchMoreOnBottomReached(e.currentTarget);
          }}
        >
          <TableHeader className="sticky top-0 z-10 grid rounded-t bg-hackathon-primary text-white">
            {getHeaderGroups().map(({ headers, id }) => (
              <TableRow key={id} className="flex w-full justify-between">
                {headers.map(({ id, column, getContext, getSize }) => (
                  <TableHead
                    key={id}
                    className="flex"
                    style={{ width: getSize() }}
                  >
                    <div className="flex items-center text-white">
                      {flexRender(column.columnDef.header, getContext())}
                      {column.getCanSort() && (
                        <ArrowRightLeft
                          className={`mx-2 w-4 rotate-90 text-hackathon-gray-200 hover:cursor-pointer hover:opacity-50 ${
                            column.getIsSorted() && "hidden"
                          }`}
                          onClick={column.getToggleSortingHandler()}
                        />
                      )}
                      {column.getIsSorted() === "asc" && (
                        <SortDesc
                          onClick={column.getToggleSortingHandler()}
                          className="mx-2 w-4 text-white hover:cursor-pointer hover:opacity-50"
                        />
                      )}
                      {column.getIsSorted() === "desc" && (
                        <SortAsc
                          onClick={column.getToggleSortingHandler()}
                          className="mx-2 w-4 text-white hover:cursor-pointer hover:opacity-50"
                        />
                      )}
                    </div>
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody
            className="relative grid min-h-[70vh]"
            style={{
              height:
                loading || isRefetching || rows.length === 0
                  ? "100%"
                  : `${rowVirtualizer.getTotalSize()}px`,
            }}
          >
            {loading || isRefetching ? (
              <TableRow className="absolute inset-0 flex items-center justify-center">
                <TableCell className="flex items-center justify-center py-4 text-center">
                  <Loading />
                </TableCell>
              </TableRow>
            ) : (
              <>
                {rows.length === 0 && (
                  <TableRow className="w-full bg-white text-center">
                    <TableCell
                      className="items-center justify-center"
                      colSpan={12}
                    >
                      {empty}
                    </TableCell>
                  </TableRow>
                )}

                <div
                  className="absolute top-0 w-full"
                  style={{
                    transform: `translateY(${virtualItems[0]?.start ?? 0}px)`,
                  }}
                >
                  {virtualItems.map((virtualRow) => {
                    const {
                      id,
                      getVisibleCells,
                      getIsSelected,
                      original,
                      getIsExpanded,
                      getAllCells,
                    } = rows[virtualRow.index];

                    return (
                      <>
                        <TableRow
                          key={id}
                          data-index={virtualRow.index}
                          className={`${getIsSelected() && "bg-hackathon-green-100"} flex justify-between`}
                          ref={(node) => rowVirtualizer.measureElement(node)}
                        >
                          {getVisibleCells().map(
                            ({ id, column, getContext }) => (
                              <TableCell
                                key={id}
                                className="overflow-hidden whitespace-normal break-words"
                                style={{
                                  width: column.getSize(),
                                }}
                              >
                                {flexRender(
                                  column.columnDef.cell,
                                  getContext(),
                                )}
                              </TableCell>
                            ),
                          )}
                        </TableRow>
                        {getIsExpanded() && (
                          <div className="flex w-full flex-col">
                            <TableRow className="flex w-full justify-between bg-hackathon-gray-100 text-xs">
                              {subcolumns?.map(({ header }, index) =>
                                index === 0 ? (
                                  <TableCell
                                    key={index}
                                    colSpan={getAllCells().length}
                                    className="w-[20px] bg-hackathon-gray-100 text-xs"
                                  >
                                    {header}
                                  </TableCell>
                                ) : (
                                  <TableCell
                                    key={index}
                                    colSpan={getAllCells().length}
                                    className="w-[150px] bg-hackathon-gray-100 text-xs"
                                  >
                                    {header}
                                  </TableCell>
                                ),
                              )}
                            </TableRow>
                            <TableRow className="flex w-full justify-between">
                              {subcolumns?.map(({ accessorKey }, index) =>
                                index === 0 ? (
                                  <TableCell
                                    key={index}
                                    colSpan={getAllCells().length}
                                    className="w-[20px] text-xs"
                                  >
                                    {original[accessorKey]}
                                  </TableCell>
                                ) : (
                                  <TableCell
                                    key={index}
                                    colSpan={getAllCells().length}
                                    className="w-[150px] text-xs"
                                  >
                                    {original[accessorKey]}
                                  </TableCell>
                                ),
                              )}
                            </TableRow>
                          </div>
                        )}
                      </>
                    );
                  })}
                </div>
              </>
            )}
          </TableBody>
        </Datatable>
      </div>
      <div className="flex w-full items-center justify-end rounded-b bg-white p-4 text-lg">
        {isFetchingNextPage && (
          <Loader size={20} className="animate-spin text-hackathon-blue-100" />
        )}
        <div className="mx-2">{getRowModel().rows.length} row(s)</div>
      </div>
    </>
  );
};

export default Table;
