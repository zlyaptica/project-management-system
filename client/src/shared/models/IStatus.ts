import { ITask } from "./ITask";

export interface IStatus {
  _id: string;
  title: string;
  type: string;
  created_at: number;
  position: number;
  tasks: ITask[];
}