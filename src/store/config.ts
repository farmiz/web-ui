import userReducer from "@/store/userSlice";
import authReducer from "@/store/authSlice";
import discoveryReducer from "@/store/discoverySlice";
import tableReducer from "@/store/tableSlice";
import formSlice from "@/store/formSlice";
export const storeReducers = {
  users: userReducer,
  auth: authReducer,
  discovery: discoveryReducer,
  table: tableReducer,
  form: formSlice,
};
