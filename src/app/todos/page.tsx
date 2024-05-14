import Link from 'next/link';
import { redirect } from 'next/navigation';
import { TaskCard } from '@/app/todos/task-card';
import { PATHS } from '@/constants';
import { createClient } from '@/lib/utils/supabase/server';

export default async function ProtectedPage() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect(PATHS.login);
  }

  const { data: tasks } = await supabase.from('tasks').select('*').eq('userId', user.id);

  return (
    <main className="flex-1 flex flex-col gap-6">
      {/*TODO: update UI for link*/}
      <Link href={PATHS.createTodo}>Create a new task</Link>

      {tasks && tasks.map((task) => <TaskCard key={task.id} task={task} />)}
    </main>
  );
}
