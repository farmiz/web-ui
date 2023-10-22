import { ArrowDownIcon, ArrowUpIcon, ChevronsUpDown, Eye } from "lucide-react";
import { Column } from "@tanstack/react-table";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import { SortType } from "@/interfaces/tables";
import { useSearchParams } from "react-router-dom";

interface DataTableColumnHeaderProps<TData, TValue>
  extends React.HTMLAttributes<HTMLDivElement> {
  column: Column<TData, TValue>;
  title: string;
}

type SortTypeProps = {
  name: string;
  value: SortType;
};

export function DataTableColumnHeader<TData, TValue>({
  column,
  title,
  className,
}: DataTableColumnHeaderProps<TData, TValue>) {
  if (!column.getCanSort()) {
    return <div className={cn(className)}>{title}</div>;
  }
  const [sortedType, setSortedType] = useState<SortTypeProps | undefined>(
    undefined
  );
  const [searchParams, setSearchParams] = useSearchParams();
  const handleItemColumnSorted = (
    selectedColumn: string,
    sortType: SortType
  ) => {
    const newMapper = { name: selectedColumn, value: sortType };
    setSortedType(newMapper);

    for (const entry of searchParams.entries()) {
      const [param, value] = entry;
      console.info({param, value })
      if (!param) {
        setSearchParams({
          sort:
            sortType === "asc" ? selectedColumn : `-${selectedColumn}`,
        });
      }
    }
  };

  return (
    <>
      {/* <div>{count}</div>     */}
      <div className={cn("flex items-center space-x-2", className)}>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="-ml-3 h-8 data-[state=open]:bg-accent"
            >
              <span>{title}</span>
              {sortedType?.value === "desc" ? (
                <ArrowDownIcon className="ml-2 h-4 w-4" />
              ) : sortedType?.value === "asc" ? (
                <ArrowUpIcon className="ml-2 h-4 w-4" />
              ) : (
                <ChevronsUpDown className="ml-2 h-4 w-4" />
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            <DropdownMenuItem
              onClick={() => handleItemColumnSorted(column.id, "asc")}
            >
              <ArrowUpIcon className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
              Asc
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => handleItemColumnSorted(column.id, "desc")}
            >
              <ArrowDownIcon className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
              Desc
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => column.toggleVisibility(false)}>
              <Eye className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
              Hide
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </>
  );
}
