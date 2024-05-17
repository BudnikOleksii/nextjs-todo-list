'use client';

import { LoaderIcon } from 'lucide-react';
import { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { type z } from 'zod';
import { addTodo } from '@/actions';
import { TodoForm } from '@/app/todos/todo-form';
import { Button } from '@/components/ui/button';
import { type NewTodo, newTodoSchema } from '@/validations/task';
import { zodResolver } from '@hookform/resolvers/zod';

export default function NewTodoForm() {
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof newTodoSchema>>({
    resolver: zodResolver(newTodoSchema),
    defaultValues: {
      title: '',
      description: '',
      priority: 'low',
    },
  });

  const onSubmit = (values: NewTodo) => {
    startTransition(async () => {
      await addTodo(values);
    });
  };

  return (
    <main className="flex-1 flex flex-col gap-6 w-80">
      <TodoForm
        form={form}
        onSubmit={onSubmit}
        submitButton={
          <Button type="submit" disabled={isPending}>
            {isPending ? <LoaderIcon className="animate-spin" /> : 'Create task'}
          </Button>
        }
      />
    </main>
  );
}
