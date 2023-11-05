import { discoveryService } from "@/services/DiscoveryService";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const createDiscovery = createAsyncThunk(
  "/create/discovery",
  async (body: Record<string, any>, thunkAPI) => {
    try {
      const response = await discoveryService.createOne(body);

      return response;
    } catch (error: any) {
      const errorMessage =
        error.response &&
        error.response.data.response &&
        Boolean(Object.keys(error.response.data.response).length)
          ? error.response.data.response.message
          : error.message;
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);
