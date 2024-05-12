export enum Status {
  todo = 'todo',
  inProgress = 'inProgress',
  done = 'done',
}

export enum Priority {
  low = 'low',
  medium = 'medium',
  high = 'high',
}

export interface Task {
  id: number;
  userId: string;
  title: string;
  description: string;
  status: Status;
  priority: Priority;
  createdAt: Date;
  deadline: Date;
}
