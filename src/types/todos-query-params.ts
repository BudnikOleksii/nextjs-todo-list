import { type Priority } from '@/types/task';

export interface TodosQueryParams {
  status?: 'completed' | 'todo';
  priority?: Priority;
  sortType?: 'deadline' | 'priority';
  order?: 'asc' | 'desc';
}
