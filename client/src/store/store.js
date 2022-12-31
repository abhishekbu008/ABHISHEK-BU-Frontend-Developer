import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/Authentication/authenticationSlice";
import appReducer from "../appSlice";
import queryReducer from "../features/Query/querySlice";

const localStorageState = localStorage.getItem("authState");
const persistedState = localStorageState
  ? { auth: JSON.stringify(localStorageState) }
  : {};

const store = configureStore({
  reducer: {
    auth: authReducer,
    app: appReducer,
    query: queryReducer,
  },
  preloadedState: persistedState,
});

store.subscribe(() => {
  const state = {
    auth: {
      loading: false,
      user: store.getState().auth.user,
      token: store.getState().auth.token,
      error: [],
    },
  };
  localStorage.setItem("authState", JSON.stringify(state));
});

export default store;
