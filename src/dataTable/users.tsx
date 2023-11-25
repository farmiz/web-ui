import { DataFilterProps } from "@/interfaces/tables";
import { Settings2, User2Icon, Users } from "lucide-react";

import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/components/table/DataTableColumnHeader";
import { UserProps } from "@/store/userSlice/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  genderOptions,
  roleOptions,
  statusOptions,
} from "@/formValidations/users";

export const filters: DataFilterProps[] = [
  {
    column: "role",
    options: roleOptions,
    title: "Role",
    extra: {
      mainIcon: User2Icon,
    },
  },
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
  {
    column: "firstName",
    options: [],
    title: "First Name",
    isNumber: true,
  },
];

export const columns: ColumnDef<UserProps>[] = [
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
    accessorKey: "role",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Role" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("role")}
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
      return (
        <div className="flex w-[100px] items-center">
          {row.getValue("status")}
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    }
  },
];
