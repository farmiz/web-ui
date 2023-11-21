import { DataTableColumnHeader } from "@/components/table/DataTableColumnHeader";
import { DataFilterProps } from "@/interfaces/tables";
import { DiscoveryProps } from "@/store/discoverySlice/types";
import { formatCurrency, formatDate } from "@/utils";
import { Checkbox } from "@radix-ui/react-checkbox";
import { ColumnDef } from "@tanstack/react-table";
import { capitalize } from "lodash";

const formatRiskLevel = (level: "high" | "moderate" | "low") => {
  const levelsWithStyle: { [K in typeof level]: string } = {
    high: "bg-red-50 text-red-500",
    low: "bg-green-50 text-green-600",
    moderate: "bg-orange-50 text-orange-500",
  };
  return <span className={`${levelsWithStyle[level]} py-1 px-2.5 text-sm rounded text-gray-800 font-medium`}>{capitalize(level)}</span>;
};

export const filters: DataFilterProps[] = [];

export const columns: ColumnDef<DiscoveryProps>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
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
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    cell: ({ row }) => (
      <div className="flex space-x-2">{row.getValue("name")}</div>
    ),
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "amount",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Amount" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          {formatCurrency(row.getValue("amount"))}
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "tags",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Tags" />
    ),
    cell: ({ row }) => {
      const tags: string[] = row.getValue("tags");
      const formattedString = tags.join(", ");
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {formattedString}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "riskLevel",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Risk Level" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {formatRiskLevel(row.getValue("riskLevel"))}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "startDate",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Start Date" />
    ),
    cell: ({ row }) => {
      const date: string = row.getValue("startDate");
      return (
        <div className="flex w-[100px] items-center">{formatDate(date)}</div>
      );
    },
  },
  {
    accessorKey: "endDate",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="End Date" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex w-[100px] items-center">
          {formatDate(row.getValue("endDate"))}
        </div>
      );
    },
  }
];
