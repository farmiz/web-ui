import { PayloadAction } from "@reduxjs/toolkit";
import { DataTableQueryProps } from "./types";

export const addCurrentPageAction = (
  state: DataTableQueryProps,
  action: PayloadAction<number>
) => {
  state.currentPage = action.payload;
};

export const addQueryAction = (
  state: DataTableQueryProps,
  action: PayloadAction<string>
) => {
  state.query = action.payload;
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
