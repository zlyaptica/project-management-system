import { createSlice } from "@reduxjs/toolkit"
import { IProject } from "../../../shared/models/IProject"
import { IBoard } from "../../../shared/models/IBoard";

interface IProjectState {
  project: IProject;
  board: IBoard;
}

const initialState = {

}

export const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {},
  extraReducers: (builder) => {

  }
})

export default projectSlice.reducer