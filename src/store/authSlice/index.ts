import {
  ActionReducerMapBuilder,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";
import { initialRequestState } from "../../defaults";
import { UserProps } from "../userSlice/types";
import { AuthProps, IDefaultPlugin, RequestStateProps } from "../../interfaces";
import { authService } from "../../services/Auth";
import { omit } from "lodash";
export interface UserPayloadProps
  extends UserProps,
    IDefaultPlugin,
    RequestStateProps {}
const initialState: {
  userDetails: UserProps | null;
  accessToken: string | null;
  isError: boolean;
  isLoading: boolean;
  isSuccess: boolean;
  message: string;
} = {
  userDetails: null,
  ...initialRequestState,
  accessToken: null,
};

export const loginAuth = createAsyncThunk(
  "auth/login",
  async (
    { email, password }: Pick<AuthProps, "email" | "password">,
    thunkAPI
  ) => {
    try {
      const response = await authService.login({ email, password });
      localStorage.setItem("accessToken", response.response.accessToken);
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

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (state, action: Record<string, any>) => {
      state.userDetails = action.payload.user;
      state.accessToken = action.payload.accessToken;
    },
    resetAuth: (state)=>{
      state.userDetails = null;
      state.accessToken = null
    }
  },
  extraReducers: (builder: ActionReducerMapBuilder<typeof initialState>) => {
    builder
      .addCase(loginAuth.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginAuth.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.accessToken = action.payload.response.accessToken;
        state.userDetails = omit(action.payload.response.user);
        state.message = "Log in successful";
      })
      .addCase(loginAuth.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
      });
  },
});

export default authSlice.reducer;
export const { setAuth, resetAuth } = authSlice.actions;
