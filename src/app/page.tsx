import Link from 'next/link';
import AuthButton from '@/components/auth-button';
import { Button } from '@/components/ui/button';
import { PATHS } from '@/constants';

export default async function Index() {
  return (
    <div className="flex-1 w-full flex flex-col gap-20 items-center">
      <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
        <AuthButton />
      </nav>

      <div className="animate-in flex-1 flex flex-col gap-20 w-80 px-3">
        <header className="w-full flex justify-center border-b border-b-foreground/10 h-16">
          TODOS APP
        </header>
        <main className="flex-1 flex flex-col gap-6">
          <Link href={PATHS.login}>
            <Button type="button" variant="secondary" className="w-full">
              Login
            </Button>
          </Link>
          <Link href={PATHS.todos}>
            <Button type="button" variant="outline" className="w-full">
              Todos
            </Button>
          </Link>
        </main>
      </div>

      <footer className="w-full border-t border-t-foreground/10 p-8 flex justify-center text-center text-xs">
        FOOTER
      </footer>
    </div>
  );
}
