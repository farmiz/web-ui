import { AppDispatch, RootState } from "@/store";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
export const useAppDispatch: () => AppDispatch = useDispatch;
// Define a typed selector hook using the RootState type
export const appSelector: TypedUseSelectorHook<RootState> = useSelector;

// Create a wrapper function to select a specific state slice
export const useAppSelector = <T extends keyof RootState>(slice: T) =>
appSelector((state) => state[slice]);