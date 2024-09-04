import { PayloadAction, UnknownAction, createSlice } from "@reduxjs/toolkit";
import { IProject } from "../../../shared/models/IProject";
import { changeTitle, createProject, deleteProject, getProjects } from "./ActionCreators";
import { IError } from "../../../shared/models/IError";

interface IProjectsState {
  projects: IProject[];
  isLoading: boolean;
  error: IError | null;
}

const initialState: IProjectsState = {
  projects: [],
  isLoading: false,
  error: null,
};

export const projectsSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getProjects.fulfilled, (state, action) => {
      state.projects = action.payload;
      state.isLoading = false;
      state.error = null;
    });
    builder.addCase(createProject.fulfilled, (state, action) => {
      state.projects.push(action.payload);
      state.isLoading = false;
      state.error = null;
    });
    builder.addCase(changeTitle.fulfilled, (state, action) => {
      state.projects = state.projects.map((project) =>
        project._id === action.payload._id ? { ...project, title: action.payload.title } : project
      );
      state.isLoading = false;
      state.error = null;
    });
    builder.addCase(deleteProject.fulfilled, (state, action) => {
      const updatedProjects = state.projects.filter((project) => project._id !== action.payload);
      state.projects = updatedProjects;
      console.log("first", updatedProjects);
      state.isLoading = false;
      state.error = null;
    });
    builder.addMatcher(isPending, (state, action) => {
      state.isLoading = true;
    });
    builder.addMatcher(isError, (state, action: PayloadAction<IError>) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

const isPending = (action: UnknownAction) => {
  return action.type.endsWith("pending");
};

const isError = (action: UnknownAction) => {
  return action.type.endsWith("rejected");
};

export default projectsSlice.reducer;
