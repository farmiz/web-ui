import { useEffect, useMemo, useState } from "react";
import { DataTableToolbar } from "./TableToolbar";
import {
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { DataTablePagination } from "./DataTablePagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { DataTableProps, Paginator } from "@/interfaces/tables";
import TableBodyItem from "./TableBodyItem";
import { useLocation, useNavigate } from "react-router-dom";
import NoDataImg from "/no-data.svg";
export function DataTable<TData, TValue>({
  columns,
  showExportButton = false,
  filters,
  fetchQuery,
}: DataTableProps<TData, TValue>) {
  const [rowSelection, setRowSelection] = useState({});
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [data, setData] = useState<TData[]>([]);
  const [paginator, setPaginator] = useState<Paginator>();
  // { id: "actions", cell: ({}) => <DataTableRowActions /> }
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  // Create an object to store all query parameters
  const queryParameters: Record<string, any> = {};
  // /items?search=apple&searchSelection=name,description&sort=-price,rating&limit=20&currentPage=3&columns=name,price,description
  const defaultQuery = {
    limit: "50",
    currentPage: "1",
    columns: "firstName,lastName,email",
  };
  for (const [key, value] of queryParams.entries()) {
    queryParameters[key] = value;
  }

  const navigation = useNavigate();
  const memoizedFetchQuery = useMemo(() => {
    return async () => {
      try {
        const params = new URLSearchParams(defaultQuery).toString();
        navigation(`?${params}`);
        const result = await fetchQuery(defaultQuery);
        console.log(result);
        setData(result.data.response.data);
        setPaginator(result.data.response.paginator);
      } catch (error) {
        throw error;
      }
    };
  }, [queryParameters]);

  useEffect(() => {
    memoizedFetchQuery();

    return () => {};
  }, []);

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
    },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  });

  return (
    <div className="space-y-4">
      <DataTableToolbar
        table={table}
        showExportButton={showExportButton}
        filters={filters}
      />
      <div className="rounded border border-md mt-5 min-h-[440px]">
        <Table>
          <TableHeader className="bg-gray-100">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table
                .getRowModel()
                .rows.map((row) => <TableBodyItem row={row} key={row.id} />)
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  <div className="p-10 flex items-center justify-center flex-col gap-4">
                    <img src={NoDataImg} alt="" style={{ width: "20%" }} />
                    <p className="text-lg">No results.</p>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <DataTablePagination table={table} paginator={paginator} />
    </div>
  );
}

export default DataTable;
