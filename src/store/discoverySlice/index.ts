import { ActionReducerMapBuilder, createSlice } from "@reduxjs/toolkit";
import { discoveryDefaults, initialRequestState } from "@/defaults";
import { discoveryActions } from "./actions";
import { DiscoveryProps } from "./types";
import { RequestStateProps } from "@/interfaces";
import { set } from "lodash";

const {
  createDiscovery,
  fetchDiscoveries,
  getSingleDiscovery,
  updateDiscovery,
} = discoveryActions;
interface DiscoveryPayloadProps extends RequestStateProps {
  discovery: DiscoveryProps;
  discoveries: DiscoveryProps[];
  editingDiscovery: Record<string, any>;
  paginator: {
    page: number;
    perPage: number;
    totalPages: number;
    totalDocuments: number;
  };
}
const initialState: DiscoveryPayloadProps = {
  ...initialRequestState,
  discoveries: [],
  discovery: { ...discoveryDefaults() },
  editingDiscovery: {},
  paginator: { page: 1, perPage: 30, totalPages: 0, totalDocuments: 0 },
};
export const discoverySlice = createSlice({
  name: "discovery",
  initialState,
  reducers: {
    updateEditingDiscovery: (state, action) => {
      const keys = action.payload.key.split(".");

      if (keys.length > 1) {
        set(state.editingDiscovery, action.payload.key, action.payload.value);
      } else {
        state.editingDiscovery[action.payload.key] = action.payload.value;
      }
    },

    resetDiscovery: (state) => {
      state.discovery = { ...discoveryDefaults() };
      state.isError = false;
      state.isLoading = false;
      state.isSuccess = false;
      state.discoveries = [];
      state.editingDiscovery = {};
    },
  },
  extraReducers: (builder: ActionReducerMapBuilder<typeof initialState>) => {
    // CREATE DISCOVERY
    builder
      .addCase(createDiscovery.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createDiscovery.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.discoveries.push(action.payload.response);
        state.discovery = action.payload.response;
        state.editingDiscovery = action.payload.response;
        state.message = "Discovery created";
      })
      .addCase(createDiscovery.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
      })

      // FETCH ALL DISCOVERIES
      .addCase(fetchDiscoveries.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchDiscoveries.fulfilled, (state, action) => {
        state.isLoading = false;
        state.discoveries = action.payload.response.data;
        state.paginator = action.payload.response.paginator;
      })
      .addCase(fetchDiscoveries.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
      })

      // UPDATE DISCOVERY
      .addCase(updateDiscovery.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateDiscovery.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.isLoading = false;
        state.discovery = action.payload.response;
        state.editingDiscovery = action.payload.response;
        state.message = "Discovery updated";
      })
      .addCase(updateDiscovery.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
      })

      // GET SINGLE DISCOVERY
      .addCase(getSingleDiscovery.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSingleDiscovery.fulfilled, (state, action) => {
        state.isLoading = false;
        state.discoveries.push(action.payload.response);
        state.discovery = action.payload.response;
        state.editingDiscovery = action.payload.response;
      })
      .addCase(getSingleDiscovery.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
      });
  },
});

export default discoverySlice.reducer;
export const { updateEditingDiscovery, resetDiscovery } =
  discoverySlice.actions;
