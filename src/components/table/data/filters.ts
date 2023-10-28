import { DataFilterProps } from "@/interfaces/tables";
import {  Settings2 } from "lucide-react";

export const statuses = [
  {
    value: "active",
    label: "Active",
  },
  {
    value: "pendingApproval",
    label: "Pending Approval",
  }
]
export const filters: DataFilterProps[] = [
    {
      column: "status",
      options: statuses,
      title: "Status",
      extra: {
        mainIcon: Settings2,
      },
    },
    {
      column: "firstName",
      options: [],
      title: "First Name",
      isNumber: true
    }
  ];