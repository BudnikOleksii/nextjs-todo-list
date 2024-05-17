import { EditIcon } from 'lucide-react';
import { type FC } from 'react';
import { ChangeStatusButton } from '@/app/todos/change-status-button';
import DeleteTodoButton from '@/app/todos/delete-button';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
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
        <DeleteTodoButton id={id} />

        <Button variant="outline">
          <EditIcon />
        </Button>
      </TableCell>
    </TableRow>
  );
};
