import { ActionReducerMapBuilder, createSlice } from "@reduxjs/toolkit";
import { getCustomerOverview } from "./action";
import { initialState } from "./default";

export const initSlice = createSlice({
  name: "init",
  initialState,
  reducers: {},
  extraReducers: (builder: ActionReducerMapBuilder<typeof initialState>) => {
    builder
      .addCase(getCustomerOverview.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCustomerOverview.fulfilled, (state, action) => {
        state.isLoading = false;
        state.customerOverview = action.payload.response;
      })
      .addCase(getCustomerOverview.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
      });
  },
});

export default initSlice.reducer;
