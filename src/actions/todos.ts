'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { PATHS } from '@/constants';
import { createClient } from '@/lib/utils/supabase/server';
import { type Task } from '@/types/task';
import { type TodosQueryParams } from '@/types/todos-query-params';
import { type NewTodo } from '@/validations/task';

export const fetchTodos = async (params: TodosQueryParams) => {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect(PATHS.login);
  }

  const { order, status, sortType, priority } = params;
  const descending = order === 'desc';
  const sort = sortType || 'created_at';
  const statusCompleted = status === 'completed';

  const query = supabase.from('tasks').select('*').eq('userId', user.id);
  const queryWithStatus = status ? query.eq('completed', statusCompleted) : query;
  const queryWithPriority = priority ? queryWithStatus.eq('priority', priority) : queryWithStatus;

  const { data: tasks, error } = await queryWithPriority.order(sort, { ascending: !descending });

  if (error) {
    throw error;
  }

  return tasks;
};

export const addTodo = async (newTodo: NewTodo) => {
  const supabase = createClient();

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
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect(PATHS.login);
  }

  const { error } = await supabase.from('tasks').update(todoFields).eq('id', id);
  // TODO handle errors
  console.log(error);

  revalidatePath(PATHS.todos);
};

export const deleteTodo = async (todoId: number) => {
  const supabase = createClient();

  const { data, error } = await supabase.from('tasks').delete().eq('id', todoId);

  if (error) {
    console.error('Error deleting todo:', error);
    return;
  }

  console.log('Deleted todo:', data);

  revalidatePath(PATHS.todos);
};
