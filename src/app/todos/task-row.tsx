import { EditIcon, TrashIcon } from 'lucide-react';
import { type FC } from 'react';
import { ChangeStatusButton } from '@/app/todos/change-status-button';
import DeleteTodoButton from '@/app/todos/delete-button';
import { UpdateTodoForm } from '@/app/todos/update-todo-form';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { TableCell, TableRow } from '@/components/ui/table';
import { formatDate } from '@/lib/utils';
import { type Priority, type Task } from '@/types/task';

const priorityBadgeVariantMap: { [key in Priority]: 'secondary' | 'default' | 'destructive' } = {
  low: 'secondary',
  medium: 'default',
  high: 'destructive',
} as const;

interface Props {
  task: Task;
}

export const TaskRow: FC<Props> = ({ task }) => {
  const { id, priority, title, completed, description, deadline } = task;

  return (
    <TableRow>
      <TableCell className="flex justify-center items-center px-0">
        <ChangeStatusButton id={id} isCompleted={completed} />
      </TableCell>
      <TableCell>{title}</TableCell>
      <TableCell>{description}</TableCell>
      <TableCell className="flex justify-center">
        <Badge variant={priorityBadgeVariantMap[priority]} className="capitalize">
          {priority}
        </Badge>
      </TableCell>
      <TableCell className="text-center">{formatDate(deadline)}</TableCell>
      <TableCell className="flex gap-1 justify-center">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">
              <TrashIcon />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Are you absolutely sure?</DialogTitle>
              <DialogDescription>
                This action cannot be undone. This will permanently delete this task and remove your
                data from our servers.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <DialogTrigger asChild>
                <DeleteTodoButton id={id} />
              </DialogTrigger>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">
              <EditIcon />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Change your task</DialogTitle>
              <DialogDescription>
                <UpdateTodoForm todo={task} />
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </TableCell>
    </TableRow>
  );
};
