import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';
import { AppRouter } from '@backend/trpc/trcp.router';

export const trpc = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: 'http://localhost:3002/trpc',
    }),
  ],
});
