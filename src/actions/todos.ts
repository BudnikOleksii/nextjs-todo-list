'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { PATHS } from '@/constants';
import { createClient } from '@/lib/utils/supabase/server';
import { type Priority } from '@/types/task';

const supabase = createClient();
export default async function addTodo(formData: FormData) {
  const title = formData.get('title') as string;
  const description = formData.get('description') as string;
  const priority = formData.get('priority') as Priority;

  if (!title) {
    return;
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect(PATHS.login);
  }

  const { data, error } = await supabase.from('tasks').insert({
    userId: user.id,
    title,
    description,
    priority,
  });
  console.log(data);
  console.log(error);

  revalidatePath(PATHS.todos);
  redirect(PATHS.todos);
}
