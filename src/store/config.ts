import userReducer from "./userSlice";
import authReducer from "./authSlice";
export const storeReducers =  {
    users: userReducer,
    auth: authReducer
}