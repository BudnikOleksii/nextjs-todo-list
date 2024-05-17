'use client';

import { ArrowDownIcon, ArrowUpIcon } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { TASK_PRIORITIES } from '@/constants';
import { SORT_TYPES, type SortOrder, STATUSES } from '@/types/todos-query-params';

enum Default_Values {
  all = 'all',
  none = 'none',
  asc = 'asc',
}

export const Filers = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const status = searchParams.get('status');
  const priority = searchParams.get('priority');
  const sortType = searchParams.get('sortType');
  const order = searchParams.get('order');

  const handleQueryChange = (queryName: string, value: string) => {
    const current = new URLSearchParams(Array.from(searchParams.entries())); // -> has to use this form

    if (value in Default_Values) {
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

  const handleSortTypeChange = (value: string) => {
    handleQueryChange('sortType', value);
  };

  const handleSortOrderChange = () => {
    const nextOrder: SortOrder = order === 'desc' ? 'asc' : 'desc';
    handleQueryChange('order', nextOrder);
  };

  return (
    <div className="flex items-center justify-between w-full border border-foreground/10 rounded p-2">
      <Badge>Filter and sort todos</Badge>

      <Select value={status || ''} onValueChange={handleStatusChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select status" />
        </SelectTrigger>
        <SelectContent>
          {[Default_Values.all, ...STATUSES].map((priority) => (
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
          {[Default_Values.all, ...TASK_PRIORITIES].map((priority) => (
            <SelectItem key={priority} value={priority} className="capitalize">
              {priority}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={sortType || ''} onValueChange={handleSortTypeChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select sort type" />
        </SelectTrigger>
        <SelectContent>
          {[Default_Values.none, ...SORT_TYPES].map((type) => (
            <SelectItem key={type} value={type} className="capitalize">
              {type}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Button variant="outline" type="button" onClick={handleSortOrderChange}>
        {order === 'desc' ? (
          <ArrowDownIcon className="h-4 w-4" />
        ) : (
          <ArrowUpIcon className="h-4 w-4" />
        )}
      </Button>
    </div>
  );
};
