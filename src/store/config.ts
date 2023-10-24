import userReducer from "@/store/userSlice";
import authReducer from "@/store/authSlice";
import discoveryReducer from "@/store/discoverySlice";
import tableReducer from "@/store/tableSlice";
export const storeReducers = {
  users: userReducer,
  auth: authReducer,
  discovery: discoveryReducer,
  table: tableReducer,
};
