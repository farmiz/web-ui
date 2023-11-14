import { userService } from "@/services/UserService";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchUsers = createAsyncThunk(
  "fetch/users",
  async (query: Record<string, string>, thunkAPI) => {
    try {
      const response = await userService.getMany(query);
      return response;
    } catch (error: any) {
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

export const createUser = createAsyncThunk(
  "create/user",
  async (body: Record<string, string>, thunkAPI) => {
    try {
      const response = await userService.createOne(body);
      return response;
    } catch (error: any) {
      const errorMessage = error.message;
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);
export const getSingleUser = createAsyncThunk(
  "getSingle/user",
  async (id: string, thunkAPI) => {
    try {
      const response = await userService.getOne({id});
      return response;
    } catch (error: any) {
      const errorMessage = error.message;
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);
