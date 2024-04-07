import {
  ActionReducerMapBuilder,
  PayloadAction,
  createSlice,
} from "@reduxjs/toolkit";
import { initialState } from "./default";
import { tagActions } from "./actions";

export const tagsSlice = createSlice({
  name: "tags",
  initialState,
  reducers: {
    resetTag(state) {
      state.editing = initialState.editing;
      state.isError = initialState.isError;
      state.isLoading = initialState.isLoading;
      state.isSuccess = initialState.isSuccess;
      state.tags = [];
      state.editingTag = initialState.editingTag;
      state.paginator = initialState.paginator;
    },
    updateEditingTag: (
      state,
      action: PayloadAction<{ key: string; value: string }>
    ) => {
      state.editingTag[action.payload.key] = action.payload.value;
    },
  },
  extraReducers: (builder: ActionReducerMapBuilder<typeof initialState>) => {
    // CREATE TAG
    builder
      .addCase(tagActions.createTag.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(tagActions.createTag.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.editing = action.payload.response;
        state.editingTag = action.payload.response;
      })
      .addCase(tagActions.createTag.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as any;
      })

      // FETCH TAGS
      .addCase(tagActions.fetchTags.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(tagActions.fetchTags.fulfilled, (state, action) => {
        state.isLoading = false;
        state.tags = action.payload.response.data;
        state.paginator = action.payload.response.paginator;
      })
      .addCase(tagActions.fetchTags.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as any;
      })

      // FETCH TAG
      .addCase(tagActions.getSingleTag.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(tagActions.getSingleTag.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.editing = action.payload.response;
        state.editingTag = action.payload.response;
      })
      .addCase(tagActions.getSingleTag.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as any;
      })

      // UPDATE TAG
      .addCase(tagActions.updateTag.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(tagActions.updateTag.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.editing = action.payload.response;
        state.editingTag = action.payload.response;
      })
      .addCase(tagActions.updateTag.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as any;
      })

      // DELETE TAG
      .addCase(tagActions.deleteTag.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(tagActions.deleteTag.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.editingTag = action.payload.response;
        state.editing = action.payload.response;
        state.tags = state.tags.filter(
          (tag) => tag.id !== action.payload.response.id
        );
      })
      .addCase(tagActions.deleteTag.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as any;
      });
  },
});

export default tagsSlice.reducer;

export const { resetTag, updateEditingTag } = tagsSlice.actions;
