import { createSlice } from "@reduxjs/toolkit";
import { tableDefaults } from "@/store/tableSlice/defaults";
import {
  addCurrentPageAction,
  addQueryAction,
  addSortAction,
  addColumnsAction,
  addItemPerPageAction,
  addGenericFilterAction,
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
    addGenericFilter: addGenericFilterAction,
  },
});

export default tableSlice.reducer;
export const {
  addCurrentPage,
  addQuery,
  addSort,
  addColumn,
  addItemPerPage,
  addGenericFilter,
} = tableSlice.actions;
