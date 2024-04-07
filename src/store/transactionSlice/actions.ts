import { transactionService } from "@/services/TransactionService";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchTransactions = createAsyncThunk(
  "fetch/transactions",
  async (query: Record<string, string>, thunkAPI) => {
    try {
      const response = await transactionService.getMany(query);
      return response;
    } catch (error: any) {
      const errorMessage = error.message;
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);
export const fetchTransaction = createAsyncThunk(
  "fetch/singleTransaction",
  async (id, thunkAPI) => {
    try {
      const response = await transactionService.getOne({ id });
      return response;
    } catch (error: any) {
      const errorMessage = error.message;
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);
