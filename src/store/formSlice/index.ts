// formSlice.js

import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    initializeForm: (state: Record<string, any>, action) => {
      Object.assign(state, action.payload);
    },
    updateFormField: (state: Record<string, any>, action) => {
      const { fieldName, value } = action.payload;
      state[fieldName] = value;
    },
    resetForm: (state) => {
      initializeForm(state);
    },
  },
});

export const { initializeForm, updateFormField, resetForm } = formSlice.actions;
export default formSlice.reducer;
