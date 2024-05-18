'use client';

import { LoaderIcon } from 'lucide-react';
import { useTransition } from 'react';
import { deleteTodo } from '@/actions';
import { Button } from '@/components/ui/button';

interface Props {
  id: number;
}

export const DeleteTodoButton: React.FC<Props> = ({ id }) => {
  const [isPending, startTransition] = useTransition();

  const handleDeleteTodo = (id: number) => {
    startTransition(async () => {
      await deleteTodo(id);
    });
  };

  return (
    <Button onClick={() => handleDeleteTodo(id)} variant="destructive" disabled={isPending}>
      {isPending ? <LoaderIcon className="animate-spin" /> : 'Confirm'}
    </Button>
  );
};

export default DeleteTodoButton;
