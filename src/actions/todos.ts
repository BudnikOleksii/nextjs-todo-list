'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { PATHS } from '@/constants';
import { createClient } from '@/lib/utils/supabase/server';
import { type Task } from '@/types/task';
import { type TodosQueryParams } from '@/types/todos-query-params';
import { type NewTodo } from '@/validations/task';

const supabase = createClient();

export const fetchTodos = async (params: TodosQueryParams) => {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect(PATHS.login);
  }

  const { order, status, sortType, priority } = params;
  const ascending = order === 'asc';
  const sort = sortType || 'created_at';
  const statusCompleted = status === 'completed';

  const query = supabase.from('tasks').select('*').eq('userId', user.id);
  const queryWithStatus = status ? query.eq('completed', statusCompleted) : query;
  const queryWithPriority = priority ? queryWithStatus.eq('priority', priority) : queryWithStatus;

  const { data: tasks, error } = await queryWithPriority.order(sort, { ascending });

  if (error) {
    throw error;
  }

  return tasks;
};

export const addTodo = async (newTodo: NewTodo) => {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect(PATHS.login);
  }

  const { error } = await supabase.from('tasks').insert({
    userId: user.id,
    title: newTodo.title,
    description: newTodo.description,
    priority: newTodo.priority,
    deadline: newTodo.deadline.toDateString(),
  });
  // TODO handle errors
  console.log(error);

  revalidatePath(PATHS.todos);
  redirect(PATHS.todos);
};

export const updateTodo = async (id: number, todoFields: Partial<Task>) => {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect(PATHS.login);
  }

  const { error } = await supabase.from('tasks').update(todoFields).eq('id', id);
  // TODO handle errors
  console.log(error);
};

export const deleteTodo = async (todoId: number) => {
  const { data, error } = await supabase.from('tasks').delete().eq('id', todoId);

  console.log('data', data);
  console.log('error', error);

  if (error) {
    console.error('Error deleting todo:', error);
    return;
  }

  console.log('Deleted todo:', data);

  revalidatePath(PATHS.todos);
};
