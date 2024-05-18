import type { Priority, Status } from '@/types/task';

export const PATHS = {
  login: '/login',
  signUp: '/sign-up',
  todos: '/todos',
  createTodo: '/todos/create',
} as const;

export const ERROR_MESSAGE_MARK = 'error=true';
export const DEFAULT_AUTH_ERROR_MESSAGE = 'Could not authenticate user';
export const TASK_STATUSES: Status[] = ['todo', 'inProgress', 'done'] as const;
export const TASK_PRIORITIES: Priority[] = ['low', 'medium', 'high'] as const;
