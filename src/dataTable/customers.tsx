import { DataFilterProps } from "@/interfaces/tables";
import { Settings2, Users } from "lucide-react";

import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/components/table/DataTableColumnHeader";
import { UserProps } from "@/store/userSlice/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  genderOptions,
  statusOptions,
} from "@/formValidations/users";
import { getTimeAgo } from "@/utils";

export const filters: DataFilterProps[] = [
  {
    column: "gender",
    options: genderOptions,
    title: "Gender",
    extra: {
      mainIcon: Users,
    },
  },
  {
    column: "status",
    options: statusOptions,
    title: "Status",
    extra: {
      mainIcon: Settings2,
    },
  },
];

const generateStatusSignal = (status: string) => {
  const statusColor: Record<string, string> = {
    pendingApproval: "bg-yellow-600",
    active: "bg-green-600",
  };

  return statusColor[status] || "bg-red-600";
};

export const customerColumns: ColumnDef<UserProps>[] = [
  {
    id: "avatar",
    cell: ({ row: { original } }) => (
      <Avatar className="h-8 w-8 outline-none">
        <AvatarImage src="https://github.com/shadcn.png" alt="Avatar" />
        <AvatarFallback>
          {`${original.firstName?.[0]}${original.lastName?.[0]}`.toUpperCase()}
        </AvatarFallback>
      </Avatar>
    ),
  },
  {
    accessorKey: "firstName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="First name" />
    ),
    cell: ({ row }) => (
      <div className="flex space-x-2">{row.getValue("firstName")}</div>
    ),
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "lastName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Last name" />
    ),
    cell: ({ row }) => {
      return <div className="flex space-x-2">{row.getValue("lastName")}</div>;
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "email",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Email" />
    ),
    cell: ({ row }) => {
      return <div className="flex space-x-2">{row.getValue("email")}</div>;
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "gender",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Gender" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("gender")}
          </span>
        </div>
      );
    },
  },

  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const status: string = row.getValue("status") || "";
      return (
        <div className="flex items-center gap-2">
          <span
            className={`block w-2 h-2 ${generateStatusSignal(status)} rounded-full`}
          ></span>
          <span>{status}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Signed Up" />
    ),
    cell: ({ row }) => {
      const date: string = row.getValue("createdAt");
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {getTimeAgo(date)}
          </span>
        </div>
      );
    },
  },
];
