import {
  ActionReducerMapBuilder,
  createSlice,
} from "@reduxjs/toolkit";
import { initialRequestState } from "@/defaults";
import { UserProps } from "./types";
import { IDefaultPlugin, RequestStateProps } from "@/interfaces";
import { fetchUsers } from "@/store/userSlice/actions";
export interface UserPayloadProps
  extends UserProps,
    IDefaultPlugin,
    RequestStateProps {}
const initialState = {
  users: [],
  ...initialRequestState,
};


export const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder: ActionReducerMapBuilder<typeof initialState>) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.users = action.payload.response;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
      });
  },
});

export default userSlice.reducer;
