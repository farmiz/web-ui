import {
  ActionReducerMapBuilder,
  PayloadAction,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";
import { initialRequestState } from "../../defaults";
import { UserProps } from "../../interfaces/users";
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
  userDetails: {},
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
export const refreshTokenAuth = createAsyncThunk(
  "auth/refresh",
  async ({}, thunkAPI) => {
    try {
      const response = await authService.refresh();
      return response;
    } catch (error: any) {
      const errorMessage = error.message || error.response.message;
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (
      state,
      action: PayloadAction<
        Omit<
          typeof initialState,
          "isLoading" | "isSuccess" | "message" | "isError"
        >
      >
    ) => {
      state.userDetails = action.payload.userDetails;
      state.accessToken = action.payload.accessToken;
    },
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
        state.userDetails = omit(action.payload.response, ["accessToken"]);
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
export const { setAuth } = authSlice.actions;
