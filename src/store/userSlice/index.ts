import { createSlice } from "@reduxjs/toolkit";
import { initialRequestState } from "../../defaults";
import { UserProps } from "../../interfaces/users";
import { IDefaultPlugin, RequestStateProps } from "../../interfaces";
export interface UserPayloadProps extends UserProps, IDefaultPlugin, RequestStateProps{}
const initialState: {
    users: UserProps[],
}  = {
  users: [],
  ...initialRequestState,
};

// const fetchUsers = createAsyncThunk("", )
export const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    
  }
});

export const {} = userSlice.actions;
export default userSlice.reducer;
