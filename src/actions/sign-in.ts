'use server';

import { redirect } from 'next/navigation';
import { DEFAULT_AUTH_ERROR_MESSAGE, ERROR_MESSAGE_MARK, PATHS } from '@/constants';
import { createClient } from '@/lib/utils/supabase/server';

export const signIn = async (formData: FormData) => {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const supabase = createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    const errorMessage = error.message || DEFAULT_AUTH_ERROR_MESSAGE;
    return redirect(`${PATHS.login}?message=${errorMessage}&${ERROR_MESSAGE_MARK}`);
  }

  return redirect(PATHS.todos);
};
