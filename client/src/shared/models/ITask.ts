export interface ITask {
  _id: string;
  created_at: number;
  creator: string;
  doer: string;
  title: string
  status_id: string;
  priority: number;
  is_completed: boolean
  description: string;
  is_done: boolean
  start_date: number;
  end_date: number;
}