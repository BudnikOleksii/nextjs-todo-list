'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { TASK_PRIORITIES } from '@/constants';

const DEFAULT_SELECT = 'all';

export const Filers = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const status = searchParams.get('status');
  const priority = searchParams.get('priority');

  const handleQueryChange = (queryName: string, value: string) => {
    const current = new URLSearchParams(Array.from(searchParams.entries())); // -> has to use this form

    if (value === DEFAULT_SELECT) {
      current.delete(queryName);
    } else {
      current.set(queryName, value);
    }

    const search = current.toString();
    const query = search ? `?${search}` : '';

    router.push(`${pathname}${query}`);
  };

  const handleStatusChange = (value: string) => {
    handleQueryChange('status', value);
  };

  const handlePriorityChange = (value: string) => {
    handleQueryChange('priority', value);
  };

  return (
    <div className="flex items-center justify-between w-full border border-foreground/10 rounded p-2">
      <Badge>Filter todos</Badge>

      <Select value={status || ''} onValueChange={handleStatusChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select status" />
        </SelectTrigger>
        <SelectContent>
          {[DEFAULT_SELECT, 'completed', 'todo'].map((priority) => (
            <SelectItem key={priority} value={priority} className="capitalize">
              {priority}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={priority || ''} onValueChange={handlePriorityChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select priority" />
        </SelectTrigger>
        <SelectContent>
          {[DEFAULT_SELECT, ...TASK_PRIORITIES].map((priority) => (
            <SelectItem key={priority} value={priority} className="capitalize">
              {priority}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
