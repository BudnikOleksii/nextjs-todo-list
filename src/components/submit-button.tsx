'use client';

import { LoaderIcon } from 'lucide-react';
import { type ComponentProps, type FC } from 'react';
import { useFormStatus } from 'react-dom';
import { Button } from '@/components/ui/button';

export const SubmitButton: FC<ComponentProps<'button'>> = ({ children, ...props }) => {
  const { pending, action } = useFormStatus();

  const isPending = pending && action === props.formAction;

  return (
    <Button {...props} type="submit" aria-disabled={pending}>
      {isPending ? <LoaderIcon className="animate-spin" /> : children}
    </Button>
  );
};
