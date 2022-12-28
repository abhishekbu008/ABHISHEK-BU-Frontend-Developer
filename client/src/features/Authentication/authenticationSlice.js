import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { auth as axios } from "../../lib";
import { constants } from "../../constants";

const initialState = {
  loading: false,
  user: null,
  token: "",
  error: null,
};

export const signin = createAsyncThunk(
  "user/auth",
  ({ email, password, type }) => {
    return axios
      .post(constants.AUTH[type], { email, password })
      .then((res) => res.data);
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signout: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(signin.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(signin.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.error = null;
    });
    builder.addCase(signin.rejected, (state, action) => {
      state.loading = false;
      state.user = null;
      state.token = "";
      state.error = action.error.message;
    });
  },
});

export default authSlice.reducer;
export const { signout } = authSlice.actions;
