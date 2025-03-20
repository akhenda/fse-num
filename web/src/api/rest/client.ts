import { QueryClient } from '@tanstack/react-query';

const defaultMutationConfig = { retry: false };
const defaultQueryConfig = {
  retry: false,
  refetchOnWindowFocus: false,
  staleTime: 5 * 60 * 1000, // 5 minutes (we should probably store this in a constants file)
  gcTime: 24 * 60 * 60 * 1000, // 24 hours (we should probably store this in a constants file)
};
const defaultOptions = { mutations: defaultMutationConfig, queries: defaultQueryConfig };

export const queryClient = new QueryClient({ defaultOptions });
