import { initService } from "@/services/InitService";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getCustomerOverview = createAsyncThunk(
  "getCustomerOverview",
  async (_, thunkAPI) => {
    try {
      const response = await initService.getCustomerOverview();
      return response;
    } catch (error: any) {
      const errorMessage = error.message;
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);
