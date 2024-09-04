import { redirect } from "react-router-dom";
import { PagePath } from "../../models/PagePath";

export function IndexLoader() {
  const isAuth: boolean = localStorage.getItem("accessToken") ? true : false;
  if (!isAuth) {
    return redirect(PagePath.login);
  }
  return redirect(PagePath.projects);
}
