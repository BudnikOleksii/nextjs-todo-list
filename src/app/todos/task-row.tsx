import { type FC } from 'react';
import { Badge } from '@/components/ui/badge';
import { TableCell, TableRow } from '@/components/ui/table';
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
  const { priority, title, status, description, deadline } = task;

  return (
    <TableRow>
      <TableCell className="font-medium">{status}</TableCell>
      <TableCell>{title}</TableCell>
      <TableCell>{description}</TableCell>
      <TableCell>
        <Badge variant={priorityBadgeVariantMap[priority]} className="capitalize">
          {priority}
        </Badge>
      </TableCell>
      <TableCell>{deadline}</TableCell>
    </TableRow>
  );
};
