import { userService } from "@/services/UserService";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchUsers = createAsyncThunk(
    "fetch/users",
    async (query: Record<string, string>, thunkAPI) => {
      try {
        const response = await userService.getMany(query);
        return response;
      } catch (error: any) {
        console.log(error)
        const errorMessage =
          error.response.data &&
          error.response.data.response &&
          Boolean(Object.keys(error.response.data.response).length)
            ? error.response.data.response.message
            : error.message;
        return thunkAPI.rejectWithValue(errorMessage);
      }
    }
  );