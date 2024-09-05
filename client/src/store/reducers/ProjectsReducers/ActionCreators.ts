import { createAsyncThunk } from "@reduxjs/toolkit";
import { IError } from "../../../shared/models/IError";
import { AppDispatch, RootState } from "../../store";
import { AxiosError } from "axios";
import { projectAPI } from "../../../api/authApi";
import { IProject } from "../../../shared/models/IProject";
import { IChangeTitleRequest } from "./Models/ChangeTitle";

export const getProjects = createAsyncThunk<
  IProject[],
  undefined,
  { rejectValue: IError; dispatch: AppDispatch; state: RootState }
>("project/getProjects", async (_, thunkAPI) => {
  try {
    const response = await projectAPI.getProjects();
    return response.data as IProject[];
  } catch (e) {
    const error: AxiosError = e as AxiosError;
    const loginError: IError = {
      status: error.status!,
      message: error.message,
    };
    return thunkAPI.rejectWithValue(loginError);
  }
});

export const createProject = createAsyncThunk<
  IProject,
  string,
  { rejectValue: IError; dispatch: AppDispatch; state: RootState }
>("project/create", async (title, thunkAPI) => {
  try {
    const response = await projectAPI.createProject(title);
    return response.data as IProject;
  } catch (e: unknown) {
    let status: number = 500;
    let message: string = "хз";
    if (e instanceof AxiosError) {
      status = e.status!;
      message = e.response?.data.message;
    }
    const loginError: IError = {
      status: status,
      message: message,
    };
    return thunkAPI.rejectWithValue(loginError);
  }
});

export const changeTitle = createAsyncThunk<
  IProject,
  IChangeTitleRequest,
  { rejectValue: IError; dispatch: AppDispatch; state: RootState }
>("project/changeTitle", async ({ _id, title }, thunkAPI) => {
  try {
    const response = await projectAPI.changeProject(_id, title);
    return response.data as IProject;
  } catch (e) {
    const error: AxiosError = e as AxiosError;
    const loginError: IError = {
      status: error.status!,
      message: error.message,
    };
    return thunkAPI.rejectWithValue(loginError);
  }
});

export const deleteProject = createAsyncThunk<
  string,
  string,
  { rejectValue: IError; dispatch: AppDispatch; state: RootState }
>("project/delete", async (_id, thunkAPI) => {
  try {
    const response = await projectAPI.deleteProject(_id);
    return response.data as string;
  } catch (e) {
    const error: AxiosError = e as AxiosError;
    console.log(e)
    const loginError: IError = {
      status: error.status!,
      message: error.message,
    };
    return thunkAPI.rejectWithValue(loginError);
  }
});
