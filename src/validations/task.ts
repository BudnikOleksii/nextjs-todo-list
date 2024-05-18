import { z } from 'zod';
import { TASK_PRIORITIES } from '@/constants';

type ZodPriority = (typeof TASK_PRIORITIES)[number];
const ZOD_PRIORITIES: [ZodPriority, ...ZodPriority[]] = [
  TASK_PRIORITIES[0],
  ...TASK_PRIORITIES.slice(1),
];

export const newTodoSchema = z.object({
  title: z.string().min(2, {
    message: 'Title must be at least 2 characters.',
  }),
  description: z.string(),
  priority: z.enum(ZOD_PRIORITIES),
  deadline: z.date({
    required_error: 'Deadline is required.',
  }),
});

export type NewTodo = z.infer<typeof newTodoSchema>;
