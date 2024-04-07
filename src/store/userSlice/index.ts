import { ActionReducerMapBuilder, createSlice } from "@reduxjs/toolkit";
import { initialRequestState } from "@/defaults";
import { RequestStateProps } from "@/interfaces";
import { userActions } from "@/store/userSlice/actions";
import { defaultUserValues } from "./defaults";

export interface UserPayloadProps extends RequestStateProps {
  editingUser: Record<string, any>;
  editing: Record<string, any>;
  users: Record<string, any>[];
  paginator: {
    page: number;
    perPage: number;
    totalPages: number;
    totalDocuments: number;
  };
}
const initialState: UserPayloadProps = {
  users: [],
  editingUser: defaultUserValues,
  editing: defaultUserValues,
  ...initialRequestState,
  paginator: { page: 1, perPage: 30, totalPages: 0, totalDocuments: 0 },
};

export const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    resetUserStore: (state) => {
      state.editingUser = defaultUserValues;
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
      .addCase(userActions.fetchUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(userActions.fetchUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.users = action.payload.response.data;
        state.paginator = action.payload.response.paginator;
      })
      .addCase(userActions.fetchUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
      })

      // CREATE USER ACTION
      .addCase(userActions.createUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(userActions.createUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.editingUser = action.payload.response;
      })
      .addCase(userActions.createUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
      })

      // GET SINGLE USER
      .addCase(userActions.getSingleUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(userActions.getSingleUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.editingUser = action.payload.response;
        state.editing = action.payload.response;
      })
      .addCase(userActions.getSingleUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
      })

      // UPDATE SINGLE USER
      .addCase(userActions.updateUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(userActions.updateUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.editingUser = action.payload.response;
        state.editing = action.payload.response;
      })
      .addCase(userActions.updateUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
      })
      // DELETE SINGLE USER
      .addCase(userActions.deleteUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(userActions.deleteUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.editingUser = action.payload.response;
        state.editing = action.payload.response;
        state.users = state.users.filter(
          (user) => user.id !== action.payload.response.id
        );
      })
      .addCase(userActions.deleteUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
      });
  },
});

export default userSlice.reducer;
export const { resetUserStore, updateEditingUser } = userSlice.actions;
