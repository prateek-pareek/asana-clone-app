import { useRouter as useRouterNext } from 'next/navigation';
import { useCallback } from 'react';
import type { Options } from '../types';
import { ROUTE_HOME } from './routes';

export const useRouterHome = () => {
  const router = useRouterNext();
  const { push } = router;

  const navigateToHome = useCallback(
    (options?: Options) => {
      push(ROUTE_HOME.href.pathname(), options);
    },
    [push],
  );

  const navigateToHomeDetail = useCallback(
    (id: string, options?: Options) => {
      push(`${ROUTE_HOME.href.pathname()}${id}`, options);
    },
    [push],
  );

  return {
    navigateToHome,
    navigateToHomeDetail,
  };
};
