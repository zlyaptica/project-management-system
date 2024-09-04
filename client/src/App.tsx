import React, { FC, useEffect } from "react";
import { LoginPage } from "./pages/LoginPage";
import { RegistrationPage } from "./pages/RegistrationPage";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { ProtectedLoader } from "./shared/browserRouter/loaders/ProtectedLoader";
import { LoginAction } from "./shared/browserRouter/actions/LoginAction";
import { AuthLoader } from "./shared/browserRouter/loaders/AuthLoader";
import { RegistrationAction } from "./shared/browserRouter/actions/RegistrationAction";
import { ErrorNoPage } from "./components/ErrorNoPage";
import { ProfilePage } from "./pages/ProfilePage";
import { Index } from "./components/Index/Index";
import { Root } from "./pages/Root";
import MyTasksPage from "./pages/MyTasksPage";
import { useAppDispatch } from "./store/store";
import { checkAuth } from "./store/reducers/UserReducers/ActionCreators";
import { PagePath } from "./shared/models/PagePath";
import { ProjectsPage } from "./pages/ProjectsPage";
import { IndexLoader } from "./shared/browserRouter/loaders/IndexLoader";
import { ProjectPage } from "./pages/ProjectPage";
import { ProjectLoader } from "./shared/browserRouter/loaders/ProjectLoader";

const router = createBrowserRouter([
  {
    path: PagePath.root,
    loader: ProtectedLoader,
    errorElement: <ErrorNoPage />,
    element: <Root />,
    children: [
      {
        index: true,
        loader: IndexLoader,
        element: <Index />,
      },
      {
        path: PagePath.profile,
        element: <ProfilePage />,
      },
      {
        path: PagePath.myTasks,
        element: <MyTasksPage />,
      },
      {
        path: PagePath.projects,
        element: <ProjectsPage />,
      },
      {
        path: PagePath.project,
        loader: ProjectLoader,
        element: <ProjectPage />,
      },
    ],
  },
  {
    path: PagePath.login,
    action: LoginAction,
    loader: AuthLoader,
    element: <LoginPage />,
  },
  {
    path: PagePath.registration,
    action: RegistrationAction,
    loader: AuthLoader,
    element: <RegistrationPage />,
  },
]);

const App: FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      dispatch(checkAuth());
    }
  }, [dispatch]);

  return <RouterProvider router={router} />;
};

export default App;
