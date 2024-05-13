'use server';

import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { DEFAULT_AUTH_ERROR_MESSAGE, ERROR_MESSAGE_MARK, PATHS } from '@/constants';
import { createClient } from '@/lib/utils/supabase/server';

export const signUp = async (formData: FormData) => {
  const origin = headers().get('origin');
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const supabase = createClient();

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${origin}/auth/callback`,
    },
  });

  if (error) {
    const errorMessage = error.message || DEFAULT_AUTH_ERROR_MESSAGE;
    return redirect(`${PATHS.signUp}?message=${errorMessage}&${ERROR_MESSAGE_MARK}`);
  }

  return redirect(`${PATHS.signUp}?message=Check email to continue sign in process'`);
};
