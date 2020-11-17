export interface Task {
  id: number;
  submitter: string;
  title: string;
  description: string;
  dueDate: string;
  priority: number;
  completed: Boolean;
}
