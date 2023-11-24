import { useEffect,  useRef, useState } from "react";
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
import { DataTableProps } from "@/interfaces/tables";
import TableBodyItem from "./TableBodyItem";
import NoDataImg from "/no-data.svg";
import { useAppDispatch } from "@/hooks/useStoreActions";
import { DataTableRowActions } from "./DataTableRowActions";
import { useQueryParams } from "@/hooks/useSetQueryParam";
import { Checkbox } from "@radix-ui/react-checkbox";
export function DataTable<TData, TValue>({
  columns,
  showExportButton = false,
  filters,
  fetchQuery,
  actionButtons,
  allowRowSelect,
  data,
  paginator,
  showSearchSelection = false,
  searchSelectionOptions
}: DataTableProps<TData, TValue>) {
  const [loading, setLoading] = useState<boolean>(false);
  const [rowSelection, setRowSelection] = useState({});
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = useState<SortingState>([]);
  const dispatchTable = useAppDispatch();
  const [tableColumn, setTableColumn] = useState(columns);
  const initialized = useRef(false);

  const { getQueryParam, setQueryParam, queryObject } = useQueryParams();

  const [queryColumn] = useState(getQueryParam("columns") || "");

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

  useEffect(() => {
    if (!queryColumn) {
      setQueryParam("columns", columnsForDefaultValues.join(","));
    }
  }, []);

  // FETCH REQUEST
  const fetchData = async () => {
    try {
      setLoading(true);
      await dispatchTable(fetchQuery(queryObject));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (fetchQuery && Object.keys(queryObject).length) {
      fetchData();
    }
  }, [queryObject]);

  // ADD TABLE MENU
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

      if (allowRowSelect) {
        
        setTableColumn((prevCols) => [
          {
            id: "select",
            header: ({ table }) => (
              <Checkbox
                checked={table.getIsAllPageRowsSelected()}
                onCheckedChange={(value) =>
                  table.toggleAllPageRowsSelected(!!value)
                }
                aria-label="Select all"
                className="translate-y-[2px]"
              />
            ),
            cell: ({ row }) => (
              <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
                className="translate-y-[2px]"
              />
            ),
            enableSorting: false,
            enableHiding: false,
          },
          ...prevCols,
        ]);
      }
      initialized.current = true;
    }
  }, []);

  // REACT TABLE STUFF
  const table = useReactTable({
    data: data,
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
    initialState: { pagination: { pageSize: paginator?.perPage || 30 } },
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
        searchSelectionOptions={searchSelectionOptions}
        showSearchSelection={showSearchSelection}
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
      {!loading && data.length > 0&& <DataTablePagination table={table} paginator={paginator} />}
    </div>
  );
}

export default DataTable;
