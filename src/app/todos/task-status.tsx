import * as React from 'react';
import { type FC } from 'react';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { TASK_STATUSES } from '@/constants';
import { type Status } from '@/types/task';

const statusTextMap: { [key in Status]: string } = {
  todo: 'todo',
  inProgress: 'in progress',
  done: 'done',
};

interface Props {
  currentStatus: Status;
}

export const TaskStatus: FC<Props> = ({ currentStatus }) => {
  return (
    <RadioGroup defaultValue={currentStatus}>
      {TASK_STATUSES.map((status) => (
        <div key={status} className="flex items-center space-x-2">
          <RadioGroupItem value={status} id={status} />
          <Label htmlFor={status}>{statusTextMap[status]}</Label>
        </div>
      ))}
    </RadioGroup>
  );
};
