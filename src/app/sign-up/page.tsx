import Link from 'next/link';
import { signUp } from '@/actions';
import { AlertCustom } from '@/components/alert-custom';
import { HomeButton } from '@/components/home-button';
import { PasswordInput } from '@/components/password-input';
import { SubmitButton } from '@/components/submit-button';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PATHS } from '@/constants';
import { type AuthPagesProps } from '@/types/auth-pages-props';

export default function SignUp({ searchParams }: AuthPagesProps) {
  const hasError = searchParams.error;

  return (
    <div className="flex-1 flex flex-col w-full px-8 sm:max-w-md justify-center gap-2">
      <HomeButton />

      <form className="animate-in flex-1 flex flex-col w-full justify-center gap-2 text-foreground">
        <Label htmlFor="email">Email</Label>
        <Input id="email" name="email" placeholder="you@example.com" required />
        <Label htmlFor="password">Password</Label>
        <PasswordInput id="password" name="password" placeholder="••••••••" required />
        <SubmitButton formAction={signUp}>Sign Up</SubmitButton>
        {searchParams.message && (
          <AlertCustom
            variant={hasError ? 'destructive' : 'default'}
            title={hasError ? 'Error: ' : 'Success: '}
            text={searchParams.message}
          />
        )}
        <Button variant="link" type="button">
          <Link href={PATHS.login}>Already have an account? Sign in</Link>
        </Button>
      </form>
    </div>
  );
}
