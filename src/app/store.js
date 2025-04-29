import { configureStore } from "@reduxjs/toolkit"
import authReducer from "../features/auth/authSlice"
import bugReducer from "../features/bugs/bugSlice"

export const store = configureStore({
  reducer: {
    auth: authReducer,
    bugs: bugReducer,
  },
});