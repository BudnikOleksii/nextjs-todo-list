'use client';

import type { z } from 'zod';

import { LoaderIcon } from 'lucide-react';
import { type FC, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { updateTodo } from '@/actions';
import { TodoForm } from '@/app/todos/todo-form';
import { Button } from '@/components/ui/button';
import { type Task } from '@/types/task';
import { type NewTodo, newTodoSchema } from '@/validations/task';
import { zodResolver } from '@hookform/resolvers/zod';

interface Props {
  todo: Task;
}

export const UpdateTodoForm: FC<Props> = ({ todo }) => {
  const { id, title, description, priority, deadline } = todo;
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof newTodoSchema>>({
    resolver: zodResolver(newTodoSchema),
    defaultValues: {
      title,
      description,
      priority,
      deadline: new Date(deadline),
    },
  });

  const onSubmit = (values: NewTodo) => {
    const preparedData = {
      ...values,
      deadline: values.deadline.toDateString(),
    };

    startTransition(async () => {
      await updateTodo(id, preparedData);
    });
  };

  return (
    <TodoForm
      form={form}
      onSubmit={onSubmit}
      submitButton={
        <Button type="submit" disabled={isPending}>
          {isPending ? <LoaderIcon className="animate-spin" /> : 'Update task'}
        </Button>
      }
    />
  );
};
