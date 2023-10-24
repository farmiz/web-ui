import { createSlice } from "@reduxjs/toolkit";
import { tableDefaults } from "@/store/tableSlice/defaults";
import { addCurrentPageAction, addQueryAction, addSortAction } from "./actions";
export const tableSlice = createSlice({
  name: "datatable",
  initialState: tableDefaults,
  reducers: {
    addCurrentPage: addCurrentPageAction,
    addQuery: addQueryAction,
    addSort: addSortAction,
  },
});

export default tableSlice.reducer;
export const { addCurrentPage, addQuery, addSort } = tableSlice.actions;
