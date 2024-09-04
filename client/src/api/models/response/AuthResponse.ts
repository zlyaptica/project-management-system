import { IUser } from "../../../shared/models/IUser";

export interface IAuthResponse {
  accessToken: string;
  refreshToken: string;
  user: IUser;
}