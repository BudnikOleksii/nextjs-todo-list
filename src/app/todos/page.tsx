import Link from 'next/link';
import { redirect } from 'next/navigation';
import { TaskRow } from '@/app/todos/task-row';
import {
  Table,
  TableBody,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
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

      <Table className="border border-foreground/10 rounded">
        <TableCaption>A list of your tasks.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Status</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Priority</TableHead>
            <TableHead className="text-center">Deadline</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>{tasks && tasks.map((task) => <TaskRow key={task.id} task={task} />)}</TableBody>
      </Table>
    </main>
  );
}
