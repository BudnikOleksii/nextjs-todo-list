export interface TodosQueryParams {
  status?: 'completed' | 'todo';
  sortType?: 'deadline' | 'priority';
  order?: 'asc' | 'desc';
}
