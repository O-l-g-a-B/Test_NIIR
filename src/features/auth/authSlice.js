import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "../../services/auth-service";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLogged:
      localStorage.getItem("token") && localStorage.getItem("login")
        ? true
        : false,
    login: localStorage.getItem("login") ? JSON.parse(localStorage.getItem("login")) : undefined,
    errorMessage: "",
    status: undefined,
    lastLoginTime: undefined,
  },
  reducers: {
    loginSucces: (state) => {
      state.isLogged = true;
    },
    loginFail: (state) => {
      state.isLogged = false;
    },
    setLogin: (state, action) => {
      state.login = action.payload;
    },
    setAuthErrorMessage: (state, action) => {
      state.authErrorMessage = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(authLogin.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(authLogin.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.isLogged = true;
        state.login = action.payload.login;
        state.lastLoginTime = new Date();
        localStorage.setItem("token", JSON.stringify(action.payload.token));
        localStorage.setItem("login", JSON.stringify(action.payload.login));
      })
      .addCase(authLogin.rejected, (state, action) => {
        state.status = "failed";
        state.errorMessage = action.error.message;
      })
      .addCase(authLogout.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(authLogout.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.isLogged = false;
        state.login = undefined;
        localStorage.setItem("token", "");
        localStorage.setItem("login", "");
      });
  },
});

export const authLogin = createAsyncThunk(
  "auth/login",
  async ({ login, password }) => {
    const response = await authService.login(login, password);
    return response.data;
  }
);

export const authLogout = createAsyncThunk("auth/logout", async () => {
  const response = await authService.logout();
  return response.data;
});

export const { loginSucces, loginFail, setUserName, setAuthErrorMessage } =
  authSlice.actions;

export default authSlice.reducer;
