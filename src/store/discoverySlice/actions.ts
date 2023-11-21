import { discoveryService } from "@/services/DiscoveryService";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const createDiscovery = createAsyncThunk(
  "/create/discovery",
  async (body: Record<string, any>, thunkAPI) => {
    try {
      const response = await discoveryService.createOne(body);

      return response;
    } catch (error: any) {
      const errorMessage = error.message;
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);
export const fetchDiscoveries = createAsyncThunk(
  "/fetch/discoveries",
  async (query: Record<string, string>, thunkAPI) => {
    try {
      const response = await discoveryService.getMany(query);

      return response;
    } catch (error: any) {
      const errorMessage = error.message;
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);
