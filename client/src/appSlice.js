import { createSlice } from "@reduxjs/toolkit";
import { signin } from "./features/Authentication/authenticationSlice";

const initialState = {
  authDialog: false,
  authDialogError: false,
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
    clearError: (state) => {
      state.authDialogError = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(signin.fulfilled, (state) => {
      state.authDialog = false;
    });
    builder.addCase(signin.rejected, (state) => {
      state.authDialog = false;
      state.authDialogError = true;
    });
  },
});

export default appSlice.reducer;
export const { authDialogOpen, authDialogClose, clearError } = appSlice.actions;
