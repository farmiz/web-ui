// Import necessary modules and interfaces
import { DataTableColumnHeader } from "@/components/table/DataTableColumnHeader";
import { TagsProps } from "@/store/tagsSlice/types";
import { formatCurrency, formatDate } from "@/utils";
import { ColumnDef } from "@tanstack/react-table";
import { capitalize } from "lodash";

export const tagsColumn: ColumnDef<TagsProps>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    cell: ({ row }) => (
      <div className="flex space-x-2">
        {formatCurrency(row.getValue("name"))}
      </div>
    ),
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Created At" />
    ),
    cell: ({ row }) => (
      <div className="flex space-x-2">
        {formatDate(row.getValue("createdAt"), "MMM dd yyyy HH:mm:ss")}
      </div>
    ),
  },
];
