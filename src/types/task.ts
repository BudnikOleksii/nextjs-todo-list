import { type Database } from '@/types/database';

export type Status = Database['public']['Enums']['status'];
export type Priority = Database['public']['Enums']['priority'];

export type Task = Database['public']['Tables']['tasks']['Row'];
