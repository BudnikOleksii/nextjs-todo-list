import Link from 'next/link';
import { fetchTodos } from '@/actions';
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
import { type TodosQueryParams } from '@/types/todos-query-params';

export interface TodosPagesProps {
  searchParams: TodosQueryParams;
}

export default async function Todos({ searchParams }: TodosPagesProps) {
  const tasks = await fetchTodos(searchParams);

  return (
    <main className="flex-1 flex flex-col gap-6">
      {/*TODO: update UI for link*/}
      <Link href={PATHS.createTodo}>Create a new task</Link>

      <Table className="border border-foreground/10 rounded">
        <TableCaption>A list of your tasks.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="text-center">Status</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Priority</TableHead>
            <TableHead className="text-center">Deadline</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tasks.map((task) => (
            <TaskRow key={task.id} task={task} />
          ))}
        </TableBody>
      </Table>
    </main>
  );
}
