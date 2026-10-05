import { QueryClient } from "@tanstack/react-query";

export function createQueryClient(): QueryClient {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000 * 5, // 5 minutes
        refetchOnWindowFocus: false,
        retry: 1,
      },
    },
  });
}
