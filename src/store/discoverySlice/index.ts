import { createSlice } from "@reduxjs/toolkit";
import { initialRequestState } from "@/defaults";


export const discoverySlice = createSlice({
  name: "discovery",
  initialState: {
    ...initialRequestState,
    discoveries: []
},
  reducers: {},
  extraReducers: ()=>{}
});

export default discoverySlice.reducer;
export const {  } = discoverySlice.actions;