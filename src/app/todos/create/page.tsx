import addTodo from '@/actions/todos';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { TASK_PRIORITIES } from '@/constants';

export default async function ProtectedPage() {
  return (
    <main className="flex-1 flex flex-col gap-6 w-4/12">
      <form action={addTodo} className="mb-8 flex flex-col gap-2">
        <Label htmlFor="title">Title</Label>
        <Input id="title" name="title" placeholder="Create todo" required />
        <Label htmlFor="description">Description</Label>
        <Input
          id="description"
          name="description"
          placeholder="Create todo with this awesome form"
        />

        <Select name="priority">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select a pripority" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Pripority</SelectLabel>
              {TASK_PRIORITIES.map((priority) => (
                <SelectItem key={priority} value={priority} className="capitalize">
                  {priority}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>

        <Button type="submit">Create task</Button>
      </form>
    </main>
  );
}
