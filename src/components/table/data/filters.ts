import { DataFilterProps } from "@/interfaces/tables";
import {  statuses } from "./data";
import {  Settings2 } from "lucide-react";

export const filters: DataFilterProps[] = [
    {
      column: "status",
      options: statuses,
      title: "Status",
      extra: {
        mainIcon: Settings2,
      },
    }
  ];