import { useRouter as useRouterNext } from 'next/navigation';
import { useCallback } from 'react';
import type { Options } from '../types';
import { ROUTE_INBOX } from './routes';

export const useRouterInbox = () => {
  const router = useRouterNext();
  const { push } = router;

  const navigateToInbox = useCallback(
    (options?: Options) => {
      push(ROUTE_INBOX.href.pathname(), options);
    },
    [push],
  );

  const navigateToInboxDetail = useCallback(
    (id: string, options?: Options) => {
      push(`${ROUTE_INBOX.href.pathname()}/${id}`, options);
    },
    [push],
  );

  return {
    navigateToInbox,
    navigateToInboxDetail,
  };
};
