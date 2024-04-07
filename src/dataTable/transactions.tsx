// Import necessary modules and interfaces
import { DataTableColumnHeader } from "@/components/table/DataTableColumnHeader";
import { DataFilterProps } from "@/interfaces/tables";
import { ITransaction } from "@/store/transactionSlice/types";
import { formatCurrency, formatDate } from "@/utils";
import { ColumnDef } from "@tanstack/react-table";
import { capitalize } from "lodash";
import { AlertTriangle, Banknote, WrapText } from "lucide-react";

const statusesOptions = ["pending", "success", "failed"].map((status) => ({
  label: capitalize(status),
  value: status,
}));
const currencyOptions = ["NGN", "GHS", "ZAR", "USD"].map((currency) => ({
  label: currency,
  value: currency,
}));
export const filters: DataFilterProps[] = [
  {
    column: "status",
    options: statusesOptions,
    title: "Status",
    extra: {
      mainIcon: AlertTriangle,
    },
  },
  {
    column: "channel",
    options: [
      {
        label: "Credit card",
        value: "card",
      },
      {
        label: "Mobile money",
        value: "mobile_money",
      },
    ],
    title: "Channel",
    extra: {
      mainIcon: WrapText,
    },
  },
  {
    column: "currency",
    options: currencyOptions,
    title: "Currency",
    extra: {
      mainIcon: Banknote,
    },
  },
  {
    column: "amount",
    options: [],
    isNumber: true,
    title: "Amount",
    extra: {
      mainIcon: Banknote,
    },
  },
];
const formatStatus = (stat: string) => {
  if (!stat) return "";
  const status: Record<string, string> = {
    failed: "bg-red-50 text-red-500",
    success: "bg-green-50 text-green-600",
    pending: "bg-yellow-50 text-yellow-500",
  };
  return (
    <span
      className={`${status[stat]} py-1 px-2.5 text-sm rounded text-gray-800 font-medium`}
    >
      {capitalize(stat)}
    </span>
  );
};

export const transactionColumn: ColumnDef<ITransaction>[] = [
  {
    accessorKey: "amount",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Amount" />
    ),
    cell: ({ row }) => (
      <div className="flex space-x-2">
        {formatCurrency(row.getValue("amount"))}
      </div>
    ),
  },

  {
    accessorKey: "currency",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Currency" />
    ),
    cell: ({ row }) => (
      <div className="flex space-x-2">{row.getValue("currency") || "N/A"}</div>
    ),
  },
  {
    accessorKey: "channel",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Channel" />
    ),
    cell: ({ row }) => {
      const channel: string = row.getValue("channel");
      return (
        <div className="flex space-x-2">
          {channel ? capitalize(channel.split("_").join(" ")) : "N/A"}
        </div>
      );
    },
  },
  {
    accessorKey: "reference",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Reference" />
    ),
    cell: ({ row }) => (
      <div className="flex space-x-2">{row.getValue("reference")}</div>
    ),
  },

  {
    accessorKey: "fees",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Fees" />
    ),
    cell: ({ row }) => (
      <div className="flex space-x-2">
        {formatCurrency(row.getValue("fees")) || "N/A"}
      </div>
    ),
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const status: string = row.getValue("status");
      return (
        <div className="flex space-x-2">{formatStatus(status) || "N/A"}</div>
      );
    },
  },
  {
    accessorKey: "created_at",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Created At" />
    ),
    cell: ({ row }) => (
      <div className="flex space-x-2">
        {formatDate(row.getValue("created_at"), "MMM dd yyyy HH:mm:ss")}
      </div>
    ),
  },
];
