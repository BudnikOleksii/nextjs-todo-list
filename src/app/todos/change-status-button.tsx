'use client';

import { type FC, useTransition } from 'react';
import { updateTodo } from '@/actions';
import { Checkbox } from '@/components/ui/checkbox';

interface Props {
  id: number;
  isCompleted: boolean;
}

export const ChangeStatusButton: FC<Props> = ({ id, isCompleted }) => {
  const [isPending, startTransition] = useTransition();

  const handleStatusChange = async (checked: boolean) => {
    startTransition(async () => {
      await updateTodo(id, { completed: checked });
    });
  };

  return (
    <Checkbox
      id={`task-${id}`}
      onCheckedChange={handleStatusChange}
      checked={isCompleted}
      disabled={isPending}
    />
  );
};
