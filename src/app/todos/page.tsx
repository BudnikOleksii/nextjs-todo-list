import { redirect } from 'next/navigation';
import { TaskCard } from '@/app/todos/task-card';
import AuthButton from '@/components/auth-button';
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

  // const { data, error } = await supabase
  //   .from('tasks')
  //   .insert([
  //     {
  //       userId: user.id,
  //       title: 'Connect supabase',
  //       description: 'Connect supabase',
  //       status: 'todo',
  //       priority: 'low',
  //     },
  //   ])
  //   .select();
  // console.log(error);

  const { data: tasks } = await supabase.from('tasks').select('*').eq('userId', user.id);

  return (
    <div className="flex-1 w-full flex flex-col gap-20 items-center">
      <div className="w-full">
        <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
          <div className="w-full max-w-4xl flex justify-between items-center p-3 text-sm">
            <AuthButton />
          </div>
        </nav>
      </div>

      <main className="flex-1 flex flex-col gap-6">
        {tasks && tasks.map((task) => <TaskCard key={task.id} task={task} />)}
      </main>

      <footer className="w-full border-t border-t-foreground/10 p-8 flex justify-center text-center text-xs">
        FOOTER
      </footer>
    </div>
  );
}
