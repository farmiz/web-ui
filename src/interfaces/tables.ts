import { ColumnDef } from "@tanstack/react-table";

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
export interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  showExportButton?: boolean;
  useActionButton?: boolean;
  filters?: DataFilterProps[];
  fetchQuery: any;
}

export interface Paginator {
  page: number;
  perPage: number;
  totalDocuments: number;
  totalPages: number;
}
