import { createSlice } from "@reduxjs/toolkit";
import { signin } from "./features/Authentication/authenticationSlice";

const initialState = {
  authDialog: false,
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    authDialogOpen: (state) => {
      state.authDialog = true;
    },
    authDialogClose: (state) => {
      state.authDialog = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(signin.fulfilled, (state) => {
      state.authDialog = false;
    });
  },
});

export default appSlice.reducer;
export const { authDialogOpen, authDialogClose } = appSlice.actions;
