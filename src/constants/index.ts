export const PATHS = {
  login: '/login',
  signUp: '/sign-up',
  todos: '/protected', // TODO change to todos
} as const;

export const ERROR_MESSAGE_MARK = 'error=true';
export const DEFAULT_AUTH_ERROR_MESSAGE = 'Could not authenticate user';
