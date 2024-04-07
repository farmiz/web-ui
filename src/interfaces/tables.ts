import { ColumnDef, Row } from "@tanstack/react-table";
import { MouseEventHandler } from "react";
import { OptionsProps } from ".";

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
  selectedDocuments?: Record<string, any>;
  allowRowSelect?: boolean;
  data: TData[];
  paginator?: Paginator;
  showSearchSelection?: boolean;
  searchSelectionOptions?: OptionsProps[];
  showSelectColumns?: boolean;
  handleRowClick?: (ata: Row<TData>["original"]) => void;
}

export interface Paginator {
  page: number;
  perPage: number;
  totalDocuments: number;
  totalPages: number;
}
