import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/Authentication/authenticationSlice";
import appReducer from "../appSlice";
import queryReducer from "../features/Query/querySlice";

const localStorageState = localStorage.getItem("reduxState");
const persistedState = localStorageState ? JSON.parse(localStorageState) : {};

const store = configureStore({
  reducer: {
    auth: authReducer,
    app: appReducer,
    query: queryReducer,
  },
  preloadedState: persistedState,
});

store.subscribe(() => {
  localStorage.setItem("reduxState", JSON.stringify(store.getState()));
});

export default store;
