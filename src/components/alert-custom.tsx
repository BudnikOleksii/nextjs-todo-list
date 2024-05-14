import type { VariantProps } from 'class-variance-authority';
import type { FC } from 'react';

import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle, type alertVariants } from '@/components/ui/alert';

type Props = VariantProps<typeof alertVariants> & {
  title: string;
  text: string;
};

export const AlertCustom: FC<Props> = ({ variant, title, text }) => {
  return (
    <Alert variant={variant}>
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>{text}</AlertDescription>
    </Alert>
  );
};
