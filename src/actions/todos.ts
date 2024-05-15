'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { PATHS } from '@/constants';
import { createClient } from '@/lib/utils/supabase/server';
import { type NewTodo } from '@/validations/task';

const supabase = createClient();
export default async function addTodo(newTodo: NewTodo) {
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
}
