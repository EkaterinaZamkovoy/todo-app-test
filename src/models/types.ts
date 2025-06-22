export type TaskStatus = 'todo' | 'in-progress' | 'done';

export interface Task {
  id: string;
  title: string;
  status: TaskStatus;
  categoryId: string;
  createdAt: string;
}

export interface Category {
  id: string;
  name: string;
}
