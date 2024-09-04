import { createAsyncThunk } from "@reduxjs/toolkit";
import { authAPI, userAPI } from "../../../api/authApi";
import { IAuthResponse } from "../../../api/models/response/AuthResponse";
import { AppDispatch, RootState } from "../../store";
import axios, { AxiosError } from "axios";
import { API_URL } from "../../../api";
import { IChangePasswordBody } from "./Models/ChangePasswordBody";
import { IError } from "../../../shared/models/IError";

export interface ILoginAttributes {
  email: string;
  password: string;
}

export interface IRegistrtionAttributes {
  email: string;
  nickname: string;
  password: string;
}

export const registration = createAsyncThunk<
  IAuthResponse,
  IRegistrtionAttributes,
  { rejectValue: IError; dispatch: AppDispatch; state: RootState }
>("user/registration", async ({ email, nickname, password }, thunkAPI) => {
  try {
    const response = await authAPI.registration(email, nickname, password);
    return response.data as IAuthResponse;
  } catch (e) {
    const error: AxiosError = e as AxiosError;

    const loginError: IError = {
      status: error.status!,
      message: "Ошибка при регистрации",
    };
    return thunkAPI.rejectWithValue(loginError);
  }
});

export const login = createAsyncThunk<
  IAuthResponse,
  ILoginAttributes,
  { rejectValue: IError; dispatch: AppDispatch; state: RootState }
>("user/login", async ({ email, password }, thunkAPI) => {
  try {
    const response = await authAPI.login(email, password);
    return response.data as IAuthResponse;
  } catch (e) {
    const error: AxiosError = e as AxiosError;

    const loginError: IError = {
      status: error.status!,
      message: "Неверный логин или пароль",
    };
    return thunkAPI.rejectWithValue(loginError);
  }
});

export const logout = createAsyncThunk<
  undefined,
  undefined,
  { rejectValue: IError; dispatch: AppDispatch; state: RootState }
>("user/logout", async (_, thunkAPI) => {
  try {
    await authAPI.logout();
    return;
  } catch (e) {
    const error: AxiosError = e as AxiosError;

    const loginError: IError = {
      status: error.status!,
      message: "Ошибка при выходе",
    };
    return thunkAPI.rejectWithValue(loginError);
  }
});

export const checkAuth = createAsyncThunk<
  IAuthResponse,
  undefined,
  { rejectValue: IError; dispatch: AppDispatch; state: RootState }
>("user/checkAuth", async (_, thunkAPI) => {
  try {
    const response = await axios.get<IAuthResponse>(`${API_URL}/users/refresh_token`, {
      withCredentials: true,
    });
    return response.data;
  } catch (e) {
    const error: AxiosError = e as AxiosError;

    const loginError: IError = {
      status: error.status!,
      message: "Неверный токен",
    };
    return thunkAPI.rejectWithValue(loginError);
  }
});

export const changePassword = createAsyncThunk<
  IAuthResponse,
  IChangePasswordBody,
  { rejectValue: IError; dispatch: AppDispatch; state: RootState }
>("user/changePassword", async ({ email, oldPassword, newPassword }, thunkAPI) => {
  try {
    const response = await userAPI.changePassword(email, oldPassword, newPassword);
    return response.data as IAuthResponse;
  } catch (e) {
    const error: AxiosError = e as AxiosError;
    const loginError: IError = {
      status: error.status!,
      message: "Ошибка при изменении пароля",
    };
    return thunkAPI.rejectWithValue(loginError);
  }
});
