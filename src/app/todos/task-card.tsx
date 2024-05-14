import { type FC } from 'react';
import { TaskStatus } from '@/app/todos/task-status';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { type Priority, type Task } from '@/types/task';

const priorityBadgeVariantMap: { [key in Priority]: 'secondary' | 'default' | 'destructive' } = {
  low: 'secondary',
  medium: 'default',
  high: 'destructive',
} as const;

interface Props {
  task: Task;
}

export const TaskCard: FC<Props> = ({ task }) => {
  const { priority, title, status, description, created_at, deadline } = task;

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <div className="flex items-center justify-between">
            {title}
            <Badge variant={priorityBadgeVariantMap[priority]} className="capitalize">
              {priority}
            </Badge>
          </div>
        </CardTitle>
        <CardDescription>{deadline}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="mb-2">{description}</p>
        <TaskStatus currentStatus={status} />
      </CardContent>
      <CardFooter>
        <p>{created_at}</p>
      </CardFooter>
    </Card>
  );
};
