import userReducer from "@/store/userSlice";
import authReducer from "@/store/authSlice";
import discoveryReducer from "@/store/discoverySlice";
import transactionSlice from "./transactionSlice";
import initSlice from "./initSlice";
import tagsSlice from "./tagsSlice";
export const storeReducers = {
  users: userReducer,
  auth: authReducer,
  discovery: discoveryReducer,
  transactions: transactionSlice,
  init: initSlice,
  tags: tagsSlice
};
