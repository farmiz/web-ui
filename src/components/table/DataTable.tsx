import { useEffect, useMemo, useRef, useState } from "react";
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
import { useNavigate, useLocation } from "react-router-dom";
import NoDataImg from "/no-data.svg";
import { useAppDispatch, useAppSelector } from "@/hooks/useStoreActions";
import { cleanObject, objectToQueryString } from "@/utils";
import { addColumn } from "@/store/tableSlice";
import { DataTableRowActions } from "./DataTableRowActions";
export function DataTable<TData, TValue>({
  columns,
  showExportButton = false,
  filters,
  fetchQuery,
  actionButtons,
}: DataTableProps<TData, TValue>) {
  const [loading, setLoading] = useState<boolean>(false);
  const [rowSelection, setRowSelection] = useState({});
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [data, setData] = useState<TData[]>([]);
  const [paginator, setPaginator] = useState<Paginator>();
  const navigate = useNavigate();
  const tableStore = useAppSelector("table");
  const dispatchTable = useAppDispatch();
  const [tableColumn, setTableColumn] = useState(columns);
  const initialized = useRef(false);

  const search = useLocation().search;

  const columnsForDefaultValues =
    columns && columns.length
      ? columns
          .map((column) => {
            if ("accessorKey" in column) {
              return column.accessorKey;
            }
            return;
          })
          .filter((columnName: any) => columnName)
      : [];

  // /items?search=apple&searchSelection=name,description&sort=-price,rating&limit=20&currentPage=3&columns=name,price,description
  if (!tableStore.columns.length) {
    dispatchTable(addColumn(columnsForDefaultValues as any));
  }

  useEffect(() => {
    navigate({
      search: `?${objectToQueryString(tableStore)}`,
    });
  }, [tableStore]);

  const newQuery = cleanObject(tableStore);

  const memoizedFetchQuery = useMemo(() => {
    return async () => {
      try {
        setLoading(true);
        const { payload } = await dispatchTable(fetchQuery(newQuery));

        setData(payload.response.data);
        setPaginator(payload.response.paginator);
      } catch (error) {
        throw error;
      } finally {
        setLoading(false);
      }
    };
  }, [newQuery]);

  useEffect(() => {
    if (fetchQuery && initialized.current) {
      memoizedFetchQuery();
    }
  }, [search, fetchQuery]);

  useEffect(() => {
    if (!initialized.current) {
      if (actionButtons && actionButtons.length) {
        setTableColumn((prevCols) => [
          ...prevCols,
          {
            id: "actions",
            cell: ({ row }) => (
              <DataTableRowActions actionButtons={actionButtons} row={row} />
            ),
          },
        ]);
      }
      initialized.current = true;
    }
  }, []);
  const table = useReactTable({
    data,
    columns: tableColumn,
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
    initialState: { pagination: { pageSize: tableStore.limit || 30 } },
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
      <div className="rounded border border-md mt-5">
        <Table>
          <TableHeader className="bg-gray-100 w-full">
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
            {loading ? (
              <TableRow>
                <TableCell colSpan={columns.length}>
                  <div className="flex justify-center items-center h-full flex-col gap-4">
                    <div className="loader h-7 w-8 border-4 rounded-full border-x-[#000] border-y-transparent spin-in-6 animate-spin duration-500"></div>
                    <h3>Fetch Data...</h3>
                  </div>
                </TableCell>
              </TableRow>
            ) : table.getRowModel().rows?.length ? (
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
      {!loading && <DataTablePagination table={table} paginator={paginator} />}
    </div>
  );
}

export default DataTable;
