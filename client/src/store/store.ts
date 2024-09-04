import { configureStore } from "@reduxjs/toolkit"
import userReduser from "./reducers/UserReducers/UserSlice"
import { useDispatch } from "react-redux"
import projectsReducer from "./reducers/ProjectsReducers/ProjectsSlice"

export const store = configureStore({
  reducer: {
    userReduser: userReduser,
    projectReducer: projectsReducer,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()