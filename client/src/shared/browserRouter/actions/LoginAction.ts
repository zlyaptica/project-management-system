import { LoaderFunctionArgs, redirect } from "react-router-dom";
import { ILoginAttributes, login } from "../../../store/reducers/UserReducers/ActionCreators";
import { store } from "../../../store/store";
import { PagePath } from "../../models/PagePath";

export async function LoginAction({ request, params }: LoaderFunctionArgs) {
  const formData = await request.formData();
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const user: ILoginAttributes = {
    email: email,
    password: password,
  };
  await store.dispatch(login(user));

  return redirect(PagePath.projects);
}
