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
import { useQueryParams } from "@/hooks/useSetQueryParam";

interface DataTablePaginationProps<TData> {
  table: Table<TData>;
  paginator?: Paginator;
}
export function DataTablePagination<TData>({
  table,
  paginator,
}: DataTablePaginationProps<TData>) {
  const { setQueryParam, getQueryParam } = useQueryParams();

  const handleGoToNextOrPreviousPage = (pageNumber: number) => {
    if (pageNumber) {
      setQueryParam("currentPage", String(pageNumber));
    }
  };
  const totalPageToView = Math.ceil(
    (paginator?.totalDocuments || 0) / (paginator?.perPage || 0)
  );
  return (
    <>
      {paginator && paginator.totalDocuments > 0 && (
        <div className="flex items-center justify-between px-2 overflow-x-scroll">
          <div className="flex-1 text-sm text-muted-foreground">
            {paginator.page} of
            {table.getFilteredRowModel().rows.length} row(s) selected.
          </div>
          <div className="flex items-center space-x-6 lg:space-x-8">
            {
              <div className="flex items-center space-x-2">
                <p className="text-sm font-medium">Rows per page</p>
                <Select
                  value={String(getQueryParam("limit") || 30)}
                  onValueChange={(value) => {
                    setQueryParam("limit", String(value));
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
            }
            <div className="flex w-[100px] items-center justify-center text-sm font-medium">
              Page <span className="mx-1">{totalPageToView}</span> of
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
                  paginator.totalPages === 1 ||
                  paginator?.page === totalPageToView
                }
              >
                <span className="sr-only">Go to next page</span>
                <ChevronRightIcon className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                className="h-8 w-8 p-0 flex"
                onClick={() =>
                  handleGoToNextOrPreviousPage(paginator?.totalPages)
                }
                disabled={
                  paginator.totalPages === 1 ||
                  paginator?.page === totalPageToView
                }
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
