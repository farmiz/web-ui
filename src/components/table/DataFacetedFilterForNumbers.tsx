import React, { ChangeEvent, useCallback, useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { CheckIcon, ChevronsUpDownIcon, CornerDownRight } from "lucide-react";
import { Command, CommandGroup, CommandItem } from "../ui/command";
import { cn } from "@/lib/utils";
import IsBetweenFilter from "./IsBetweenFilter";
import { Input } from "../ui/input";
import { DataFilterProps } from "@/interfaces/tables";
import { useQueryParams } from "@/hooks/useSetQueryParam";

interface DataFacetedFilterForNumbersProps {
  filter: DataFilterProps;
}
type FilterGroupValues = "isBetween" | "isGreater" | "isEql" | "isLess";
const filterGroups: { label: string; value: FilterGroupValues }[] = [
  {
    label: "is between",
    value: "isBetween",
  },
  {
    label: "is greater than",
    value: "isGreater",
  },
  {
    label: "is equal to",
    value: "isEql",
  },
  {
    label: "is less than",
    value: "isLess",
  },
];
const DataFacetedFilterForNumbers: React.FC<
  DataFacetedFilterForNumbersProps
> = ({ filter }) => {
  const [open, setOpen] = useState(false);
  const [parentOpen, setParentOpen] = useState(false);
  const [value, setValue] = useState<FilterGroupValues | null>(null);
  const [label, setLabel] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [facetData, setFacetData] = useState<Record<string, any> | null>(null);

  const { removeQueryParam, setQueryParam } = useQueryParams();

  const handleItemSelect = useCallback(
    (data: string) => {
      setLabel(data);
      setOpen((open) => !open);
      const labelValue = filterGroups.find((group) => group.label === data);
      if (labelValue) {
        setValue(labelValue?.value);
      }
    },
    [label]
  );
  const handleInputChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setInputValue(event.target.value);
    },
    []
  );
  const formatFilterDisplay = (value: FilterGroupValues) => {
    if (!value) return "";
    const mapper = {
      isEql: "=",
      isLess: "<",
      isGreater: ">",
      isBetween: ">=",
    };
    return mapper[value];
  };

  const getQueryKeyMapper = (key: FilterGroupValues) => {
    const queryKeyMapper = {
      isEql: "eq",
      isLess: "lt",
      isGreater: "gt",
      isBetween: "gte",
    };
    return queryKeyMapper[key];
  };
  const closeFilter = () => {
    setParentOpen(false);
    let symbol = "";
    if (value) {
      symbol = formatFilterDisplay(value);
    }
    const displayString = `${symbol} ${inputValue}`;
    setFacetData({ displayString });

    if (value && inputValue) {
      const queryKey = getQueryKeyMapper(value);
      setQueryParam(`${filter.column}_${queryKey}`, inputValue);
    }
  };

  const resetFilter = () => {
    if (value) {
      const queryKey = getQueryKeyMapper(value);
      removeQueryParam(`${filter.column}_${queryKey}`);
    }
    setValue(null);
    setInputValue("");
    setLabel("");
    setFacetData(null);
  };

  return (
    <Popover open={parentOpen} onOpenChange={setParentOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="h-8 border-dashed">
          {filter && filter.extra && filter.extra.mainIcon && (
            <filter.extra.mainIcon className="mr-2 h-4 w-4" />
          )}
          {filter.title} {facetData && facetData.displayString}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="grid gap-4">
          <div className=" flex items-center gap-5">
            <p className="text-sm text-muted-foreground">Set filter</p>
            <h4 className="font-medium leading-none">{filter.title} Filter</h4>
          </div>
          <div className="mt-1">
            <div className="flex items-center justify-end mb-[0.3rem] cursor-pointer text-primary/90">
              <span className="text-black text-sm" onClick={resetFilter}>
                Clear filter
              </span>
            </div>
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={open}
                  className="w-full justify-between"
                >
                  {label || "Select filter"}
                  <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[200px] p-0">
                <Command>
                  <CommandGroup>
                    {filterGroups &&
                      filterGroups.length &&
                      filterGroups.map((framework) => (
                        <CommandItem
                          key={framework.value}
                          onSelect={handleItemSelect}
                          className="cursor-pointer"
                        >
                          {framework.label}
                          <CheckIcon
                            className={cn(
                              "ml-auto h-4 w-4",
                              label === framework.value
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                          />
                        </CommandItem>
                      ))}
                  </CommandGroup>
                </Command>
              </PopoverContent>
            </Popover>

            {value && (
              <div className="mt-3">
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-2">
                    <CornerDownRight size={22} />
                    {value === "isBetween" ? (
                      <IsBetweenFilter />
                    ) : (
                      <Input
                        className="h-10"
                        value={inputValue}
                        onChange={handleInputChange}
                        type="number"
                      />
                    )}
                  </div>
                  <Button onClick={closeFilter}>Apply filter criteria</Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default DataFacetedFilterForNumbers;
