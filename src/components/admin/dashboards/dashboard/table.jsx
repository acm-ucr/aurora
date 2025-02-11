import { flexRender } from "@tanstack/react-table";
import {
  ChevronLeft,
  ChevronRight,
  SortAsc,
  SortDesc,
  ArrowRightLeft,
} from "lucide-react";
import Loading from "@/components/loading";
import Link from "next/link";
import {
  Table as Datatable,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const Table = ({
  getHeaderGroups,
  getRowModel,
  subcolumns,
  empty,
  loading,
  meta,
  searchParams,
  page,
}) => {
  const index = parseInt(searchParams.index ?? 1);
  const size = parseInt(searchParams.size ?? 10);

  const { first, last, total } = meta;

  return (
    <>
      <div className="flex h-[75vh] flex-col justify-between overflow-y-scroll bg-white">
        <Datatable>
          <TableHeader className="rounded-t bg-hackathon-blue-200 text-white">
            {getHeaderGroups().map(({ headers, id }) => (
              <TableRow key={id}>
                {headers.map(({ id, column, getContext }) => (
                  <TableHead key={id} data-cy="header">
                    <div className="flex items-center text-white">
                      {flexRender(column.columnDef.header, getContext())}
                      {column.getCanSort() && (
                        <ArrowRightLeft
                          className={`mx-2 w-4 rotate-90 text-hackathon-gray-200 hover:cursor-pointer hover:opacity-50 ${
                            column.getIsSorted() && "hidden"
                          }`}
                          data-cy={`${column.id}-sorting`}
                          onClick={column.getToggleSortingHandler()}
                        />
                      )}
                      {column.getIsSorted() === "asc" && (
                        <SortDesc
                          onClick={column.getToggleSortingHandler()}
                          data-cy={`${column.id}-sorting-desc`}
                          className="mx-2 w-4 text-white hover:cursor-pointer hover:opacity-50"
                        />
                      )}
                      {column.getIsSorted() === "desc" && (
                        <SortAsc
                          onClick={column.getToggleSortingHandler()}
                          data-cy={`${column.columnDef.header}-sorting-asc`}
                          className="mx-2 w-4 text-white hover:cursor-pointer hover:opacity-50"
                        />
                      )}
                    </div>
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={100} className="py-4 text-center">
                  <Loading />
                </TableCell>
              </TableRow>
            ) : (
              <>
                {getRowModel().rows.length === 0 && (
                  <TableRow className="w-full bg-white py-8 text-center">
                    <TableCell
                      className="h-[70vh] items-center justify-center"
                      colSpan={12}
                    >
                      {empty}
                    </TableCell>
                  </TableRow>
                )}
                {getRowModel().rows.map(
                  ({ id, getVisibleCells, getIsSelected, original }) => (
                    <>
                      <TableRow
                        key={id}
                        className={`${getIsSelected() && "bg-hackathon-green-100"}`}
                      >
                        {getVisibleCells().map(({ id, column, getContext }) => (
                          <TableCell key={id}>
                            {flexRender(column.columnDef.cell, getContext())}
                          </TableCell>
                        ))}
                      </TableRow>

                      {getIsSelected() && (
                        <>
                          <TableRow>
                            {subcolumns?.map(({ header }, index) => (
                              <TableHead
                                key={index}
                                className="bg-hackathon-gray-100 text-xs"
                              >
                                {header}
                              </TableHead>
                            ))}
                          </TableRow>
                          <TableRow>
                            {subcolumns?.map(({ accessorKey }, index) => (
                              <TableCell key={index} className="text-xs">
                                {original[accessorKey]}
                              </TableCell>
                            ))}
                          </TableRow>
                        </>
                      )}
                    </>
                  ),
                )}
              </>
            )}
          </TableBody>
        </Datatable>
      </div>
      <div className="flex w-full items-center justify-end rounded-b bg-white p-4 text-lg">
        <div className="mx-2">{getRowModel().rows.length} row(s)</div>
        <Link
          href={`/admin/${page}?direction=prev&index=${
            index - 1
          }&size=${size}&first=${first}&last=${last}`}
          className={`mx-2 ${
            index <= 1 && "pointer-events-none text-hackathon-gray-200"
          }`}
        >
          <ChevronLeft />
        </Link>
        <div>
          Page {index} of {Math.ceil(total / size)}
        </div>
        <Link
          href={`/admin/${page}?direction=next&index=${
            index + 1
          }&size=${size}&first=${first}&last=${last}`}
          className={`mx-2 ${
            index >= Math.ceil(total / size) &&
            "pointer-events-none text-hackathon-gray-200"
          }`}
        >
          <ChevronRight />
        </Link>
      </div>
    </>
  );
};

export default Table;
