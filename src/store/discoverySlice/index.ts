import { ActionReducerMapBuilder, createSlice } from "@reduxjs/toolkit";
import { discoveryDefaults, initialRequestState } from "@/defaults";
import { createDiscovery } from "./actions";
import { DiscoveryProps } from "./types";
import { IDefaultPlugin, RequestStateProps } from "@/interfaces";

interface DiscoveryPayloadProps extends IDefaultPlugin, RequestStateProps {
  discovery: DiscoveryProps;
  discoveries: DiscoveryProps[];
}
const initialState: DiscoveryPayloadProps = {
  ...initialRequestState,
  discoveries: [],
  discovery: discoveryDefaults(),
};
export const discoverySlice = createSlice({
  name: "discovery",
  initialState,
  reducers: {},
  extraReducers: (builder: ActionReducerMapBuilder<typeof initialState>) => {
    builder
      .addCase(createDiscovery.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createDiscovery.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.discoveries.push(action.payload.response);
        state.discovery = action.payload.response;
        state.message = "Discovery created";
      })
      .addCase(createDiscovery.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
      });
  },
});

export default discoverySlice.reducer;
export const {} = discoverySlice.actions;
