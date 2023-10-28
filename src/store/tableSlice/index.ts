import { createSlice } from "@reduxjs/toolkit";
import { tableDefaults } from "@/store/tableSlice/defaults";
import {
  addCurrentPageAction,
  addQueryAction,
  addSortAction,
  addColumnsAction,
  addItemPerPageAction,
} from "./actions";
export const tableSlice = createSlice({
  name: "datatable",
  initialState: tableDefaults,
  reducers: {
    addCurrentPage: addCurrentPageAction,
    addQuery: addQueryAction,
    addSort: addSortAction,
    addColumn: addColumnsAction,
    addItemPerPage: addItemPerPageAction,
  },
});

export default tableSlice.reducer;
export const { addCurrentPage, addQuery, addSort, addColumn, addItemPerPage } =
  tableSlice.actions;
