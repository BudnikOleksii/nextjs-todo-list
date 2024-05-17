import { type Priority } from '@/types/task';

export const STATUSES = ['completed', 'todo'] as const;
export const SORT_TYPES = ['deadline', 'priority'] as const;
export const SORT_ORDERS = ['asc', 'desc'] as const;

type Status = (typeof STATUSES)[number];
type SortType = (typeof SORT_TYPES)[number];
export type SortOrder = (typeof SORT_ORDERS)[number];

export interface TodosQueryParams {
  status?: Status;
  priority?: Priority;
  sortType?: SortType;
  order?: SortOrder;
}
