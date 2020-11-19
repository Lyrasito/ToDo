export interface Task {
  _id: string;
  submitter: string;
  title: string;
  description: string;
  dueDate: string;
  priority: number;
  completed: Boolean;
  completedTimestamp?: number;
}
