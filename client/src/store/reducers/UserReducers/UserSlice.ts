import { PayloadAction, UnknownAction, createSlice } from "@reduxjs/toolkit";
import { IUser } from "../../../shared/models/IUser";
import { changePassword, checkAuth, login, logout, registration } from "./ActionCreators";
import { IError } from "../../../shared/models/IError";

interface IUserState {
  isAuth: boolean;
  user: IUser | Record<string, never>;
  isLoading: boolean;
  error: IError | null;
}

const initialState: IUserState = {
  isAuth: false,
  user: {},
  isLoading: false,
  error: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(registration.fulfilled, (state, action) => {
      state.user = action.payload.user;
      state.isLoading = false;
      state.error = null;
      state.isAuth = true;
      localStorage.setItem("accessToken", action.payload.accessToken);
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.user = action.payload.user;
      state.isLoading = false;
      state.error = null;
      state.isAuth = true;
      localStorage.setItem("accessToken", action.payload.accessToken);
    });
    builder.addCase(logout.fulfilled, (state, action) => {
      state.user = {};
      state.isLoading = false;
      state.error = null;
      state.isAuth = false;
      localStorage.removeItem("accessToken");
    });
    builder.addCase(checkAuth.fulfilled, (state, action) => {
      state.user = action.payload.user;
      state.isLoading = false;
      state.error = null;
      state.isAuth = true;
      localStorage.setItem("accessToken", action.payload.accessToken);
    });
    builder.addCase(changePassword.fulfilled, (state, action) => {
      state.user = action.payload.user;
      state.isLoading = false;
      state.error = null;
      state.isAuth = true;
      localStorage.setItem("accessToken", action.payload.accessToken);
    });
    builder.addMatcher(isPending, (state) => {
      state.isLoading = true;
    });
    builder.addMatcher(isError, (state, action: PayloadAction<IError>) => {
      state.isLoading = false;
      state.error = action.payload
    });
  },
});

export default userSlice.reducer;

const isError = (action: UnknownAction) => {
  return action.type.endsWith("rejected");
};

const isPending = (action: UnknownAction) => {
  return action.type.endsWith("pending");
};
