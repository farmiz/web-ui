import { ColumnDef } from "@tanstack/react-table";
import { MouseEventHandler } from "react";

type IconType = React.ComponentType<{ className?: string }>;
export interface DataFilterProps {
  column: string;
  title: string;
  options: {
    label: string;
    value: string;
    icon?: IconType;
  }[];
  isNumber?: boolean;
  extra?: {
    mainIcon?: IconType;
  };
}
export type SortType = "asc" | "desc";

export interface ActionButton {
  label: string;
  action: MouseEventHandler;
}
export interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  showExportButton?: boolean;
  actionButtons?: ActionButton[];
  filters?: DataFilterProps[];
  fetchQuery?: any;
}

export interface Paginator {
  page: number;
  perPage: number;
  totalDocuments: number;
  totalPages: number;
}
