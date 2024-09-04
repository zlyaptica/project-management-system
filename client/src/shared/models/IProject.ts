import { IUser } from "./IUser";

export interface IProject {
  _id: string; 
  title: string;
  author: IUser;
  created_at: number;
}
