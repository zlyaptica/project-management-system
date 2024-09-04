import { redirect } from "react-router-dom";
import { PagePath } from "../../models/PagePath";

export function ProtectedLoader() {
  const isAuth: boolean = localStorage.getItem("accessToken") ? true : false;
  if (!isAuth) {
    return redirect(PagePath.login);
  }
  return null;
}
