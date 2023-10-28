import { PayloadAction } from "@reduxjs/toolkit";
import { DataTableQueryProps } from "./types";

export const addCurrentPageAction = (
  state: DataTableQueryProps,
  action: PayloadAction<number>
) => {
  state.currentPage = action.payload;
};
export const addItemPerPageAction = (
  state: DataTableQueryProps,
  action: PayloadAction<number>
) => {
  state.limit = action.payload;
};

export const addQueryAction = (
  state: DataTableQueryProps,
  action: PayloadAction<string>
) => {
  state.search = action.payload;
};
export const addColumnsAction = (
  state: DataTableQueryProps,
  action: PayloadAction<string>
) => {
  state.columns = [...state.columns, ...action.payload];
};

export const addSortAction = (
  state: DataTableQueryProps,
  action: PayloadAction<string>
) => {
  let latestFields: Record<string, string> = {};

  state.sort.forEach((field) => {
    const fieldName = field.startsWith("-") ? field.slice(1) : field;
    latestFields[fieldName] = field;
  });

  state.sort = [...state.sort, action.payload];
};

interface GenericFilterActionProps {
  column: string;
  value: string[]
}
export const addGenericFilterAction = (
  state: Record<string, any>,
  action: PayloadAction<GenericFilterActionProps>
) => {
  state[`${action.payload.column}__in`] = action.payload.value.join(",")
};
