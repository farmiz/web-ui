import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
} from "lucide-react";
import { Table } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import PaginationNumbers from "./PaginationNumbers";
import { Paginator } from "@/interfaces/tables";
import { useAppDispatch, useAppSelector } from "@/hooks/useStoreActions";
import { addCurrentPage, addItemPerPage } from "@/store/tableSlice";

interface DataTablePaginationProps<TData> {
  table: Table<TData>;
  paginator?: Paginator;
}
export function DataTablePagination<TData>({
  table,
  paginator,
}: DataTablePaginationProps<TData>) {
  const tableStore = useAppSelector("table");
  const dispatchTable = useAppDispatch();

  const handleGoToNextOrPreviousPage = (pageNumber: number) => {
    if (pageNumber) {
      dispatchTable(addCurrentPage(pageNumber));
    }
  };
  return (
    <>
      {paginator && (
        <div className="flex items-center justify-between px-2 overflow-x-scroll">
          <div className="flex-1 text-sm text-muted-foreground">
            {tableStore.currentPage} of
            {table.getFilteredRowModel().rows.length} row(s) selected.
          </div>
          <div className="flex items-center space-x-6 lg:space-x-8">
            <div className="flex items-center space-x-2">
              <p className="text-sm font-medium">Rows per page</p>
              <Select
                value={String(tableStore.limit)}
                onValueChange={(value) => {
                  dispatchTable(addItemPerPage(Number(value)));
                }}
              >
                <SelectTrigger className="h-8 w-[70px]">
                  <SelectValue placeholder={paginator?.perPage} />
                </SelectTrigger>
                <SelectContent side="top">
                  {[30, 50, 100, 150].map((pageSize) => (
                    <SelectItem key={pageSize} value={`${pageSize}`}>
                      {pageSize}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex w-[100px] items-center justify-center text-sm font-medium">
              Page <span className="mx-1">{paginator?.page}</span> of
              <span className="mx-1">{Number(paginator?.totalPages)}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                className="h-8 w-8 p-0 flex"
                onClick={() => handleGoToNextOrPreviousPage(1)}
                disabled={paginator?.page === 1}
              >
                <span className="sr-only">Go to first page</span>
                <ArrowLeftIcon className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                className="h-8 w-8 p-0"
                onClick={() =>
                  handleGoToNextOrPreviousPage(paginator?.page! - 1)
                }
                disabled={paginator?.page === 1}
              >
                <span className="sr-only">Go to previous page</span>
                <ChevronLeftIcon className="h-4 w-4" />
              </Button>
              <PaginationNumbers
                itemsPerPage={paginator?.perPage!}
                totalDocument={paginator?.totalDocuments as number}
              />
              <Button
                variant="outline"
                className="h-8 w-8 p-0"
                onClick={() =>
                  handleGoToNextOrPreviousPage(paginator?.page! + 1)
                }
                disabled={
                  paginator?.page === Number(paginator?.totalPages! - 1)
                }
              >
                <span className="sr-only">Go to next page</span>
                <ChevronRightIcon className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                className="h-8 w-8 p-0 flex"
                onClick={() =>
                  handleGoToNextOrPreviousPage(paginator?.totalPages! - 1)
                }
                disabled={paginator?.totalPages! - 1 === paginator?.page!}
              >
                <span className="sr-only">Go to last page</span>
                <ArrowRightIcon className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
