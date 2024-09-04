import { LoaderFunctionArgs, redirect } from "react-router-dom"
import { IRegistrtionAttributes, registration } from "../../../store/reducers/UserReducers/ActionCreators";
import { store } from "../../../store/store";
import { PagePath } from "../../models/PagePath";

export async function RegistrationAction({ request, params }: LoaderFunctionArgs) {

  const formData = await request.formData();
  const email = formData.get("email") as string
  const nickname = formData.get("nickname") as string
  const password = formData.get("password") as string

  const user: IRegistrtionAttributes = {
    email: email,
    nickname: nickname,
    password: password,
  }
  await store.dispatch(registration(user))
  return redirect(PagePath.projects);
}