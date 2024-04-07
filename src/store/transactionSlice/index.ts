import { ActionReducerMapBuilder, createSlice } from "@reduxjs/toolkit";
import { initialState } from "@/store/transactionSlice/defaults";
import { fetchTransactions } from "./actions";
export const transactionSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {},
  extraReducers: (builder: ActionReducerMapBuilder<typeof initialState>) => {
    builder
      .addCase(fetchTransactions.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchTransactions.fulfilled, (state, action) => {
        state.isLoading = false;
        state.transactions = action.payload.response.data;
        state.paginator = action.payload.response.paginator;
      })
      .addCase(fetchTransactions.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
      });
  },
});

export default transactionSlice.reducer;
