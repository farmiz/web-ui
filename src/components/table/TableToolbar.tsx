import { X } from "lucide-react";
import { Table } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DataTableViewOptions } from "@/components/table/DataTableViewOptions";

import { DataTableFacetedFilter } from "./TableFacetedFilter";
import { DataFilterProps } from "@/interfaces/tables";
import DataFacetedFilterForNumbers from "./DataFacetedFilterForNumbers";
import { useCallback, useState } from "react";
import { useAppDispatch } from "@/hooks/useStoreActions";
import { addQuery } from "@/store/tableSlice";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  showExportButton?: boolean;
  filters?: DataFilterProps[];
}

export function DataTableToolbar<TData>({
  table,
  showExportButton = false,
  filters,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;
  const [value, setValue] = useState<string>("");
  const tableDispatch = useAppDispatch();
  const handleOnChange = useCallback(
    (event: any) => {
      setValue(event.target.value);
      tableDispatch(addQuery(event.target.value));
      console.log(event.target.value)
    },
    [value]
  );
  return (
    <>
      <div className="flex items-center justify-between mb-5">
        <div className="flex flex-1 items-center space-x-2">
          <Input
            placeholder="Filter tasks..."
            value={value ?? ""}
            onChange={handleOnChange}
            className="h-8 w-[150px] lg:w-[250px]"
          />
        </div>
        <DataTableViewOptions
          table={table}
          showExportButton={showExportButton}
        />
      </div>
      <div className="flex items-center">
        <div className="filters flex gap-2 overflow-x-scroll">
          {filters &&
            filters.length &&
            filters.map((filter) => {
              return !filter.isNumber
                ? table.getColumn(filter.column) && (
                    <DataTableFacetedFilter
                      column={table.getColumn(filter.column)}
                      title={filter.title}
                      options={filter.options}
                      extra={filter.extra}
                      key={Math.ceil(Math.random() * 1000000000)}
                    />
                  )
                : table.getColumn(filter.column) && (
                    <DataFacetedFilterForNumbers
                      key={Math.ceil(Math.random() * 1000000000)}
                      filter={filter}
                    />
                  );
            })}
        </div>
        <div className="reset">
          {isFiltered && (
            <Button
              variant="ghost"
              onClick={() => table.resetColumnFilters()}
              className="h-8 px-2 lg:px-3"
            >
              Reset
              <X className="ml-2 h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    </>
  );
}
