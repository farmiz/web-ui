import { ActionReducerMapBuilder, createSlice } from "@reduxjs/toolkit";
import { initialRequestState } from "@/defaults";
import { RequestStateProps } from "@/interfaces";
import {
  createUser,
  fetchUsers,
  getSingleUser,
  updateUser,
} from "@/store/userSlice/actions";
export interface UserPayloadProps extends RequestStateProps {
  editingUser: Record<string, any>;
  editing: Record<string, any>;
  users: Record<string, any>[];
}
const initialState: UserPayloadProps = {
  users: [],
  editingUser: {},
  editing: {},
  ...initialRequestState,
};

export const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    resetUserStore: (state) => {
      state.editingUser = {
        firstName: "",
        lastName: "",
        username: "",
        email: "",
        phone: {
          number: "",
          prefix: "",
          country: "",
        },
        dateOfBirth: "",
        password: "",
        permission: "",
        confirmPassword: "",
        role: "",
        gender: "",
        status: "",
      };
      state.isError = false;
      state.isLoading = false;
      state.isSuccess = false;
      state.users = [];
    },
    updateEditingUser: (state, action) => {
      state.editingUser[action.payload.key] = action.payload.value;
    },
  },
  extraReducers: (builder: ActionReducerMapBuilder<typeof initialState>) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.users = action.payload.response;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
      })

      // CREATE USER ACTION
      .addCase(createUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.editingUser = action.payload.response;
      })
      .addCase(createUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
      })

      // GET SINGLE USER
      .addCase(getSingleUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSingleUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.editingUser = action.payload.response;
        state.editing = action.payload.response;
      })
      .addCase(getSingleUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
      })

      // UPDATE SINGLE USER
      .addCase(updateUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.editingUser = action.payload.response;
        state.editing = action.payload.response;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
      });
  },
});

export default userSlice.reducer;
export const { resetUserStore, updateEditingUser } = userSlice.actions;
