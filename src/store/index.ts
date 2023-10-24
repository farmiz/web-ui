import { configureStore } from "@reduxjs/toolkit";
import { storeReducers } from "@/store/config";

export const store = configureStore({
  reducer: storeReducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    })
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch
