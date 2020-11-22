export interface Task {
  id: string;
  submitter: string;
  title: string;
  description: string;
  dueDate: string;
  priority: number;
  completed: Boolean;
  completedTimestamp?: number;
}
